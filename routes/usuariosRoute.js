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
    const userData = req.body;
    await knex('usuarios').insert(userData);
    res.json({ message: 'Usuario registrado exitosamente' });
});

module.exports = router;