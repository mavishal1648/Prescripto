import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import userRouter from "./routes/user.routes.js";
//config
const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/admin",adminRouter)
app.use("/api/doctor",doctorRouter);
app.use("/api/user",userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
