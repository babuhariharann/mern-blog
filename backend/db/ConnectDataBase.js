import mongoose from "mongoose";
import dotenv from "dotenv";

const ConnectDataBase = async () => {
  await mongoose
    // .connect(process.env.MONGO_URL)
    .connect(
      "mongodb+srv://babuhariharan:babuhariharan@cluster0.vo1jvkh.mongodb.net/"
    )

    .then(() => {
      console.log("Successfully connected MongoDB");
    })
    .catch((err) => {
      console.log("Error while connecting MongoDB", err);
    });
};

export default ConnectDataBase;
