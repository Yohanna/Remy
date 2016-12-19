const ranker = require('../../server/ranker.js');

// module.export = getList;

module.exports = {
  getRestaurantsList: getRestaurantsList
};

function getRestaurantsList(req, res) {
    res.json(ranker.rank(req));
}