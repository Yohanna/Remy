const ranker = require('../../server/ranker.js');

module.exports = {
  getRestaurantsList: getRestaurantsList
};

function getRestaurantsList(req, res) {
  ranker.rank(req.swagger.params)
    .then(function (list) {
      res.json(list);
    })
    .catch(function (error) {
      res.json({ message: error });
    });
}