const http = require('http')
const fs = require('fs')
const dotenv = require('dotenv')
//falta o export pr ex2

dotenv.config()

const PORT = process.env.PORT ?? 9999

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8'})
    fs.readFile("./index.html", (err, content) => {
        if(err) res.write(err);
        else fs.write(toUpper(content.toString()));
        res.end()
    });
});

server.listen(PORT, () => {
    console.log(`O servidor esta rodando na porta ${PORT}`)
});

//instalar package json e package lock

//
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