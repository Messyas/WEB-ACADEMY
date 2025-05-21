import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv(); //faz a validacao das variaveis de ambiente

const PORT = process.env.PORT ?? 6969;
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.get('/about', (req: Request, res: Response) => {
  res.send('about page');
});

app.post('/', (req: Request, res: Response) => {
    res.write("sei la")
  console.log('Requisição POST no /');
});

app.use((req: Request, res: Response) => {
    res.write("hohoo")
  console.log('Executado por toda requisição');
});

app.listen(PORT, () => {
  console.log(`Port running on port: ${PORT}`);
});
