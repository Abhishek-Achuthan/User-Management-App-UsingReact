import express, {Request, Response} from "express";
import dotenv from  "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoute";
import cors from "cors";

dotenv.config();
const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); 
app.use(express.json())

app.use("/", authRoutes);

// app.use('/admin',admin)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})