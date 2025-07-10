-- Configuración para Railway (la base de datos 'railway' ya existe)
-- No necesitamos crear la base de datos, Railway ya la proporciona
USE railway;

-- Crear la tabla de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    edad INT NOT NULL,
    carrera VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO estudiantes (nombre, apellido, email, edad, carrera) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', 20, 'Ingeniería en Sistemas'),
('María', 'González', 'maria.gonzalez@email.com', 22, 'Licenciatura en Administración'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', 21, 'Ingeniería Civil'),
('Ana', 'López', 'ana.lopez@email.com', 19, 'Licenciatura en Psicología'),
('Luis', 'Martínez', 'luis.martinez@email.com', 23, 'Ingeniería Industrial'),
('Sofia', 'Hernández', 'sofia.hernandez@email.com', 20, 'Licenciatura en Derecho'),
('Diego', 'Torres', 'diego.torres@email.com', 22, 'Ingeniería en Computación'),
('Valeria', 'Ramírez', 'valeria.ramirez@email.com', 21, 'Licenciatura en Medicina');

-- Consultar todos los registros para verificar
SELECT * FROM estudiantes; 