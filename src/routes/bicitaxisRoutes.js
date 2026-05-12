const express = require('express');
const router = express.Router();
// Ojo con la ruta: tu carpeta se llama 'controller' (sin 's' al final)
const bicitaxisController = require('../controller/bicitaxisController'); 

router.get('/', bicitaxisController.obtenerTodos);
router.post('/', bicitaxisController.crearNuevo);
router.put('/:id', bicitaxisController.actualizar);
router.delete('/:id', bicitaxisController.eliminar);

module.exports = router;