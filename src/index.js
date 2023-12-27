const express = require('express'); // Require express for request routing
const cors = require('cors'); // Require cors for cross-origin resource sharing
const config = require('./config/config.js'); // Require config.js to set up environment variables
config.createTables(); // Create tables if they don't exist

const app = express(); // Create new express app
app.use(express.json()); // Use express.json() to parse JSON bodies
app.use(cors()); // Use cors() to enable cross-origin resource sharing

require('./routes/routes.js')(app); // Require routes.js to set up routes

app.listen(config.port, () => {
    console.log(`App listening at http://localhost:${config.port}`);
});