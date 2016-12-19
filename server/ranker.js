const config = require('../config/config.js')

var ret = {};

var googleMapClient = require('@google/maps').createClient({
    // key: config.myKey.private_key
    key: config.API_KEY
});

var requestParameters = {};

function rank(req){
    var fid = 00000000;
    var fname = 'The Test Place';
    var flat = 10.01;
    var flng = -10.2;

    requestParameters.location = [43.571048, -79.767054];
    requestParameters.radius = 50;

    //This is the line that is causing a problem
    googleMapClient.places(requestParameters, function(err, response){
        if(err){

        }
        else{
            
        }
    });

    ret.id = fid;
    ret.name = fname;
    ret.lat = flat;
    ret.lng = flng;

    return ret;
}

module.exports.rank = rank;