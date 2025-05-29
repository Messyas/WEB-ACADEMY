import express from "express"
import dotenv from "dotenv"
import validateEnv from "./utils/validateEnv"
import logger from "morgan";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 5577;

app.use(logger("combined"));

app.use("/css", express.static(`${process.cwd()}/public/css`));
app.use("/js", express.static(`${process.cwd()}/public/js`));
app.use("/img", express.static(`${process.cwd()}/public/img`));

app.use(express.urlencoded({ extended: false})); //middleware que vai criar uma propriedade dentro de req que vai craiar um body pro user

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});


//shift + control + seta pra baixo