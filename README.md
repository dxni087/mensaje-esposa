# 🌹 Mensajes Diarios de Amor

Una página web romántica donde se desbloquea un mensaje cada día de la semana (Lunes a Sábado), con flores animadas y corazones.

## 🚀 Cómo desplegar en Railway

### Opción 1: Desde GitHub (recomendada)

1. Crea un repositorio nuevo en GitHub y sube estos archivos:
   ```bash
   cd /Users/daniel/Documents/Od
   git init
   git add .
   git commit -m "Mensajes de amor para mi esposa"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

2. Ve a [railway.app](https://railway.app) e inicia sesión.

3. Click en **"New Project"** → **"Deploy from GitHub repo"** → selecciona tu repo.

4. Railway detectará Node.js automáticamente, instalará dependencias y arrancará el servidor.

5. En **Settings → Networking → Generate Domain** para obtener una URL pública (ej: `tu-app.up.railway.app`).

6. ¡Comparte la URL con tu esposa! 💕

### Opción 2: Con Railway CLI

```bash
npm i -g @railway/cli
railway login
cd /Users/daniel/Documents/Od
railway init
railway up
railway domain
```

## ✏️ Personalizar los mensajes

Edita `public/script.js` y modifica el arreglo `messages` (líneas 3-40). Puedes cambiar:
- Las fechas (`date`)
- El emoji de flor (`icon`)
- El texto del mensaje (`message`)

## 🧪 Probar localmente

```bash
npm install
npm start
```

Abre [http://localhost:3000](http://localhost:3000).

## 📅 Fechas actuales

- Lunes 18 de mayo
- Martes 19 de mayo
- Miércoles 20 de mayo
- Jueves 21 de mayo
- Viernes 22 de mayo
- Sábado 23 de mayo

> Los mensajes se desbloquean a las 00:00 hora local del navegador.
