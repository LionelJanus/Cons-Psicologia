const express = require('express');
const { registrarMedico, loginMedico } = require('../auth/authController');
const router = express.Router();



// Ruta para registrar un médico
router.post('/register', registrarMedico);

// Ruta para iniciar sesión del médico
router.post('/login', loginMedico);


module.exports = router;
