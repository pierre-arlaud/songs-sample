'use strict';

const PORT = 3080;

const express = require('express');
const chalk = require('chalk');


var app = express();

var apiRoutes = require('./routes/api');
//var htmRoutes = require('./routes/pug');

apiRoutes.addRoutes(app);
//htmRoutes.addRoutes(app);

app.listen(PORT, () => {
    console.log(chalk.green.bold('Listening'), `to port ${PORT}`);
});
