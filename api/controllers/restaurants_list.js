var util = require('util');

// module.export = getList;

module.exports = {
  getRestaurantsList: getRestaurantsList
}

var dummyData =
  [{
    id: 55,
    name: "Pizza Hut",
    location_long: "2341",
    location_lat: "12342",
    distance: "5345",
    cuisine_type: "Pizza"
  },
  {
    id: 55,
    name: "Pizza Hut",
    location_long: "2341",
    location_lat: "12342",
    distance: "5345",
    cuisine_type: "Pizza"
  }
  ]
function getRestaurantsList(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  // res.json(hello);
  res.json(dummyData);
}