'use strict';

const PORT = 3080;
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'songs';

const express = require('express');
const chalk = require('chalk');


var app = express();

var apiRoutes = require('./routes/api');
//var htmRoutes = require('./routes/pug');

apiRoutes.addRoutes(app, { dbUri: MONGO_URI, dbName: DB_NAME });
//htmRoutes.addRoutes(app);

app.listen(PORT, () => {
    console.log(chalk.green.bold('Listening'), `to port ${PORT}`);
});
