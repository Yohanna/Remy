'use strict';
const config = require('../config/config');

let ret = {};

let googleMapClient = require('@google/maps').createClient({
    key: config.API_KEY
});

let requestParameters = {};

function rank(req) {
    let API_list;
    let ret = [];
    let item = {
       id: 'f',
       name:'f',
       lat: 25,
       lng: 25
    };

    ret.push(item);
    ret.push(item);
    
    // return ret;

    requestParameters.location = [43.571048, -79.767054];
    requestParameters.radius = 1000;
    requestParameters.type = 'food';

    // for(let i = 0; i < 2; i++){
    //     ret.push({id:'found', name:'found', lat:50, lng:50});
    //     //ret[i].id = 'problem';//API_list[i].id;
    //     //ret[i].name = 'problem';//API_list[i].name;
    //     //ret[i].lat = 50;//API_list[i].geometry.location.lat;
    //     //ret[i].lng = 50;//API_list[i].geometry.location.lng;
    // }

    try {
        googleMapClient.places(requestParameters, function (err, response) {
            if (err) { throw err; } // It'll be caught by the catch statement
            
            API_list = response.results;
            if(API_list.length === 0){
                console.log('No locations were returned.');
                return 'No locations were found for the provided search.';
            }

        });
         
    } catch (error) {
        console.log(`Caught an error: ${error}`);
        return 'There was an error with the API call.';
    }
    console.log('No Errors');

    return ret;
}

module.exports.rank = rank;