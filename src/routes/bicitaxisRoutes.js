const express = require('express');
const router = express.Router();
const bicitaxisController = require('../controller/bicitaxisController');

router.get('/', bicitaxisController.obtenerTodos);
router.post('/', bicitaxisController.crearNuevo);

module.exports = router;