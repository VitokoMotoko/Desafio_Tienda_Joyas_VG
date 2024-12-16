const express = require('express');
const router = express.Router();
const joyasController = require('../controllers/joyasController');

router.get('/', getJoyas); // Define la ruta GET /joyas y la asocia con el controlador getJoyas
router.get('/filtros', getJoyasFiltradas); // Define la ruta GET /joyas/filtros y la asocia con el controlador getJoyasFiltradas

module.exports = router;