# 🚀 Instrucciones para Railway + Nodemon

## ⚙️ Configuración completa para Railway

### 1. **Crear archivo .env**
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Variables de entorno para la aplicación
NODE_ENV=development
PORT=3000

# Configuración de la base de datos Railway
DB_HOST=turntable.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=WmPcVMFnCuYzVMEUxfHatyPSdNnbvCcL
DB_NAME=railway
DB_PORT=41272
```

### 2. **Instalar todas las dependencias**
```bash
npm install
```

### 3. **Configurar la base de datos en Railway**
1. Conecta a tu base de datos Railway usando tu cliente preferido:
   - **MySQL Workbench**
   - **phpMyAdmin**
   - **Línea de comandos**

2. Ejecuta el script `database.sql` para crear la tabla e insertar datos:
```bash
mysql -h turntable.proxy.rlwy.net -P 41272 -u root -p railway < database.sql
```

### 4. **Comandos disponibles**

#### Desarrollo con nodemon (recomendado):
```bash
npm run dev
```

#### Producción:
```bash
npm start
```

#### Producción con variables de entorno:
```bash
npm run prod
```

### 5. **Características de nodemon configuradas**
- ✅ **Auto-restart** cuando cambies archivos JS, JSON, HTML, CSS
- ✅ **Monitorea** tanto server.js como archivos en /public
- ✅ **Ignora** node_modules y archivos de log
- ✅ **Delay** de 1 segundo para evitar reinicios múltiples
- ✅ **Comando rs** para reiniciar manualmente
- ✅ **Modo verbose** para mejor debugging

### 6. **Verificar conexión**
Al ejecutar `npm run dev`, deberías ver:
```
[nodemon] starting `node server.js`
Conectado a MySQL exitosamente
Servidor ejecutándose en http://localhost:3000
```

### 7. **Solución de problemas**

#### Error SSL:
```
Error: ER_NOT_SUPPORTED_AUTH_MODE
```
**Solución**: La configuración SSL ya está incluida en el código

#### Error de conexión:
```
Error: connect ETIMEDOUT
```
**Solución**: Verifica que Railway esté activo y las credenciales sean correctas

#### Error de tabla no existe:
```
Error: ER_NO_SUCH_TABLE: Table 'railway.estudiantes' doesn't exist
```
**Solución**: Ejecuta el script `database.sql` en tu base de datos Railway

### 8. **Estructura de archivos actualizada**
```
gestion-estudiantes/
├── .env                    # Variables de entorno (crear manualmente)
├── nodemon.json           # Configuración de nodemon
├── server.js              # Servidor con conexión SSL para Railway
├── database.sql           # Script actualizado para Railway
├── package.json           # Dependencias actualizadas
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md
```

### 9. **Comandos útiles de nodemon**
- `rs` + Enter: Reiniciar servidor manualmente
- `Ctrl + C`: Detener el servidor
- Los cambios se aplican automáticamente al guardar archivos

### 10. **Variables de entorno disponibles**
- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto del servidor
- `DB_HOST`: Host de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
- `DB_NAME`: Nombre de la base de datos
- `DB_PORT`: Puerto de la base de datos

¡Listo! Tu aplicación ahora funciona perfectamente con Railway y nodemon 🎉 