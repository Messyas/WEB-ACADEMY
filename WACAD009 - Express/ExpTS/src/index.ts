import express, { Request, Response } from "express";
import dotenv from "dotenv";
import validateEnv from "./utils/validateEnv";

dotenv.config()
validateEnv(); //faz a validacao das variaveis de ambiente

const PORT = process.env.PORT ?? 6969;
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

app.get("/about", (req: Request, res: Response) => {
    res.send("about page");
});

app.listen(PORT, () => {
    console.log(`Port running on port: ${PORT}`);
});