// Use dotenv to get environment variables
require('dotenv').config({path: `./src/config/.env.${process.env.NODE_ENV}`});
const port = process.env.APP_PORT || 3000;

const { Pool } = require('pg'); // Import Pool from the Postgres package

// Create new Postgres pool with .env config values
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}
const pool = new Pool(config);

module.exports = {
    port: port,
    getPool: function(){
        if(pool) return pool;
        pool = new pg.Pool(config);
        return pool;
    },
    createTables: function(){
        // Create tables if they don't exist
        pool.query(`
            CREATE TABLE IF NOT EXISTS j_cache (
                uid VARCHAR(255) NOT NULL,
                obj_id VARCHAR(255) NOT NULL,
                person VARCHAR(255) NOT NULL,
                action VARCHAR(255) NOT NULL,
                action_val VARCHAR(255) NOT NULL
            )
            `, (error, result) => {
            if (error) {
                console.error('Error creating J_CACHE table:', error);
            } else {
                console.log('J_CACHE table created successfully');
            }
        });
        pool.query(`
            CREATE TABLE IF NOT EXISTS j_cache_log (
                _id SERIAL PRIMARY KEY,
                uid VARCHAR(255) NOT NULL,
                timestamp VARCHAR(255) NOT NULL,
                gps VARCHAR(255) NOT NULL
            )
            `, (error, result) => {
            if (error) {
                console.error('Error creating J_CACHE_LOG table:', error);
            } else {
                console.log('J_CACHE_LOG table created successfully');
            }
        });
    }
}