'use strict';
const config = require('../config/config');
const logger = require('../helpers/logger');
const geolib = require('geolib');
const GoogleLocations = require('google-locations');
const db = require('../db/db');
const preferenceConst = 1.25;
const walkingConst = 0.5;
const drivingConst = 0.8;

const googleLocations = new GoogleLocations(config.API_KEY);
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

                for (let i = 0; i < apiList.length; i++) {
                    apiList[i].preference = false;
                    apiList[i].rank = i;
                    apiList[i].distance = geolib.getDistance(apiList[i].geometry.location, user_location);
                }

                // If the user did Not supply a cuisine_type but we know the user (we have a user_id),
                // then use the user's preferences from the DB
                if (params.cuisine_type.value === undefined && user_id !== undefined) {
                    // 1. Get User's data from DB
                    // 2. Make another request to Google to get a list with same query but include the user's keywords in it
                    // 3. Return the new list and combine with the old one
                    // 4. Sort as usual

                    getCustomList(user_id, query, user_location)
                        .then((newList) => {

                            apiList = apiList.concat(newList);

                            // Sort the list descendingly
                            //apiList.sort(compareRatings);

                            // Remove duplicate items
                            apiList = removeDuplicates(apiList);

                            apiList = sort_by_weight(apiList, params.distance.value);

                            //Get details on the first restaurants_count from the list or 10 if no count is provided
                            getDetails(apiList.slice(0, params.restaurants_count.value || 10)).then((finalList) => {
                                resolve(finalList);
                            });
                        })
                        .catch((reason) => {
                            return reject(reason);
                        });
                } else {
                    // Sort the list descendingly
                    //apiList.sort(compareRatings);

                    //added because now this also removes restaurants that share a name
                    apiList = removeDuplicates(apiList);

                    apiList = sort_by_weight(apiList, params.distance.value);


                    //Get details on the first restaurants_count from the list or 10 if no count is provided
                    getDetails(apiList.slice(0, params.restaurants_count.value || 10)).then((finalList) => {
                        resolve(finalList);
                    });

                }
            }
        });
    });
}

function getCustomList(user_id, query, user_loc) {
    return new Promise((resolve, reject) => {
        db.getUserMetrics(user_id)
            .then((userMetrics) => {
                let preferenceList = [];
                let userPreferences = userMetrics[0].favorite_food;
                let iterations = 0;

                for (let i = 0; i < userPreferences.length; i++) {
                    // Add the user's preferences to the query
                    query.keyword = userPreferences[i];

                    googleMapClient.placesNearby(query, (err, response) => {
                        if (err) {
                            logger.error('Google Maps API called failed');
                            return reject(err);
                        }

                        let returnedList = response.json.results.slice(0, 5);

                        for (let i = 0; i < returnedList.length; i++) {
                            returnedList[i].preference = true;
                            returnedList[i].rank = i;
                            returnedList[i].distance = geolib.getDistance(returnedList[i].geometry.location, user_loc);
                        }

                        preferenceList = preferenceList.concat(returnedList);
                        iterations++;
                        if (iterations === userPreferences.length) {
                            return resolve(preferenceList);
                        }
                    });
                }
            })
            .catch((reason) => {
                logger.error(reason);
            });
    });
}

function removeDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j].place_id === arr[i].place_id) {
                //exact same location. Keep best preference and rank value and remove one
                let preference = ((arr[j].preference == true)) || (arr[i].preference == true);
                let rank = (arr[i].rank < arr[j]) ? arr[i].rank : arr[j].rank;
                arr.splice(j, 1);
                arr[i].preference = preference;
                arr[i].rank = rank;
            }
            else if (arr[j].name === arr[i].name) {
                //same name so different branches of the same place. Choose the closest and maintain the best 
                //of preference and rank
                let chosen = (arr[j].distance < arr[i].distance) ? j : i;
                let preference = ((arr[j].preference == true)) || (arr[i].preference == true);
                let rank = (arr[i].rank < arr[j]) ? arr[i].rank : arr[j].rank;
                arr.splice(((chosen === i) ? j : i), 1);
                arr[chosen].preference = preference;
                arr[chosen].rank = rank;
            }
        }
    }

    return arr;
}

//personal should just be sent as a 1 until it has been added to user profile
//this function does not account for locations missing fields. If fields are missing that should be handled elsewhere
function getWeight(rating, rank, listSize, personal, preference, distance, radius, prefersWalking) {
    let multiplier, preferenceM, personalM, distanceM, normalRank, weight;

    personalM = personal;

    preferenceM = (preference == true) ? preferenceConst : 1;

    distanceM = Math.exp((Math.log((prefersWalking == true) ? walkingConst : drivingConst)) / radius);

    normalRank = (-1 * (rank - (listSize - 1))) / (listSize - 1);

    multiplier = personalM * preferenceM * distanceM;

    weight = multiplier * (rating + normalRank);

    return weight;
}

function sort_by_weight(list, radius) {
    for (let i = 0; i < list.length; i++) {
        //TODO set personal multiplier equal to value from user DB
        //TODO set transportation preference equal to value from user DB
        list[i].weight = getWeight(list[i].rating, i, list.length, 1, list[i].preference, list[i].distance, radius, true);
    }
    list.sort(weightSorting);
    return list;
}

function weightSorting(x, y) {
    //sort descendingly
    return (y.weight - x.weight);
}

function getDetails(list) {
    let iterations = 0;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < list.length; i++) {
            googleLocations.details({ placeid: list[i].place_id }, (error, response) => {
                if (error) {
                    logger.error('Places details request failed.');
                    return reject(error);
                }
                list[i].details = response;
                iterations++;
                if (iterations === list.length) {
                    return resolve(list);
                }
            });
        }
    });
}

module.exports.rank = rank;