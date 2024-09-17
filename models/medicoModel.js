const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const medicoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Antes de guardar, encriptar la contraseña
medicoSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;
