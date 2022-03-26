import db from "@/db";
import { decompressFromBase64 } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { runInNewContext } from "vm";

enum SensorType {
  TEMPERATURE = "TEMPERATURE",
  HUMIDITY = "HUMIDITY",
  BARO = "BARO",
  PROXIMITY = "PROXIMITY",
}

type Sensor = {
  id: number | string;
  type: SensorType;
  designation: string;
  rawValue: number | boolean;
};

type SensorGet = Sensor & { value: string };
type SensorRange = {
  in: [number, number];
  out: [number, number];
};

const tempRange: SensorRange = {
  in: [0, 1023],
  out: [-20, 55],
};

const rawValueToMappedValue = (
  rawValue: number,
  range: SensorRange
): string => {
  // clip value
  if (rawValue > range.in[1]) {
    rawValue = range.in[1];
  }
  if (rawValue < range.in[0]) {
    rawValue = range.in[0];
  }
  const inSpread = range.in[1] - range.in[0];
  const outSpread = range.out[1] - range.out[0];
  const inProportion = rawValue / inSpread;

  return (range.out[0] + inProportion * outSpread).toFixed(1);
};

export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(
        (await db.sensor.findMany()).map((sensor) => {
          return {
            id: sensor.id,
            type: sensor.type,
            designation: sensor.designation,
            rawValue: sensor.rawBool || sensor.rawNumber,
            value: (sensor.rawBool
              ? sensor.rawBool
              : rawValueToMappedValue(sensor.rawNumber || 0, tempRange)
            )?.toString(),
          } as SensorGet;
        })
      );
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await db.sensor.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!sensor) {
        throw new Error("sensor_not_found");
      }
      res.json({
        id: sensor.id,
        type: sensor.type,
        designation: sensor.designation,
        rawValue: sensor.rawBool || sensor.rawNumber,
        value: (sensor.rawBool
          ? sensor.rawBool
          : rawValueToMappedValue(sensor.rawNumber || 0, tempRange)
        )?.toString(),
      });
      return;
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Switching sensor type
      const sensor = await db.sensor.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!sensor) {
        throw new Error("sensor_not_found");
      }
      const data = {
        ...(req.body.rawValue !== null || req.body.rawValue !== undefined
          ? sensor.type === SensorType.PROXIMITY
            ? { rawBool: req.body.rawValue }
            : { rawNumber: req.body.rawValue }
          : {}),
      };

      await db.sensor.update({
        where: { id: parseInt(req.params.id) },
        data,
      });
      res.json({ message: "updated" });
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await db.sensor.create({ data: { ...req.body } });
      res.status(201).json({ message: "created", id: sensor.id });
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.sensor.delete({ where: { id: parseInt(req.params.id) } });
      res.json({ message: "handled" });
      return;
    } catch (error) {
      next(error);
    }
  },
};
