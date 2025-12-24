import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongoose Connected Successfully : ${connectDB.connection.host}`)
  } catch (error) {
    console.log("Mongoose Conn error : " + error)
  }
};
