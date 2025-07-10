# 📚 Sistema de Gestión de Estudiantes

Una aplicación web completa desarrollada en Node.js con Express y MySQL para gestionar estudiantes con todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## 🚀 Características

- ✅ **Consultar todos los registros** - Vista general de estudiantes
- ✅ **Consultar registros individuales** - Detalles específicos de cada estudiante
- ✅ **Editar registros** - Actualizar información de estudiantes
- ✅ **Eliminar registros** - Borrar estudiantes con confirmación
- ✅ **Agregar registros** - Registrar nuevos estudiantes
- 🔍 **Búsqueda en tiempo real** - Filtrar estudiantes por nombre, email, etc.
- 📱 **Interfaz responsive** - Funciona perfectamente en móviles y tablets
- 🎨 **Diseño moderno** - Interfaz atractiva con animaciones suaves

## 📋 Requisitos Previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) (versión 5.7 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd gestion-estudiantes
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar la base de datos MySQL

#### Opción A: Usando línea de comandos
```bash
# Conectarse a MySQL
mysql -u root -p

# Ejecutar el script SQL
mysql> source database.sql;
```

#### Opción B: Usando herramientas gráficas
1. Abre phpMyAdmin, MySQL Workbench o tu herramienta preferida
2. Ejecuta el contenido del archivo `database.sql`

### 4. Configurar conexión a base de datos

Edita el archivo `server.js` y ajusta la configuración de MySQL:

```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TU_PASSWORD_AQUI', // Cambia esto por tu contraseña
    database: 'gestion_estudiantes'
});
```

### 5. Iniciar la aplicación
```bash
# Modo producción
npm start

# Modo desarrollo (con reinicio automático)
npm run dev
```

### 6. Acceder a la aplicación
Abre tu navegador y visita: `http://localhost:3000`

## 📖 Uso de la Aplicación

### 🆕 Agregar Estudiante
1. Completa el formulario en la parte superior
2. Haz clic en "Guardar"
3. El estudiante aparecerá en la lista automáticamente

### ✏️ Editar Estudiante
1. Haz clic en el botón "Editar" en la tarjeta del estudiante
2. El formulario se llenará con los datos actuales
3. Modifica los campos necesarios y haz clic en "Guardar"

### 🗑️ Eliminar Estudiante
1. Haz clic en el botón "Eliminar" en la tarjeta del estudiante
2. Confirma la eliminación en el modal que aparece
3. El estudiante será eliminado permanentemente

### 🔍 Buscar Estudiantes
1. Usa el campo de búsqueda para filtrar por:
   - Nombre
   - Apellido
   - Email
   - Carrera
2. La búsqueda funciona en tiempo real

## 🗄️ Estructura de la Base de Datos

### Tabla: `estudiantes`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT AUTO_INCREMENT | ID único del estudiante |
| nombre | VARCHAR(100) | Nombre del estudiante |
| apellido | VARCHAR(100) | Apellido del estudiante |
| email | VARCHAR(150) | Email único del estudiante |
| edad | INT | Edad del estudiante |
| carrera | VARCHAR(100) | Carrera que estudia |
| fecha_registro | TIMESTAMP | Fecha de registro automática |

## 🔌 API Endpoints

### Estudiantes
- `GET /api/estudiantes` - Obtener todos los estudiantes
- `GET /api/estudiantes/:id` - Obtener un estudiante específico
- `POST /api/estudiantes` - Crear un nuevo estudiante
- `PUT /api/estudiantes/:id` - Actualizar un estudiante
- `DELETE /api/estudiantes/:id` - Eliminar un estudiante

### Ejemplo de uso de la API:

```javascript
// Crear estudiante
fetch('/api/estudiantes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@email.com',
        edad: 20,
        carrera: 'Ingeniería en Sistemas'
    })
});
```

## 📁 Estructura del Proyecto

```
gestion-estudiantes/
├── public/
│   ├── index.html      # Página principal
│   ├── styles.css      # Estilos CSS
│   └── script.js       # Lógica JavaScript
├── database.sql        # Script de base de datos
├── server.js          # Servidor Express
├── package.json       # Configuración de npm
└── README.md          # Este archivo
```

## 🎨 Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MySQL2** - Conexión a base de datos
- **Body-parser** - Procesamiento de datos
- **CORS** - Manejo de políticas de origen cruzado

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Lógica interactiva
- **Font Awesome** - Iconos

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos

## 🔧 Personalización

### Cambiar campos de estudiante
1. Modifica la tabla en `database.sql`
2. Actualiza los endpoints en `server.js`
3. Ajusta el formulario en `index.html`
4. Actualiza la lógica en `script.js`

### Modificar estilos
Edita `public/styles.css` para cambiar:
- Colores del tema
- Fuentes
- Espaciado
- Animaciones

## 🚨 Solución de Problemas

### Error de conexión a MySQL
```
Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost'
```
**Solución**: Verifica tu usuario y contraseña en `server.js`

### Error de puerto ocupado
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solución**: Cambia el puerto en `server.js` o cierra la aplicación que usa el puerto 3000

### Base de datos no encontrada
```
Error: ER_BAD_DB_ERROR: Unknown database 'gestion_estudiantes'
```
**Solución**: Ejecuta el script `database.sql` primero

## 📝 Características Adicionales

- **Validación de datos** - Campos requeridos y formatos válidos
- **Manejo de errores** - Mensajes informativos para el usuario
- **Notificaciones** - Confirmaciones visuales de acciones
- **Responsive design** - Adaptable a cualquier pantalla
- **Búsqueda instantánea** - Filtros en tiempo real
- **Confirmación de eliminación** - Evita borrados accidentales

## 🤝 Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- Email: tu.email@ejemplo.com
- GitHub: [@tu-usuario](https://github.com/tu-usuario)

---

¡Gracias por usar el Sistema de Gestión de Estudiantes! 🎓 