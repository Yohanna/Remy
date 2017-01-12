'use strict';
const config = require('../config/config');
const logger = require('../helpers/logger');

const googleMapClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY || config.API_KEY
});

function rank(req) {
    return new Promise(function (resolve, reject) {
        let API_list = [];

        let user_location = { lat: req.swagger.params.location_lat.value, lng: req.swagger.params.location_long.value };

        let query = {
            location: { lat: 44.2261, lng: -76.4966 },
            radius: req.swagger.params.distance.value,
            keyword: req.swagger.params.cuisine_type.value,
            rankby: 'prominence',
            type: 'restaurant'
        };

        googleMapClient.placesNearby(query, function (err, response) {
            if (!err) {
                API_list = response.json.results;

                if (API_list.length === 0) {
                    logger.info('No locations were found for the provided search.');
                    reject('No locations were found for the provided search.');
                }

                let ret = []
                for (let i = 0; i < API_list.length; i++) {
                    ret.push({ 'id': API_list[i].id, 'name': API_list[i].name });
                }

                resolve(response);
            } else {
                reject(err);
            }
        });
    });
}

module.exports.rank = rank;