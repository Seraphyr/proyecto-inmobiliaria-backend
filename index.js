
require('dotenv').config();
const usuarios = require('./routes/usuariosRoute');
const inmuebles = require('./routes/inmueblesRoute');
const home = require('./routes/homeRoute');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/* const { verifyToken, JWT_TOKEN } = require('./middlewares/authUser'); */
const app = express();
const cors = require('cors');
const port = process.env.EXPRESS_PORT || 3001;
app.use(express.json());
app.use(cors());

app.use ('/usuarios', usuarios);
app.use ('/inmuebles', inmuebles);
app.use ('/', home);



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});