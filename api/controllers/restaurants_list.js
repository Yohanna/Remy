const ranker = require('../../server/ranker.js');

// module.export = getList;

module.exports = {
  getRestaurantsList: getRestaurantsList
};

function getRestaurantsList(req, res) {
  ranker.rank(req)
    .then(function(list){
      res.json(list);
    })
    .catch(function(error){
      res.json({message: error});
    });
}