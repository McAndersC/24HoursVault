const server = require('./lib/server.js');

const app = {};
// Applications Initialisering.
app.init = () => {

    server.run();

};

// Kalder Initializing Application.
app.init();

module.export = app;