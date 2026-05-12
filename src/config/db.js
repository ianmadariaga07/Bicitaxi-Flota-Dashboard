const mysql = require('mysql2/promise');

// Creamos un "pool" de conexiones. 
// Esto es mucho más eficiente que abrir y cerrar una conexión por cada consulta.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Comprobamos la conexión inicial para asegurarnos de que todo está bien
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a la base de datos MySQL');
        connection.release(); // Liberamos la conexión de vuelta al pool
    })
    .catch(error => {
        console.error('❌ Error al conectar a la base de datos:', error.message);
    });

module.exports = pool;