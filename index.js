
require('dotenv').config();

const express = require('express');


const app = express();
app.use(express.json());
const port = process.env.EXPRESS_PORT || 3001;


const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin_db_pass',
        database: 'proyecto-inmobiliaria'
    }
});

app.get('/', (req, res) => {
    res.send('Bienvenidos a INMUEBLES SRL');
});

app.get('/api/inmuebles', async (req, res) => {
    const inmuebles = await knex('inmuebles').select('*');
    res.json(inmuebles);
});

app.get('/api/inmuebles/:id', async (req, res) => {
    const { id } = req.params;
    const inmueble = await knex('inmuebles').where({ id }).first();
    if (inmueble) {
        res.json(inmueble);
    } else {
        res.status(404).json({ message: 'Inmueble not found' });
    }
});

app.post('/api/inmuebles/nuevo', async (req, res) => {
    const nuevoInmueble = req.body;
    const inmueble = await knex('inmuebles').insert(nuevoInmueble).into('inmuebles').returning('*');
    res.json(inmueble);
});

app.put('/api/inmuebles/editar/:id', async (req, res) => {
    const { id } = req.params;
    const updatedAttributes = req.body;
    await knex('inmuebles').where({ id }).update(updatedAttributes);
    const updatedInmueble = await knex('inmuebles').where({ id }).first();
    res.json(updatedInmueble);
});

app.delete('/api/inmuebles/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    await knex('inmuebles').where({ id }).del();
    const remainingInmuebles = await knex('inmuebles').select('*');
    res.json(remainingInmuebles);
});

/* app.get('/api/inmuebles/filtro', async (req, res) => {
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
 */
app.get('/api/inmuebles/filtro', async (req, res) => {
    const metrosCuadrados = req.body.metrosCuadrados;
    const precioVenta = req.body.precioVenta;
    const result = await knex('inmuebles').select('*').where('metrosCuadrados', '=', metrosCuadrados).andWhere('precioVenta', '=', precioVenta);
    res.json(result);
});


/* app.get('/api/inmuebles/info', async (req, res) => {
    let cantidadInmuebles = await knex('inmuebles').count('id as count').first();
    let timestamp = new Date().toLocaleString();
    const message = `Cantidad de inmuebles existentes: ${cantidadInmuebles.count}. Consulta realizada en: ${timestamp}`;
    res.send(message);
}); */

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});