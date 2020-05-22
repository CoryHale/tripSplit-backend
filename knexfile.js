require('dotenv').config();

module.exports = {
    // The development and testing environments will be hosted on your local machine. Create a .env file and set the 5 connection variable values:
    //  DB_HOST - Your local server. Will probably be either localhost or 127.0.0.1
    //  DB_USER - Your username for postgresql
    //  DB_PASSWORD - Your password for postgresql
    //  DB_DEVELOPMENT - The name of your database for your development environment
    //  DB_TESTING - The name of your database for your testing environment

    development: {
        client: 'pg',

        connection: process.env.DATABASE_URL,
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
        client: 'pg',
        connection: process.env.DATABASE_URL,
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
        connection: process.env.DATABASE_URL,
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
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_TESTING
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