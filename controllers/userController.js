const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const knexConfig = require('../config/knexfile');
const db = knex(knexConfig.development)
const { JWT_TOKEN } = require('../middlewares/authUser');


const registerUser= async (req, res) => {
    try {
        const { nombre, apellido,  email, id_perfil, clave } = req.body;
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const hashedPassword = await bcrypt.hash(clave, 10);
        const newUser = await userModel.createUser(nombre, apellido,  email, id_perfil, hashedPassword);
        res.status(201).json({ message: 'Usuario creado exitosamente', newUser });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
}

const loginUser =  async (req, res) => {

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
  }

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await db('usuarios').where({ id }).del();
    if (deletedUser) {
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' }); 
        return
    }
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser
}