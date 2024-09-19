// index.js
require("dotenv").config();

const server = require("./server"); // Importa la instancia de Express
const db = require("./src/lib/db"); // Asumo que es tu módulo de conexión a la base de datos

const port = process.env.PORT || 10000; // Usa el puerto asignado por la plataforma o 10000 para desarrollo local

db.connect()
  .then(() => {
    server.listen(port, () => {
      console.log("server is running on port", port);
    });
  })
  .catch((error) => {
    console.log("error connecting to the database", error);
  });
