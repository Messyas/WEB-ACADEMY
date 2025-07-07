import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session, { MemoryStore } from "express-session";
import { v4 as uuidv4 } from "uuid";
import router from "./router/index";
import { validateEnv } from "./utils/validateEnv";
import { setCookieLanguage } from "./middlewares/setCookieLanguage";
declare module "express-session" {
  interface SessionData {
    uid: string;
    userType: string;
  }
}

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 3366;

app.use(express.json());
app.use(cookieParser());
app.use(setCookieLanguage);
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET ?? "minha-chave-super-segura",
    resave: true, //renova a sessão a cada requisição
    saveUninitialized: true,
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 },
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
