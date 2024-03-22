import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  const connectionUrl: string | undefined = process.env.MONGODB_URL;

  if (!connectionUrl) {
    throw new Error("MongoDB connection URL not provided.");
  }

  try {
    await mongoose.connect(connectionUrl);
    console.log("Banco Conectado com Sucesso");
  } catch (error: any) { // Especifica 'error' como 'any'
    console.log(`Getting Error from DB connection ${error.message}`);
    throw error;
  }
};

export default connectToDB;
