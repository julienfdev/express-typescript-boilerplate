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
            return console.log('Connecté a la bd : ', db);
        })
        .catch(error => {
            console.log('Connection echouée a la bd : ', error);
            return process.exit(1);
        })
    }
    connect();

    mongoose.connection.on('Déconnecté', connect);
}