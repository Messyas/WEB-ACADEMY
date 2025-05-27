import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 5577

app.get("/", (req, res) => {
    res.send("hello world!")
});

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})