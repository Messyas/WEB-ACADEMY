"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 5577;
app.use((0, morgan_1.default)("combined"));
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="./script.js"></script>
    <link rel="stylesheet" href="../css/styles.css" />
  </head>
  <body>
    <h1>Web Academy</h1>
  </body>
</html>
`;
app.use("/css", express_1.default.static(`${process.cwd()}/public/css`));
app.use("/js", express_1.default.static(`${process.cwd()}/public/js`));
app.use("/img", express_1.default.static(`${process.cwd()}/public/img`));
app.get("/", (req, res) => {
    res.send(html);
});
app.use(express_1.default.urlencoded({ extended: false })); //middleware que vai criar uma propriedade dentro de req que vai craiar um body pro user
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
//shift + control + seta pra baixo
