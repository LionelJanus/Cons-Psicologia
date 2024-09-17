const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medicoModel');

// Registrar nuevo médico
const registrarMedico = async (req, res) => {
  const { email, password } = req.body;
  try {
    const nuevoMedico = new Medico({ email, password });
    await nuevoMedico.save();
    res.status(201).json({ message: 'Médico registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar médico', error });
  }
};

// Iniciar sesión del médico
const loginMedico = async (req, res) => {
  const { email, password } = req.body;
  try {
    const medico = await Medico.findOne({ email });
    if (!medico) return res.status(404).json({ message: 'Médico no encontrado' });

    const isMatch = await bcrypt.compare(password, medico.password);
    console.log('Contraseña coincidente:', isMatch); // Agrega esto para verificar
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // Crear token JWT
    const token = jwt.sign({ id: medico._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Verificar el token del médico
const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido', token: token });
  }
};

module.exports = { registrarMedico, loginMedico, verificarToken };
