import { SensorType } from "@/models/Sensor";

export function convert(rawValue: number | boolean) { 

    if(typeof rawValue == "number"){
        var rangeT = [-20, 55];
        var rangeBar = [950, 1150];

        if(SensorType.TEMPERATURE){
            var T = (rawValue/1023)*(rangeT[1]-rangeT[0])+(rangeT[0]);
            var resultat = T.toString();
            return resultat;
        } else if (SensorType.HUMIDITY) {
            var Hum = (rawValue/1023)*100;
            var resultat = Hum.toString();
            return resultat;
        }
        else if (SensorType.BARO){
            var Baro = (rawValue/1023)*(rangeBar[1]-rangeBar[0])+(rangeBar[0]);
            var resultat = Baro.toString();
            return resultat;
    }
    }
    else if (typeof rawValue == "boolean"){

        var Result;
        if(rawValue=false){
            Result = "Inactif";
        } else if (rawValue=true){
            Result = "Actif"
        }
        return Result;

    }
    

}
