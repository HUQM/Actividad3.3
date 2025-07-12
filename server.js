const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de la conexión a MySQL para Railway
const connection = mysql.createConnection({
    host: 'turntable.proxy.rlwy.net',
    user: 'root',
    password: 'WmPcVMFnCuYzVMEUxfHatyPSdNnbvCcL',
    database: 'railway',
    port: 41272,
    ssl: {
        rejectUnauthorized: false
    },
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL exitosamente');
});

// Ruta principal - servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// CRUD Endpoints

// 1. Obtener todos los estudiantes (READ)
app.get('/api/estudiantes', (req, res) => {
    const query = 'SELECT * FROM estudiantes ORDER BY id DESC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener estudiantes:', err);
            res.status(500).json({ error: 'Error del servidor' });
            return;
        }
        res.json(results);
    });
});

// 2. Obtener un estudiante por ID (READ)
app.get('/api/estudiantes/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM estudiantes WHERE id = ?';
    
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener estudiante:', err);
            res.status(500).json({ error: 'Error del servidor' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Estudiante no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// 3. Crear un nuevo estudiante (CREATE)
app.post('/api/estudiantes', (req, res) => {
    const { nombre, apellido, email, edad, carrera } = req.body;
    
    // Validación básica
    if (!nombre || !apellido || !email || !edad || !carrera) {
        res.status(400).json({ error: 'Todos los campos son requeridos' });
        return;
    }
    
    const query = 'INSERT INTO estudiantes (nombre, apellido, email, edad, carrera) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(query, [nombre, apellido, email, edad, carrera], (err, results) => {
        if (err) {
            console.error('Error al crear estudiante:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ error: 'El email ya está registrado' });
            } else {
                res.status(500).json({ error: 'Error del servidor' });
            }
            return;
        }
        res.status(201).json({ 
            message: 'Estudiante creado exitosamente', 
            id: results.insertId 
        });
    });
});

// 4. Actualizar un estudiante (UPDATE)
app.put('/api/estudiantes/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, email, edad, carrera } = req.body;
    
    // Validación básica
    if (!nombre || !apellido || !email || !edad || !carrera) {
        res.status(400).json({ error: 'Todos los campos son requeridos' });
        return;
    }
    
    const query = 'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, edad = ?, carrera = ? WHERE id = ?';
    
    connection.query(query, [nombre, apellido, email, edad, carrera, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar estudiante:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ error: 'El email ya está registrado' });
            } else {
                res.status(500).json({ error: 'Error del servidor' });
            }
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Estudiante no encontrado' });
            return;
        }
        res.json({ message: 'Estudiante actualizado exitosamente' });
    });
});

// 5. Eliminar un estudiante (DELETE)
app.delete('/api/estudiantes/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM estudiantes WHERE id = ?';
    
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar estudiante:', err);
            res.status(500).json({ error: 'Error del servidor' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Estudiante no encontrado' });
            return;
        }
        res.json({ message: 'Estudiante eliminado exitosamente' });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Manejo de errores de la conexión
connection.on('error', (err) => {
    console.error('Error en la conexión MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconectando...');
        connection.connect();
    }
}); 