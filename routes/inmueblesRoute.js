const router = require('express').Router();
/* const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); */
const knex = require('knex');
const knexConfig = require('../config/knexfile');
const db = knex(knexConfig.development);
/* const { JWT_TOKEN } = require('../middlewares/authUser'); */
/* const { validarPermisos, permisos } = require('../middlewares/permisos');
 */



router.get('/inmuebles', async (req, res) => {
    const inmuebles = await db.select().from('inmuebles');
    res.json(inmuebles);
});

router.get('/info', async (req, res) => {
    let cantidadInmuebles = await db('inmuebles').count('id as count').first();
    let timestamp = new Date().toLocaleString();
    const message = `Cantidad de inmuebles existentes: ${cantidadInmuebles.count}. Consulta realizada en: ${timestamp}`;
    res.send(message);
});

router.get('/filtro', async (req, res) => {
    const { metrosCuadrados, precio } = req.body;
    const filteredInmuebles = await db('inmuebles').where(builder => {
        if (metrosCuadrados) {
            builder.where('metrosCuadrados', metrosCuadrados);
        }
        if (precio) {
            builder.where('precio', precio);
        }
    });
    res.json(filteredInmuebles);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const inmueble = await db('inmuebles').where({ id }).first();
    if (inmueble) {
        res.json(inmueble);
    } else {
        res.status(404).json({ message: 'Inmueble not found' });
    }
});

router.post('/nuevo', async (req, res) => {
    const inmueble = req.body;
    await db('inmuebles').insert(inmueble);
    res.json({creado: true});
});


router.put('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const inmueble = req.body;
    await db('inmuebles').where({ id }).update(inmueble);
    const updatedInmueble = await db('inmuebles').where({ id }).first();
    res.json({ editado: true, inmueble: updatedInmueble });
});


router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    const idAsInt = parseInt(id, 10);
    if (!isNaN(idAsInt)) {
      await db('inmuebles').where({ id: idAsInt }).del();
      const remainingInmuebles = await db('inmuebles').select();
      res.json(remainingInmuebles);
    } else {
      res.status(400).json({ error: 'El ID proporcionado no es un número entero válido.' });
    }
  });



module.exports = router;