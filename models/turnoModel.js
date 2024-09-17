const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  }
});

const Turno = mongoose.model('Turno', turnoSchema);

module.exports = Turno;
