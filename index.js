
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

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});