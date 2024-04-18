import express, { Request, Response } from 'express';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerSetup from '../swaggerConfig';
import './database/config/database'

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", router)
swaggerSetup(app);

app.get('/test', (req: Request, res: Response) => {
    res.send('Hello');
});

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome To TODO BackEnd" });
});

app.listen(9090, () => {
    console.log("Server is running on port 9090");
});

export default app;