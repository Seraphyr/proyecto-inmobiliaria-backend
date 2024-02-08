const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const usuarios = require('../routes/usuariosRoute');
const knex = require('../config/knexfile');

const permisos = {
    ADMIN : 1,
    USER1 : 2,
    USER2 : 3,
    USER3 : 4,
}

const validarPermisos = (permiso_requerido) => {
    return async (req, res, next) => {
      const token = req.headers['authorization'];
      if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
      }
      try {
        const decoded = jwt.verify(token, 'secret');
        const usuarioId = decoded.usuario.id;
        const usuario = await knex('usuarios').where('id', usuarioId).first();
        if (permiso_requerido.includes(usuario.permiso)) {
          next();
        } else {
          return res.status(401).json({ message: 'No autorizado' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    };
  };

module.exports = {
    permisos,
    validarPermisos
}