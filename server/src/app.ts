// import expressServer from "./server";
import express, { Request, Response } from 'express';
import cors from 'cors';
import testRouter from './routes/test';
const app = express();

app.use(express.json());
app.use(cors({
   origin: ["http://localhost:5173/" , "http://localhost:3000","http://localhost:5173"],
   credentials: true
}))
app.use("/",testRouter)

export default app;