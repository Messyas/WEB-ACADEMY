import { cleanEnv, port, str } from "envalid";

function validateEnv() {
    cleanEnv(process.env, {
        //recebe o objeto contido no process
        PORT: port(), //funcao que valida se a porta e valida
        NODE_ENV: str(),
    });
}

export default validateEnv;