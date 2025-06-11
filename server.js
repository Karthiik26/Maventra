import express from "express";
import dotenv from "dotenv";
import DatabaseConnection from "./Config/DBConnection.config.js";
import blogRoutes from "./Routes/Blogs.routes.js";
import userRouter from "./Routes/Users.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const App = express();
dotenv.config();
const PORT = process.env.PORT || 4500;


App.use(express.json());
App.use(cookieParser());
App.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


App.use("/api/blogs", blogRoutes);
App.use("/api/users", userRouter);

App.get("/", (req, res) => {
    return res.json({
        message: "Karthik Assignment For Maventra"
    })
})

DatabaseConnection().then(() => {
    App.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    })
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
})
