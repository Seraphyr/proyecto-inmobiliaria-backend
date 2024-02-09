module.exports = {
    development: {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'admin_db_pass',
        database: 'proyecto-inmobiliaria'
    },
    migrations: {
        tableName: 'knex_migrations'
    }
}};

