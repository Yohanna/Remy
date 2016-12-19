'use strict';
const config = require('../config/config.js');

var ret = {};

var googleMapClient = require('@google/maps').createClient({
    // key: config.myKey.private_key
    key: config.API_KEY
});

var requestParameters = {};

function rank(req) {
    var fid = 0;
    var fname = 'The Test Place';
    var flat = 10.01;
    var flng = -10.2;

    requestParameters.location = [43.571048, -79.767054];
    requestParameters.radius = 50;

    try {
        googleMapClient.places(requestParameters, function (err, response) {
            if (err) { throw err; } // It'll be caught by the catch statement

            console.log('No Errors');
        });
        
    } catch (error) {
        console.log(`Cought an error: ${error}`);
    }

    ret.id = fid;
    ret.name = fname;
    ret.lat = flat;
    ret.lng = flng;

    return ret;
}

module.exports.rank = rank;