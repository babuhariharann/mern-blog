import mongoose from "mongoose";


const connectDataBase = async () => {
  await mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Successfully connected MongoDB");
    })
    .catch((err) => {
      console.log("Error while connecting MongoDB", err);
    });
};

export default connectDataBase;
