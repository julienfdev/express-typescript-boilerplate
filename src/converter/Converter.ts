import { SensorType } from "@/models/Sensor";

export function convert(rawValue: number) { 
    var rangeT = [-20, 55];
    var rangeBar = [950, 1150];

    if(SensorType.TEMPERATURE){
        var T = (rawValue/1023)*(rangeT[1]-rangeT[0])+(rangeT[0]);
        return T;
    } else if (SensorType.HUMIDITY) {
        var Hum = (rawValue/1023)*100;
        return Hum;
    }
    else if (SensorType.BARO){
        var Baro = (rawValue/1023)*(rangeBar[1]-rangeBar[0])+(rangeBar[0]);
        return Baro;
    }

}

export function convertBoolean(value : boolean){
    var Result;
    if(value=false){
        Result = "Inactif";
    } else if (value=true){
        Result = "Actif"
    }
    return Result;
}