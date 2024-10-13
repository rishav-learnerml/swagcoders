import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const mongo_url = process.env.MONGO_URI as string;
    await mongoose.connect(mongo_url);
    console.log("DB connected succesfully!");
  } catch (error) {
    console.log("Error Connecting DB: ", error);
  }
};
