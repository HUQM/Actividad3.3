# 🚀 Pasos Rápidos - Railway + Nodemon

## 📋 Lista de verificación rápida

### ✅ **1. Crear archivo .env**
```bash
# Crea el archivo .env en la raíz del proyecto
touch .env
```

Pega este contenido en el archivo `.env`:
```env
NODE_ENV=development
PORT=3000
DB_HOST=turntable.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=WmPcVMFnCuYzVMEUxfHatyPSdNnbvCcL
DB_NAME=railway
DB_PORT=41272
```

### ✅ **2. Instalar dependencias**
```bash
npm install
```

### ✅ **3. Configurar base de datos automáticamente**
```bash
npm run setup-db
```

### ✅ **4. Ejecutar con nodemon**
```bash
npm run dev
```

### ✅ **5. Abrir navegador**
```
http://localhost:3000
```

---

## 🔧 Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Ejecutar con nodemon (desarrollo) |
| `npm start` | Ejecutar sin nodemon (producción) |
| `npm run setup-db` | Configurar base de datos |
| `npm run prod` | Ejecutar en modo producción |

---

## 🆘 Solución rápida de problemas

### ❌ **Error: Cannot find module 'dotenv'**
```bash
npm install dotenv
```

### ❌ **Error: Cannot connect to MySQL**
1. Verifica que el archivo `.env` esté creado
2. Verifica que Railway esté activo
3. Ejecuta: `npm run setup-db`

### ❌ **Error: Table doesn't exist**
```bash
npm run setup-db
```

### ❌ **Error: nodemon not found**
```bash
npm install nodemon --save-dev
```

---

## 🎯 **Verificación exitosa**

Si todo funciona correctamente, deberías ver:

```
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): server.js public/
[nodemon] watching extensions: js,json,html,css
[nodemon] starting `node server.js`
Conectado a MySQL exitosamente
Servidor ejecutándose en http://localhost:3000
```

¡Listo! Tu aplicación está funcionando con Railway y nodemon 🎉

---

## 📱 **Funcionalidades disponibles**

- ✅ Agregar estudiantes
- ✅ Consultar todos los estudiantes
- ✅ **Ver detalles individuales** - Modal con información completa
- ✅ Editar estudiantes
- ✅ Eliminar estudiantes
- ✅ Búsqueda en tiempo real
- ✅ Interfaz responsive
- ✅ Notificaciones visuales
- ⭐ Sistema de calificaciones con estrellas
- 🏆 Indicadores de estado activo/inactivo

---

## 🔄 **Reinicio automático**

Nodemon reiniciará automáticamente el servidor cuando cambies:
- `server.js`
- Archivos en `/public`
- Archivos `.js`, `.json`, `.html`, `.css`

Para reiniciar manualmente: escribe `rs` + Enter en la terminal. 