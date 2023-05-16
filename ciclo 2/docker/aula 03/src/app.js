import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './src' });
});
  
app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);
});