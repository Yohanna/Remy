import * as chai from 'chai';
import * as supertest from 'supertest';

const api = supertest('http://localhost:10010');
const expect = chai.expect;

describe('#hello_world', function () {
  describe('GET /hello', function () {
    it('respond with 200 Success', function (done) {
      api.get('/hello')
        .query({ name: 'World!' })
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function (err, res) {
          err ? done(err) : done();
        });
    });

    it('respond with query sent', function (done) {
      api.get('/hello')
        .query({ name: 'World' })
        .set('Content-Type', 'application/json')
        .expect('"Hello, World!"')
        .end(function (err, res) {
          err ? done(err) : done();
        });
    });

    it('respond with no query', (done) => {
      api.get('/hello')
        .set('Content-Type', 'application/json')
        .expect('"Hello, stranger!"')
        .end(function (err, res) {
          err ? done(err) : done();
        });
    })
  });
});
