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

    var songs = null;
    
    before(done => {
	database(config, results => {
	    // The test database is now ready
	    songs = results;
	    done();
	});
    });

    it('should return an array of songs', done => {
	songs.find(result => {
	    expect(result).to.be.an('array');
	    done();
	});
    });
    
    it('should add entries to the list', done => {
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


    it('should clear the entire list', done => {
	songs.removeAll(() => {

	    // Check the database is empty
	    songs.count(count => {
		expect(count).to.equal(0);
		done();
	    });
	});
    });
    
});

