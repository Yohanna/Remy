'use strict';
const config = require('../config/config');

let googleMapClient = require('@google/maps').createClient({
    key: config.API_KEY
});

let requestParameters = {};

function rank(req) {
    let API_list = [];
    let i;
    let ret = [];

    requestParameters.location = [req.swagger.params.location_lat.value, req.swagger.params.location_long.value];
    requestParameters.radius = req.swagger.params.distance.value;
    requestParameters.type = "restaurant";
    requestParameters.query = "";

    try {
        googleMapClient.places(requestParameters, function (err, response) {
            if(!err){
                API_list = response.json.results;

                for(i = 0; i < API_list.length; i++){
                    ret.push({"id":API_list[i].id, "name":API_list[i].name});
                }
            }
            return ret;
        });
         
    } catch (error) {
        return `Caught an error: ${error}`;
    }
}

module.exports.rank = rank;