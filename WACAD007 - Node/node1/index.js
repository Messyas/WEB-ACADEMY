const http = require('http');
const fs = require('fs');

const pathdir = process.argv[2];

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    fs.readdir(pathdir, (err, files) => {
        if (err) console.log(err);
        else {
            console.log("\n Arquivos contidos no diretorio");
            files.forEach(file => {
                console.log(file);
            });
        }
        res.end();
    });
});

server.listen(2122);