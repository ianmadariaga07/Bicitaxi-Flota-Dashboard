const db = require('../config/db'); // Necesitarás configurar la conexión aquí

exports.obtenerTodos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM bicitaxis');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearNuevo = async (req, res) => {
    // Lógica para el INSERT INTO...
};