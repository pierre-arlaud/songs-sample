'use strict';

const chalk = require('chalk');
const request = require('request');
const bodyParser = require('body-parser');

function addHtmlRoutes(app, config, callback) {
    app.set('view engine', 'pug');
    
    app.post('/new', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/new'));
        
        // POST /api/song
        request.post(
            `${config.apiRoot}/api/song`,
            { json: req.body }, // the song object is send here
            (err, reqRes, body) => {
	        if (err) console.error(chalk.bold.red('Error'), err);
                res.render('new', {
                    success: req.body && req.body.success
                });
            }
        );
    });
    

    app.get('/', (req, res) => {
        console.log(chalk.blue.bold('Receive'), chalk.grey('call to'), chalk.yellow('/'));
	
        // GET /api/songs
	request.get(`${config.apiRoot}/api/songs`, { json: true }, (err, reqRes, body) => {
            res.render('index', {
                songlist: !err && body && Array.isArray(body.data) ? body.data : []
            });
        });
    });

    if (callback) callback();
}

module.exports = {
    addRoutes: addHtmlRoutes
}
