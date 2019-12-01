'use strict';

const chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;


function findSongs(db) {
    return callback => {
	db.collection('songs').find({}).toArray((err, results) => {
	    if (err) console.error(chalk.red.bold('Error'), chalk.grey(err));
	    callback(err ? [] : results);
	});
    }
}


module.exports = (config, callback) => {
    if (!config.silent) console.log(chalk.cyan.bold('Connecting'), `to mongo uri="${config.dbUri}", db="${config.dbName}"`);
    const client = new MongoClient(config.dbUri, { useUnifiedTopology: true});
 
    client.connect(err => {
	// Handling mongo connect error and logging
	if (err) {
	    console.error(chalk.red.bold('Error'), 'could not open Mongodb:', chalk.grey(err));
	    process.exit(1);
	}
	if (!config.silent) console.log(chalk.green.bold('Connected'), 'to mongo');
	
	const db = client.db(config.dbName);
	
	callback({
	    find: findSongs(db)

	});
    });

};
