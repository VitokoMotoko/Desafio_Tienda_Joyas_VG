const express = require('express');
const app = express();
const port = 3000;
const joyasRoutes = require('./routes/joyas');
const logger = require('./middlewares/logger');

app.use(express.json()); // Middleware para parsear JSON en las solicitudes
app.use(logger); // Middleware para registrar las rutas consultadas
app.use('/joyas', joyasRoutes); // Usa las rutas de joyas para las solicitudes que comienzan con /joyas

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});