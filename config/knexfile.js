module.exports = {

  development: {
    client: 'pg',
    debug: true,
    connection: {
      host: 'localhost',
      user: 'db_admin',
      password: 'admin',
      database: 'db_ubikate',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../db/migrations',
      tableName: 'knex_migrations'
    }
  },

  beto: {
    client: 'pg',
    debug: true,
    connection: {
      host: '10.0.0.9',
      user: 'db_admin',
      password: 'admin',
      database: 'db_ubikate',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../db/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../db/migrations',
      tableName: 'knex_migrations'
    }
  }

};
