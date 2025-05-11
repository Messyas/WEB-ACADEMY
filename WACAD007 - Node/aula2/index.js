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