const express = require('express');
const { crearTurno, obtenerTurnos, eliminarTurno } = require('../controllers/turnosController');
const { verificarToken } = require('../auth/authController');
const router = express.Router();

// Ruta para crear un nuevo turno
router.post('/turnos', crearTurno);

// Ruta protegida para el médico (requiere inicio de sesión)
router.get('/obtener-turnos', verificarToken, obtenerTurnos);

// Ruta para eliminar turnos
router.delete('/eliminar-turno/:id', eliminarTurno); 
module.exports = router;
