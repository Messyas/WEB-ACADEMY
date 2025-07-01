import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import router from "./router/index";
import { validateEnv } from "./utils/validateEnv";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 3366;

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
