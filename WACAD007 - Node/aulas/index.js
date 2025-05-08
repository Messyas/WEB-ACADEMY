
const fs = require('fs');

console.log("A");

fs.rename("./teste1.txt", "./teste2.txt", () => { //thread separada ex
    if (err) console.error(err);
    console.log("arquivo renomeado");
});

console.log("B");
