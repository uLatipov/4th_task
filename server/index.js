import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import router from "./routes/index.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use("/api/", router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Successfully connected to Database");
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is running on http://localhost:${process.env.PORT}`
            );
        });
    } catch (e) {
        console.log("ERRROR       :       ", e);
    }
};

start();
