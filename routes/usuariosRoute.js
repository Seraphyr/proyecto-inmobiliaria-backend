const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../config/knexfile');
const { JWT_TOKEN } = require('../middlewares/authUser');


router.post('/login', async (req, res) => {
    const { nombre, clave } = req.body;
    if (!nombre || !clave) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const usuarioEncontrado = await knex('usuarios').where({ nombre }).first();
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ userId: usuarioEncontrado.id }, JWT_TOKEN, { expiresIn: '10m' });
    res.status(200).json({ message: 'Usuario autenticado', token });
  });
  

router.post('/registro', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.clave, salt);
    const userData = { ...req.body, clave: hashedPassword };
    const userId = await knex('usuarios').insert(userData).returning('id');
    res.json({ message: 'Usuario registrado exitosamente', userId });
});
   

module.exports = router;