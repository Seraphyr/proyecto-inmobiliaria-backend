const knex = require('knex');
const knexConfig = require('../config/knexfile');
const db = knex(knexConfig.development);


async function createUser(nombre, apellido, email, id_perfil, clave) {
    try {
        console.log(nombre);
        const newUser = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            id_perfil: id_perfil,
            clave: clave
        };

        const result = await db('usuarios').insert(newUser).returning('*');
        return result[0];

    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw new Error("Error al insertar usuario en la base de datos", newUser);
    }

}

async function findUserByEmail(email) {
    try {
        const user = await db('usuarios').where({ email: email }).first();
        return user;
    } catch (error) {
        console.error('Error al buscar usuario por número de identidad:', error);
        throw new Error("Error al buscar usuario por número de identidad en la base de datos");
    }
}


module.exports = {
    createUser,
    findUserByEmail
}