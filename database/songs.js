'use strict';

const chalk = require('chalk');
const crypto = require('crypto');

const MongoClient = require('mongodb').MongoClient;
const COLLECTION_NAME = 'songs';

function printFailure(err) {
    console.error(chalk.red.bold('Error'), chalk.grey(err));
}

function findSongs(db) {
    return callback => {
	db.collection(COLLECTION_NAME).find({}).toArray((err, results) => {
	    if (err) printFailure(err);
	    callback(err ? [] : results);
	});
    }
}

function countSongs(db) {
    return callback => {
	db.collection(COLLECTION_NAME).find({}).count((err, count) => {
	    if (err) printFailure(err);
	    callback(err ? -1: count);
	});
    };
}

function addSong(db) {
    return (entry, callback) => {
	var song = {
	    name: entry.name || '',
	    artist: entry.artist || ''
	};

	// Generating a unique string id (because ObjectIDs are overrated, amirite?)
	var salt = [String(new Date()), song.name, song.artist].join('|');
	song._id = crypto.createHash('md5').update(salt).digest('hex');
	
	db.collection(COLLECTION_NAME).insertOne(song, (err, response) => {
	    if (err) printFailure(err);
	    var result = response.ops[0];
	    callback(result._id);
	});
    };
}

// Unused
function removeSong(db) {
    return (id, callback) => {
	callback();
    };
}

function removeAllSongs(db) {
    return callback => {

	callback();
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
	    find: findSongs(db),
	    count: countSongs(db),
	    add: addSong(db),
	    remove: removeSong(db),
	    removeAll: removeAllSongs(db)
	});
    });

};
