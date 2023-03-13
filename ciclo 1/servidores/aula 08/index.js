import express from 'express'

const app = express()
const port = 8000

app.get('/', (req, res) => {
    res.send('<h1>Utilize /calculador/soma/{valor1}/{valor2}</h1>')
})

app.get('/calculador/soma/:valor1/:valor2', (req, res) => {
    const result = parseInt(req.params.valor1) + parseInt(req.params.valor2)
    res.status(200).send({"Primeiro número": req.params.valor1, "Segundo número": req.params.valor2, "Resultado": result,})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) 
})