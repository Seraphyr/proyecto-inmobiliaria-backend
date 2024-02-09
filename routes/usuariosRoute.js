const router = require('express').Router();
const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knexConfig = require('../config/knexfile');
const db = knex(knexConfig.development)
const { JWT_TOKEN } = require('../middlewares/authUser');
const userController = require('../controllers/userController');


router.post('/login', async (req, res) => {
  const { nombre, clave } = req.body;
  if (!nombre || !clave) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  const usuarioEncontrado = await db('usuarios').where({ nombre }).first();
  if (!usuarioEncontrado) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ userId: usuarioEncontrado.id }, JWT_TOKEN, { expiresIn: '10m' });
  res.status(200).json({ message: 'Usuario autenticado', token });
});

router.post('/register', userController.registerUser);

/* 
router.post('/registro', async (req, res) => {
  const { nombre, apellido, id_perfil, email, clave } = req.body;
  console.log(req.body);
  if (!req.body){
    res.status(500).json({ message: 'Error al registrar el usuario' });
  } else {
       const { nombre, apellido, id_perfil, email, clave } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(clave, salt);
    const userData = { nombre, apellido, email, id_perfil, clave: hashedPassword };
    const userId = await db('usuarios').insert(userData).returning('id');
    res.json({ message: 'Usuario registrado exitosamente', userId }); 
  }
}); */

module.exports = router;