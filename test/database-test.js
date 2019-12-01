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

		console.log('fini');
		done();
	    });
	});
    });
    

});


