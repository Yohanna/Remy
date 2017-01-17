const should = require('should');
const request = require('supertest');
const server = require('../../../app');
const logger = require('../../../helpers/logger');

describe('controllers', function () {

  describe('restaurants_list', function () {

    describe('GET /restuarants_list', function () {

      it('should return list of restaurants', function (done) {

        request(server)
          .get('/restaurants_list')
          .query({ location_lat: 44.2261, location_long: -76.4966 })
          .query({ open_now: false })
          .set('Accept', 'application/json')
          // .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            should.exists(res);
            done();
          });

      });

      it('should not find any restaurants available', function (done) {

        request(server)
          .get('/restaurants_list')
          .query({ location_lat: 44.2261, location_long: -76.4966 })
          .query({ distance: 1 })
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            // should.not.exist(err);
            logger.info(res.body);
            // (res.json.results).should.have.length(9);
            done();
          });

      });

    });

  });

});
