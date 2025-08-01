import mongoose from "mongoose";

async function dbConnect() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
}

export default dbConnect;