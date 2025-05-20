const express = require("express");
const dotenv = require("dotenv");

dotenv.config()
const PORT = process.env.PORT ?? 6969
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/about", (req, res) => {
    res.send("about page");
});

app.listen(PORT, () => {
    console.log(`Port running on port: ${PORT}`);
});