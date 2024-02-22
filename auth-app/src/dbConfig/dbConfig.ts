import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    console.log("we have successfully connected to database");
  } catch (error) {
    console.log("something went wrong ", error);
  }
}