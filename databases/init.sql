CREATE DATABASE IF NOT EXISTS bicitaxis_db;
USE bicitaxis_db;

CREATE TABLE IF NOT EXISTS bicitaxis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_unidad VARCHAR(10) NOT NULL,
    nombre_chofer VARCHAR(100) NOT NULL,
    zona_operacion VARCHAR(50) NOT NULL,
    estado ENUM('Activo', 'En Taller', 'Inactivo') DEFAULT 'Activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO bicitaxis (numero_unidad, nombre_chofer, zona_operacion, estado) VALUES
('BC-001', 'Juan Pérez', 'Mercado Impulsora', 'Activo'),
('BC-002', 'Luis Gómez', 'Metro Múzquiz', 'En Taller'),
('BC-003', 'Carlos Ruiz', 'Bosques de Aragón', 'Activo');