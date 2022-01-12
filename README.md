# Bienvenido a Challenge Churrasco


- Para inicializar el proyecto clonar el [repositorio](https://github.com/Jose-G-Montenegro/Challenge-Churrasco)

- Moverse a la carpeta api

- En la carpeta api ejecutar el siguiente comando para instalar las dependencias del proyecto

```
npm install
```

- Crear el archivo .env dentro de la carpeta api con las siguientes variables de entorno:

```
PORT = 3001
MONGO_URL = conexion con mongoDB Atlas
JWT_SECRET = Contraseña aleatoria
```
El parámetro `MONGO_URL` es la dirección que permite la conexión con la base de datos y el parámetro `JWT_SECRET` permite encriptar el token

- Para inicializar el servidor en el puerto local 3001, ejecutamos el siguiente comando:

```
npm start
```