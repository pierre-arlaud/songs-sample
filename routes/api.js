'use strict';

function addApiRoutes(app) {

    app.get('/api/songs', (req, res) => {
	var songs = [];
	
	res.json(songs);
    });

    

}

module.exports = {
    addRoutes: addApiRoutes
};
