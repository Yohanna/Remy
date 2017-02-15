'use strict';
const config = require('../config/config');
const logger = require('../helpers/logger');
const db = require('../db/db');

const googleMapClient = require('@google/maps').createClient({
    key: config.API_KEY
});

function rank(params) {
    return new Promise(function (resolve, reject) {
        let apiList = [];

        // location: { lat: 44.227917, lng: -76.495611 },
        const user_location = { lat: params.location_lat.value, lng: params.location_long.value };
        const user_id = params.user_id.value;

        let query = {};

        if (params.cuisine_type.value === undefined) {
            query = {
                location: user_location,
                radius: params.distance.value,
                opennow: params.open_now.value,
                type: 'restaurant'
            };
        } else {
            query = {
                location: user_location,
                radius: params.distance.value,
                keyword: params.cuisine_type.value,
                opennow: params.open_now.value,
                type: 'restaurant'
            };
        }

        googleMapClient.placesNearby(query, (err, response) => {
            if (err) {
                logger.error('Google Maps API called failed');
                reject(err);

            } else if (response.json.results.length === 0) {
                reject('No locations were found for the provided search.');
            } else {
                apiList = response.json.results;

                // If the user did Not supply a cuisine_type but we know the user (we have a user_id),
                // then use the user's preferences from the DB
                if (params.cuisine_type.value === undefined && user_id !== undefined) {
                    // 1. Get User's data from DB
                    // 2. Make another request to Google to get a list with same query but include the user's keywords in it
                    // 3. Return the new list and combine with the old one
                    // 4. Sort as usual

                    getCustomList(user_id, query)
                        .then((newList) => {
                            apiList = apiList.concat(newList);

                            // Sort the list descendingly
                            apiList.sort(compareRatings);

                            // Remove duplicate items
                            apiList = removeDuplicates(apiList);

                            // Return the first restaurants_count from the list or 10 if no count is provided
                            resolve(apiList.slice(0, params.restaurants_count.value || 10));
                        })
                        .catch((reason) => {
                            return reject(reason);
                        });
                } else {
                    // Sort the list descendingly
                    apiList.sort(compareRatings);

                    // Return the first restaurants_count from the list or 10 if no count is provided
                    resolve(apiList.slice(0, params.restaurants_count.value || 10));

                }
            }
        });
    });
}


function compareRatings(x, y) {

    // If no rating property, consider y to be smaller than x, i.e. move the item down the list
    if (x.rating === undefined || y.rating === undefined)
        return 1;

    // Sort descendingly
    return (y.rating - x.rating);
}

function getCustomList(user_id, query) {
    return new Promise((resolve, reject) => {
        db.getUserMetrics(user_id)
            .then((userMetrics) => {

                // Add the user's preferences to the query
                query.keyword = userMetrics.favorite_food[0];

                googleMapClient.placesNearby(query, (err, response) => {
                    if (err) {
                        logger.error('Google Maps API called failed');
                        return reject(err);
                    }

                    return resolve(response.json.results);
                });
            })
            .catch((reason) => {
                logger.error(reason);
            });
    });
}

function removeDuplicates(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].place_id === arr[i + 1].place_id) {
            arr.splice(i, 1);
        }
    }

    return arr;
}

module.exports.rank = rank;