"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router/router"));
const express_handlebars_1 = require("express-handlebars");
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 5577;
app.engine("handlebars", (0, express_handlebars_1.engine)());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.use((0, morgan_1.default)("combined"));
app.use("/css", express_1.default.static(`${process.cwd()}/public/css`));
app.use("/js", express_1.default.static(`${process.cwd()}/public/js`));
app.use("/img", express_1.default.static(`${process.cwd()}/public/img`));
app.use(router_1.default); //midware pra rotas do router
//app.use(express.urlencoded({ extended: false})); //middleware que vai criar uma propriedade dentro de req que vai craiar um body pro user
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
//shift + control + seta pra baixo
