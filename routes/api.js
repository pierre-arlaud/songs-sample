'use strict';

const database = require('../database/songs');

function addApiRoutes(app, config) {
    database(config, () => {
	// This callback is called once the database has been readied
	
	app.get('/api/songs', (req, res) => {
	    var songs = [];
	    
	    res.json(songs);
	});

    });
}

module.exports = {
    addRoutes: addApiRoutes
};
