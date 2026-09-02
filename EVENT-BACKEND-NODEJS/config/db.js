import { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default async function dbConnect() {
    try {
        let conn = await connect(process.env.MONGO_URI, { dbName: "event-Managment-DB" });

        if (conn) console.log("Db Connected success !");

    } catch (error) {
        console.log(error);
    }
}
