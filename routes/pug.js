'use strict';

function addHtmlRoutes(app, config, callback) {
    app.set('view engine', 'pug');

    app.get('/', (req, res) => {
	res.render('index', {});
    });
    
    if (callback) callback();
}

module.exports = {
    addRoutes: addHtmlRoutes
}
