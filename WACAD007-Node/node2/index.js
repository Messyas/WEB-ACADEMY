import http from "http";         
import fs from "fs";                
import path from "path";           
import dotenv from "dotenv";        
import { createLink } from "./util.js"; 

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 3232;
const pathdir = process.argv[2];

const server = http.createServer((req, res) => {
  const requested = decodeURIComponent(req.url);
  if (requested === "/" || requested === "") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.readdir(pathdir, (err, files) => {
      if (err) {
        res.write("<h1>Erro ao ler dir</h1>");
        console.error(err);
      } else {
        files.forEach((file) => {
          res.write(createLink(file));
        });
      }
      res.end();
    });
  } else {
    const filePath = path.join(pathdir, requested);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) console.log(err);
      const html = `
            <body>
              <a href="/">Voltar</a>
              <br>
              <div">${data}</div>
            </body>
        `;
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    });
  }
});

server.listen(PORT);
