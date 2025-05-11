const http = require("http");
const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.PORTNODE_ENV}`});

const PORT = process.env.PORT ?? 8888

console.log(process.env)

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"text/html;charset=utf8"});
    res.write("Web academy");
    res.end();
});

server.listen(PORT, () => {
    console.log(`ervidor rodando na porta ${PORT}`);
});

//-D <-- dependencia de desenvolvimento
//Ex: npm install -D nodemon

//pacote forever - de producao

//npx nodemon
//npm run start:prod

