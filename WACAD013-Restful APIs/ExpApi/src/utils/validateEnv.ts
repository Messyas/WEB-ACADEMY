import { cleanEnv, port, str } from "envalid";
import { Languages } from "../resources/language/language.contants";

export function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    DEFAULT_LANGUAGE: str({ choices: Object.values(Languages) }),
    NODE_ENV: str({choices: ["development", "production"]}),
    DATABASE_URL: str(),
    SESSION_SECRET: str(),
  });
}

export default validateEnv;
