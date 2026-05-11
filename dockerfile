# 1. Usamos la versión 'alpine' (Linux ultra ligero, pesa como 5MB en lugar de 1GB)
FROM node:18-alpine

# 2. Definimos la carpeta de trabajo DENTRO del contenedor
WORKDIR /usr/src/app

# 3. EL TRUCO DEL CACHÉ: Copiamos SOLO los archivos de dependencias primero
COPY package*.json ./

# 4. Instalamos dependencias (Si no cambiaste el package.json, Docker se salta este paso y ahorras minutos)
RUN npm install

# 5. Copiamos el resto del código fuente. Le damos propiedad al usuario 'node'
COPY --chown=node:node . .

# 6. SEGURIDAD PRO: Por defecto Docker usa el usuario 'root' (Peligroso). 
# Cambiamos al usuario 'node' que ya viene en la imagen alpine por seguridad.
USER node

# 7. Exponemos el puerto que usa tu app
EXPOSE 3000

# 8. El comando para arrancar tu app
CMD ["node", "app.js"]