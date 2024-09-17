const Turno = require('../models/turnoModel');

// Crear un nuevo turno
const crearTurno = async (req, res) => {
  try {
    const { nombre, apellido, telefono, fecha, hora } = req.body;
    const turnoExistente = await Turno.findOne({ fecha, hora });
    if (turnoExistente) {
      return res.status(400).json({ message: 'El turno ya está ocupado. Elige otra fecha y hora.' });
    }

    const nuevoTurno = new Turno({ nombre, apellido, telefono, fecha, hora });
    await nuevoTurno.save();
    res.status(201).json({ message: 'Turno creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el turno', error });
  }
};

// Obtener todos los turnos (para el médico)
const obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();

    for (let index = 0; index < turnos.length; index++) {
      let element = turnos[index];
      
      element.fecha = new Date(element.fecha).toLocaleString().split(',')[0];
    }

    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los turnos', error });
  }
};

// Eliminar un turno
const eliminarTurno = async (req, res) => {
  const { id } = req.params;

  try {
    const turnoEliminado = await Turno.findByIdAndDelete(id);
    if (!turnoEliminado) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.status(200).json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el turno', error });
  }
};

module.exports = { crearTurno, obtenerTurnos, eliminarTurno };
