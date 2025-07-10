const mysql = require('mysql2');
require('dotenv').config();

// Configuración de la conexión a MySQL para Railway
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'turntable.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'WmPcVMFnCuYzVMEUxfHatyPSdNnbvCcL',
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_PORT || 41272,
    ssl: {
        rejectUnauthorized: false
    },
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000
});

// SQL para crear la tabla y insertar datos
const createTableSQL = `
CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    edad INT NOT NULL,
    carrera VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const insertDataSQL = `
INSERT IGNORE INTO estudiantes (nombre, apellido, email, edad, carrera) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', 20, 'Ingeniería en Sistemas'),
('María', 'González', 'maria.gonzalez@email.com', 22, 'Licenciatura en Administración'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', 21, 'Ingeniería Civil'),
('Ana', 'López', 'ana.lopez@email.com', 19, 'Licenciatura en Psicología'),
('Luis', 'Martínez', 'luis.martinez@email.com', 23, 'Ingeniería Industrial'),
('Sofia', 'Hernández', 'sofia.hernandez@email.com', 20, 'Licenciatura en Derecho'),
('Diego', 'Torres', 'diego.torres@email.com', 22, 'Ingeniería en Computación'),
('Valeria', 'Ramírez', 'valeria.ramirez@email.com', 21, 'Licenciatura en Medicina');
`;

// Función para configurar la base de datos
async function setupDatabase() {
    try {
        console.log('🔗 Conectando a Railway MySQL...');
        
        // Conectar a la base de datos
        await new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        
        console.log('✅ Conectado a Railway MySQL exitosamente');
        
        // Crear tabla
        console.log('📋 Creando tabla estudiantes...');
        await new Promise((resolve, reject) => {
            connection.query(createTableSQL, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        
        console.log('✅ Tabla estudiantes creada exitosamente');
        
        // Insertar datos de ejemplo
        console.log('📝 Insertando datos de ejemplo...');
        await new Promise((resolve, reject) => {
            connection.query(insertDataSQL, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        
        console.log('✅ Datos de ejemplo insertados exitosamente');
        
        // Verificar datos
        console.log('🔍 Verificando datos insertados...');
        const results = await new Promise((resolve, reject) => {
            connection.query('SELECT COUNT(*) as total FROM estudiantes', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        
        console.log(`✅ Total de estudiantes en la base de datos: ${results[0].total}`);
        console.log('🎉 ¡Configuración de base de datos completada!');
        
    } catch (error) {
        console.error('❌ Error configurando la base de datos:', error);
        console.error('💡 Verifica que Railway esté activo y las credenciales sean correctas');
    } finally {
        connection.end();
    }
}

// Ejecutar la configuración
setupDatabase(); 