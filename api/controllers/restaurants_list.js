const ranker = require('../../server/ranker.js');

// module.export = getList;

module.exports = {
  getRestaurantsList: getRestaurantsList
};

function getRestaurantsList(req, res) {
  ranker.rank(req, function (err, list) {
    if (!err) {
      res.json(list);
    }else{
      res.json({message: err});
    }
  });
}