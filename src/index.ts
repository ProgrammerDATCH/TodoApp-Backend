import express, { Request, Response } from 'express';
import router from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect("mongodb://localhost:27017/todoApp").then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log("Connectiong to database error: ", err)
})

app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome To TODO BackEnd" });
});

app.listen(9090, () => {
    console.log("Server is running on port 9090");
});

export default app;