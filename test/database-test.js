'use strict';

const chai = require('chai');
const expect = chai.expect;

const database = require('../database/songs');

const config = {
    dbUri: 'mongodb://localhost:27017/',
    dbName: 'songs',
    silent: true
};

describe('database', () => {

    it('should return an array of songs', done => {
	database(config, songs => {
	    // The test database is now ready

	    songs.find(result => {
		expect(result).to.be.an('array');
		done();
	    });
	});
    });
    
    it('should add entries to the list', done => {
	database(config, songs => {
	    
	    // Getting the old count of songs
	    songs.count(oldCount => {

		var song = {
		    name: 'Bohemian Rhapsody',
		    artist: 'Queen'
		}

		// Adding a song
		songs.add(song, id => {
		    expect(id).to.exist;

		    // Checking the count has been incremented
		    songs.count(newCount => {
			expect(newCount).to.equal(oldCount + 1);
			done();
		    });
		});
		
	    });
	});
    });

    
});


