'use strict';

const database = require('../database/songs');

function addApiRoutes(app, config, callback) {
    database(config, songs  => {
	// This callback is called once the database has been readied
	
	app.get('/api/songs', (req, res) => {
	    songs.find(results => {
		res.json({ data: results });
	    });
	});
	
	if (callback) callback();
    });
}

module.exports = {
    addRoutes: addApiRoutes
};
