const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');


exports.registerUser= async (req, res) => {
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