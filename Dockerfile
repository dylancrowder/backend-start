# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /myapp

# Copiar package.json y package-lock.json (si existe) para instalar dependencias
COPY package*.json ./

# Instalar las dependencias de la app
RUN npm install

# Copiar el resto de la aplicación (excluyendo archivos de .dockerignore)
COPY . .

# Si estás utilizando TypeScript o alguna herramienta de bundling, ejecuta el proceso de compilación
RUN npm run build  

# Exponer el puerto que usará la app
EXPOSE 8080

# Comando para arrancar la aplicación
CMD ["npm", "start"]
