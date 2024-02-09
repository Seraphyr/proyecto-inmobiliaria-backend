const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('../config/knexfile');
const db = knex(knexConfig.development);
const { JWT_TOKEN } = require('../middlewares/authUser');
const { validarPermisos, permisos} = require('../middlewares/permisos');




router.get('/', validarPermisos(permisos.ADMIN),     async (req, res) => {
    const inmuebles = await knex('inmuebles').select('*');
    res.json(inmuebles);
});

router.get('/info',validarPermisos(permisos.ADMIN), async (req, res) => {
    let cantidadInmuebles = await knex('inmuebles').count('id as count').first();
    let timestamp = new Date().toLocaleString();
    const message = `Cantidad de inmuebles existentes: ${cantidadInmuebles.count}. Consulta realizada en: ${timestamp}`;
    res.send(message);
});

router.get('/filtro',validarPermisos(permisos.ADMIN), async (req, res) => {
    const { metrosCuadrados, precio } = req.body;
    const filteredInmuebles = await knex('inmuebles').where(builder => {
        if (metrosCuadrados) {
            builder.where('metrosCuadrados', metrosCuadrados);
        }
        if (precio) {
            builder.where('precio', precio);
        }
    });
    res.json(filteredInmuebles);
});

router.get('/:id',validarPermisos(permisos.ADMIN), async (req, res) => {
    const { id } = req.params;
    const inmueble = await knex('inmuebles').where({ id }).first();
    if (inmueble) {
        res.json(inmueble);
    } else {
        res.status(404).json({ message: 'Inmueble not found' });
    }
});

router.post('/nuevo',validarPermisos(permisos.ADMIN), async (req, res) => {
    const nuevoInmueble = req.body;
    const inmueble = await knex('inmuebles').insert(nuevoInmueble).into('inmuebles').returning('*');
    res.json(inmueble);
});


router.put('/editar/:id',validarPermisos(permisos.ADMIN), async (req, res) => {
    const { id } = req.params;
    const updatedAttributes = req.body;
    await knex('inmuebles').where({ id }).update(updatedAttributes);
    const updatedInmueble = await knex('inmuebles').where({ id }).first();
    res.json(updatedInmueble);
});

router.delete('/eliminar/:id',validarPermisos(permisos.ADMIN), async (req, res) => {
    const { id } = req.params;
    await knex('inmuebles').where({ id }).del();
    const remainingInmuebles = await knex('inmuebles').select('*');
    res.json(remainingInmuebles);
});



module.exports = router;