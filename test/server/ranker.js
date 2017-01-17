const should = require('should');
const ranker = require('../../server/ranker');

describe('ranker', function () {

  describe('#rank', function () {

    it('should return a list of restaurants', function () {
      let params = {
        location: { lat: 44.2261, lng: -76.4966 },
        radius: 5000,
        keyword: 'pizza',
        opennow: false,
        rankby: 'prominence',
        type: 'restaurant'

      };

      ranker.rank(params)
        .then(function (list) {

        });
    });

    it('should not find any restaurants', function () {
      let params = {

      };

    });
  });
});