let pool = require('../config/config.js').getPool();

module.exports = {
    log: function(uid, gps){
        console.log(gps);
        pool.query('INSERT INTO j_cache_log (uid, timestamp, gps) VALUES ($1, $2, $3)', [uid, new Date(), gps], (error, result) => {
            if (error) {
                console.error('Error inserting object into database:', error);
            } else {
                console.log('Object inserted into database');
            }
        });
    },

    getAll: function(req, res) {
        console.log('getting logs');
        pool.query('SELECT * FROM j_cache_log', (error, result) => {
            if (error) {
                console.error('Error retrieving data from database:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                const entries = result.rows;
                console.log(entries);
                res.json(entries);
            }
        });
    },

    deleteAll: function(req, res) {
        pool.query('DELETE FROM j_cache_log', (error, result) => {
            if (error) {
                console.error('Error deleting object from database:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Object deleted from database');
                res.status(204).json({});
            }
        });
    }
    
}