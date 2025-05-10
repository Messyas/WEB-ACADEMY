const http = require("http");
const dotenv = require("dotenv");
const fs = require("fs")

dotenv.config({ path: `.env.${process.env.PORTNODE_ENV}`});

const PORT = process.env.PORT ?? 8888

console.log(process.env)

fs.readdir(nomeDir, (err, arquivos) => {
    if (err) console.log(err);
    console.log("\n Nome do diretorio:");
    arquivos.forEach(arquivo => {
        console.log(arquivo);
    });
});

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"text/html;charset=utf8"});
    res.write("Web academy");
    res.end();
});

server.listen(PORT, () => {
    console.log(`ervidor rodando na porta ${PORT}`);
});