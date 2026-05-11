const express = require('express');
const app = express();
const bicitaxiRoutes = require('./src/routes/bicitaxisRoutes');

app.use(express.json());
app.use(express.static('public')); // Sirve los archivos de Stitch

// Usa las rutas que definiremos
app.use('/api/bicitaxis', bicitaxiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando en el puerto ${PORT}`);
});