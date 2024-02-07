const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin_db_pass',
        database: 'proyecto-inmobiliaria'
    }
});

module.exports = knex