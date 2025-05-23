import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import validateEnv from './utils/validateEnv';
import { engine } from 'express-handlebars'
import router from './router/router';
//import logger from './middlewares/logger';

dotenv.config();
validateEnv(); //faz a validacao das variaveis de ambiente

const PORT = process.env.PORT ?? 6969;
const app = express();

app.engine("handlebars", engine())
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`);

app.use(morgan('short'));
//app.use(logger('complete'))

//chama o proximo middleware da cadeia
app.use((req, res, next) => {
console.log(`Requisição ${req.method} ${req.url}`);
next();
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Port running on port: ${PORT}`);
});
