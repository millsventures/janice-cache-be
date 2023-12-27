let pool = require('../config/config.js').getPool();

module.exports = {
    // Route to get all items
    getAll: function(req, res) {
        pool.query('SELECT * FROM j_cache', (error, result) => {
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

    // Route to get specific item by ID
    getOne: function(req, res) {
        pool.query('SELECT * FROM j_cache WHERE uid = $1', [req.params.id], (error, result) => {
            if (error) {
                console.error('Error retrieving item from database:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                const item = result.rows[0];
                console.log(item);
                if (item) {
                    res.json(item);
                } else {
                    res.status(404).json({ error: 'Item not found' });
                }
            }
        });
    },

    // Route to add new item
    addOne: function(req, res) {
        pool.query('INSERT INTO j_cache (uid, obj_id, person, action, action_val) VALUES ($1, $2, $3, $4, $5)', [req.body.id, req.body.object_id, req.body.person, req.body.action, req.body.action_val], (error, result) => {
            if (error) {
                console.error('Error inserting object into database:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Object inserted into database');
                res.status(201).json(req.body);
            }
        });
    },

    // Delete by ID
    deleteOne: function(req, res) {
        pool.query('DELETE FROM j_cache WHERE uid = $1', [req.params.id], (error, result) => {
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