import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import logger from 'morgan';
import router from './router/router';
import { engine } from 'express-handlebars';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5577;

// eslint-disable-next-line @typescript-eslint/no-require-imports
app.engine('handlebars', engine({ helpers: require(`${__dirname}/views/helpers/helpers.ts`)}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(logger('combined'));

app.use('/css', express.static(`${process.cwd()}/public/css`));
app.use('/js', express.static(`${process.cwd()}/public/js`));
app.use('/img', express.static(`${process.cwd()}/public/img`));

app.use(router); //midware pra rotas do router

app.use(express.urlencoded({ extended: false})); //middleware que vai criar uma propriedade dentro de req que vai craiar um body pro user

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
//shift + control + seta pra baixo
