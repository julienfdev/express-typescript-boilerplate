import { SensorType } from "@/models/Sensor";

export function convert(rawValue: number | boolean, type: String) {

    if (typeof rawValue == "number") {
        var rangeT = [-20, 55];
        var rangeBar = [950, 1150];

        if (type == "TEMPERATURE") { //si temperature
            var T = (rawValue / 1023) * (rangeT[1] - rangeT[0]) + (rangeT[0]); //calcul temperature
            var resultat = T.toString() + "°C";
            return resultat;
        } else if (type == "HUMIDITY") { //si humidité
            var Hum = (rawValue / 1023) * 100;
            var resultat = Hum.toString() + "%HR"; //calcul 
            return resultat;
        }
        else if (type == "BARO") { //si barometre
            var Baro = (rawValue / 1023) * (rangeBar[1] - rangeBar[0]) + (rangeBar[0]); //calcul 
            var resultat = Baro.toString() + "hPA";
            return resultat;
        }
        else if (type == "PROXIMITY") { //si proxmite
            var Result;
            if (rawValue == 0) {
                Result = "Inactif";
            } else if (rawValue == 1) {
                Result = "Actif"
            }
            return Result;
        }

    }
    return;
}