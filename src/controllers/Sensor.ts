import db from "@/db";
import apiResponse from "@/modules/api-response";
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
  unit: string;
};

const tempRange: SensorRange = {
  in: [0, 1023],
  out: [-20, 55],
  unit: "°C",
};
const humidityRange: SensorRange = {
  in: [0, 1023],
  out: [0, 100],
  unit: "%HR",
};
const baroRange: SensorRange = {
  in: [0, 1023],
  out: [950, 1150],
  unit: "hPa",
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
  const inProportion = (rawValue - range.in[0]) / inSpread;

  return (range.out[0] + inProportion * outSpread).toFixed(1);
};

const getRange = (type: SensorType): SensorRange => {
  switch (type) {
    case SensorType.TEMPERATURE:
      return tempRange;
    case SensorType.HUMIDITY:
      return humidityRange;
    case SensorType.BARO:
      return baroRange;
    default:
      return { in: [0, 1], out: [0, 1], unit: "" };
  }
};

export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(
        apiResponse(
          false,
          (await db.sensor.findMany()).map((sensor) => {
            return {
              id: sensor.id,
              type: sensor.type,
              designation: sensor.designation,
              rawValue:
                sensor.rawBool !== null ? sensor.rawBool : sensor.rawNumber,
              value:
                (sensor.rawBool !== null
                  ? sensor.rawBool
                  : rawValueToMappedValue(
                      sensor.rawNumber || 0,
                      getRange(sensor.type as SensorType)
                    )
                )?.toString() + getRange(sensor.type as SensorType).unit,
            } as SensorGet;
          })
        )
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
      res.json(
        apiResponse(false, {
          id: sensor.id,
          type: sensor.type,
          designation: sensor.designation,
          rawValue: sensor.rawBool || sensor.rawNumber,
          value: (sensor.rawBool
            ? sensor.rawBool
            : rawValueToMappedValue(sensor.rawNumber || 0, tempRange)
          )?.toString(),
        })
      );
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
      res.json(apiResponse(false, { message: "updated" }));
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = {
        ...req.body,
        ...(req.body.rawValue !== null || req.body.rawValue !== undefined
          ? req.body.type === SensorType.PROXIMITY
            ? { rawBool: req.body.rawValue }
            : { rawNumber: req.body.rawValue }
          : {}),
      };
      if (data.rawValue !== null || data.rawValue !== undefined) {
        delete data.rawValue;
      }
      console.log(data);
      const sensor = await db.sensor.create({ data });
      res
        .status(201)
        .json(apiResponse(false, { message: "created", id: sensor.id }));
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.sensor.delete({ where: { id: parseInt(req.params.id) } });
      res.json(apiResponse(false, { message: "handled" }));
      return;
    } catch (error) {
      next(error);
    }
  },
};
