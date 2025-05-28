import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 5577

app.get("/", (req, res) => {
    res.send("hello world!")
});

app.use(express.urlencoded({ extended: false})); //middleware que vai criar uma propriedade dentro de req que vai craiar um body pro user

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})


//shift + control + seta pra baixo