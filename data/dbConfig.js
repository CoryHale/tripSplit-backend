const knex = require('knex');
const config = require('../knexfile');
require('dotenv').config();
require('pg');

const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);