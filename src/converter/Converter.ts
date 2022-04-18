export function convert(rawValue: number | boolean, type: String) {

    if (typeof rawValue == "number") {

        var rangeT = [-20, 55];
        var rangeBar = [950, 1150];
        var resultat;

        if (type == "TEMPERATURE") { //si temperature
            var T = (rawValue / 1023) * (rangeT[1] - rangeT[0]) + (rangeT[0]); //calcul temperature
            resultat = T.toString() + "°C";
        }

        else if (type == "HUMIDITY") { //si humidité
            var Hum = (rawValue / 1023) * 100;
            resultat = Hum.toString() + "%HR"; //calcul 
        }

        else if (type == "BARO") { //si barometre
            var Baro = (rawValue / 1023) * (rangeBar[1] - rangeBar[0]) + (rangeBar[0]); //calcul 
            resultat = Baro.toString() + "hPA";
        }

        else if (type == "PROXIMITY") { //si proxmite

            if (rawValue == 0) {
                resultat = "Inactif";
            }

            else if (rawValue == 1) {
                resultat = "Actif"
            }
        }

        return resultat;

    }
    return;
}