
require('es6-promise').polyfill();
require('isomorphic-fetch');

var assert = require('assert');

var app = require('./app.js');

var host = 'http://localhost:3000';

describe('Test isomorphic-fetch: Happy path', function () {
    it('GET: /send', function (done) {
        fetch(host+ '/send').then(function(response) {
            assert.equal(response.status, 200);
            return response.text();
        }).then(function(resultText) {
            assert.equal(resultText, 'Hello World!');
            done()
        });
    });


    it('GET: /json', function (done) {
        fetch(host+ '/json').then(function(response) {
            assert.equal(response.status, 200);
            return response.json();
        }).then(function(resultJson) {
            assert.equal(resultJson.name, 'hello');
            done()
        });
    });

    it('GET: /error/json', function (done) {
        fetch(host+ '/error/json').then(function(response) {
            assert.equal(response.status, 400);
            return response.json();
        }).then(function(resultJson) {
            assert.equal(resultJson.code, 1);
            assert.equal(resultJson.message, 'you are wrong');
            done()
        });
    });

    it('GET: /error/send', function (done) {
        fetch(host+ '/error/send').then(function(response) {
            assert.equal(response.status, 400);
            return response.text();
        }).then(function(resultText) {
            assert.equal(resultText, 'you are wrong');
            done()
        });
    });


    it('GET: /json/5stimeout', function (done) {
        fetch(host+ '/json/5stimeout').then(function(response) {
            assert.equal(response.status, 200);
            return response.json();
        }).then(function(resultJson) {
            assert.equal(resultJson.name, 'you are patient');
            done()
        });
    }).timeout(7000);;
});

describe('Test isomorphic-fetch: Error ', function () {
    it('Exception', function (done) {
        fetch(host+ '/error/send').then(function(response) {
            throw 'Never Wrong' ;
        }).catch(function(err) {
            assert.equal(err, 'Never Wrong' )
            done();
        });
    });

    it('Expected response incorrect type (json <-> text)', function (done) {
        fetch(host+ '/json').then(function(response) {
            assert.equal(response.status, 200);
            return response.text();
        }).then(function(resultJson) {
            assert.equal(resultJson, JSON.stringify({"name":"hello"}));
            done()
        });
    });

    it('Expected response incorrect type ( text <-> json)', function (done) {
        fetch(host+ '/send').then(function(response) {
            assert.equal(response.status, 200);
            return response.json();
        }).catch(function(err){
            console.log('err: ', err)
            done();
        });
    });


    it('Timeout', function (done) {

        fetch(host+ '/send').then(function(response) {
            assert.equal(response.status, 200);
            return response.json();
        }).catch(function(err){
            console.log('err: ', err)
            done();
        });
    });
})