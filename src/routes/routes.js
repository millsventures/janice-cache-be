let objects = require('../components/objects.js');
let analytics = require('../components/analytics.js');

module.exports = function(app){
    // Route to get all items
    app.get('/', (req, res) => {
        objects.getAll(req, res);
    });
    // Route to add new item
    app.post('/', (req, res) => {
        objects.addOne(req, res);
    });

    // Get logs
    app.get('/logs', (req, res) => {
        analytics.getAll(req, res);
    });
    // Delete logs
    app.delete('/logs', (req, res) => {
        analytics.deleteAll(req, res);
    });

    // Route to get specific item by ID
    app.get('/:id', (req, res) => {
        let coordinates = req.query.gps;
        console.log(coordinates);
        objects.getOne(req, res);
        analytics.log(req.params.id, coordinates);

    });
    // Delete by ID
    app.delete('/:id', (req, res) => {
        objects.deleteOne(req, res);
    });
}