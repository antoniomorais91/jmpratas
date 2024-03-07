import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB_URI;

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Banco Conectado com Sucesso"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
