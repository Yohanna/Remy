'use strict';
const config = require('../config/config');

let googleMapClient = require('@google/maps').createClient({
    key: config.API_KEY
});

function rank(req) {
    return new Promise(function (resolve, reject) {
        let API_list = [];
        let requestParameters = {};
        let ret = [];

        requestParameters.location = [req.swagger.params.location_lat.value, req.swagger.params.location_long.value];
        requestParameters.radius = req.swagger.params.distance.value;
        requestParameters.type = 'restaurant';
        requestParameters.query = '';

        googleMapClient.places(requestParameters, function (err, response) {
            if (!err) {
                API_list = response.json.results;

                for (let i = 0; i < API_list.length; i++) {
                    ret.push({ 'id': API_list[i].id, 'name': API_list[i].name });
                }

                // Return ret
                resolve(ret);
            } else {
                reject(err);
            }
        });
    });
}

module.exports.rank = rank;