require("dotenv").config();
const express = require('express');
const { verify } = require('./src/lib/jwt');
const getArg = require('./src/lib/getArg');

const app = express();
const PORT = getArg('PORT') || process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para verificar el token JWT
app.use(async (req, res, next) => {
    const token = req.headers['authorization']?.replace("Bearer ", "");
    if (token) {
        try {
            req.user = verify(token);
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
});

// Ruta de ejemplo que requiere autenticación
app.get('/protected', (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Ruta para la raíz
app.get("/", (request, response) => {
    response.json({
      success: true,
      message: "Devto API",
    });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
