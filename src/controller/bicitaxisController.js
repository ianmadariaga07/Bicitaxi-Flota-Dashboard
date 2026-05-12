const db = require('../config/db');

// Obtener todos los bicitaxis (GET)
exports.obtenerTodos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM bicitaxis');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo bicitaxi (POST)
exports.crearNuevo = async (req, res) => {
    try {
        const { numero_unidad, nombre_chofer, zona_operacion, estado } = req.body;
        const [resultado] = await db.query(
            'INSERT INTO bicitaxis (numero_unidad, nombre_chofer, zona_operacion, estado) VALUES (?, ?, ?, ?)',
            [numero_unidad, nombre_chofer, zona_operacion, estado || 'Activo']
        );
        res.status(201).json({ id: resultado.insertId, mensaje: 'Bicitaxi registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un bicitaxi (PUT)
exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_chofer, zona_operacion, estado } = req.body;
        await db.query(
            'UPDATE bicitaxis SET nombre_chofer = ?, zona_operacion = ?, estado = ? WHERE id = ?',
            [nombre_chofer, zona_operacion, estado, id]
        );
        res.json({ mensaje: 'Bicitaxi actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un bicitaxi (DELETE)
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM bicitaxis WHERE id = ?', [id]);
        res.json({ mensaje: 'Bicitaxi eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};