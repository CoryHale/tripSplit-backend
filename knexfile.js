require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

const localConnection = {
    host: 'localhost',
    database: 'trip-split',
    user: 'cory',
    password: 'lambda4life'
}

const prodDBConnection = process.env.DATABASE_URL || localConnection;

module.exports = {
    // The development and testing environments will be hosted on your local machine. Create a .env file and set the 5 connection variable values:
    //  DB_HOST - Your local server. Will probably be either localhost or 127.0.0.1
    //  DB_USER - Your username for postgresql
    //  DB_PASSWORD - Your password for postgresql
    //  DB_DEVELOPMENT - The name of your database for your development environment
    //  DB_TESTING - The name of your database for your testing environment

    development: {
        client: 'sqlite3',

        connection: {
            filename: './data/trip-split.db3'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds/development'
        },
        useNullAsDefault: true
    },

    staging: {
        client: 'postgressql',
        connection: {
            database: 'trip-split',
            user: 'cory',
            password: 'lambda4life'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds/development'
        },
        useNullAsDefault: true
    },

    production: {
        client: 'pg',
        connection: prodDBConnection,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds/development'
        },
        useNullAsDefault: true 
    },

    testing: {
        client: 'sqlite3',
        connection: {
            filename: './data/test.db3'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds/production'
        },
        useNullAsDefault: true 
    }
};