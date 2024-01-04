import mongoose, { mongo } from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongoose Connected : ${conn.connection.host}`);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

export default connectDb;
