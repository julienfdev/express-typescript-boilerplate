import mongoose from "mongoose";

type TInput = {
    db: string;
}

export default ({db}: TInput) => {

    const connect = () => {
        mongoose
        .connect(
            db
        )
        .then(() => {
            return console.info('Connection à ${db} reussi');
        })
        .catch(error => {
            console.error('Connection echouée', error);
            return process.exit(1);
        })
    }
    connect();

    mongoose.connection.on('Déconnecté', connect);
}