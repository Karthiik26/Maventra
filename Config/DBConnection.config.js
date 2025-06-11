import mongoose from "mongoose";


const DatabaseConnection = async () => {

    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not defined in environment variables");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        const Database = mongoose.connection;

        Database.on("error", (error) => {
            console.error("Mongo Connection Error - " + error);
        });

        Database.once("open", () => {
            console.log("MongoDB Connected Successfully");
        });

        Database.on("disconnected", () => {
            console.log("MongoDB Disconnected");
        });

        process.on("SIGINT", async () => {
            try {
                await Database.close();
                console.log("MongoDB connection closed through app termination");
                process.exit(0);
            } catch (error) {
                console.error("Error during MongoDB disconnection", error);
                process.exit(1);
            }
        })

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}

export default DatabaseConnection;