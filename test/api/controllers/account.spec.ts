import * as chai from 'chai';
import * as supertest from 'supertest';
const ZSchema = require('z-schema');

const validator = new ZSchema({});
const api = supertest('http://localhost:10010'); // supertest init;
const expect = chai.expect;

describe('#account', function () {
  describe('POST /account/login', function () {
    it('should respond with 200 Success', function (done) {
      var schema = {
        "title": "UserID",
        "type": "object",
        "properties": {
          "userID": {
            "type": "integer"
          }
        }
      };

      api.post('/account/login')
        .set('Content-Type', 'application/json')
        .send({
          email: "yohanna@email.com",
          password: "1234"
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          expect(validator.validate(res.body, schema)).to.be.true;
          done();
        });
    });

    it('should respond with 403 Forbidden', function (done) {
      var schema = {
        "required": [
          "message"
        ],
        "properties": {
          "message": {
            "type": "string"
          }
        }
      };

      api.post('/account/login')
        .set('Content-Type', 'application/json')
        .send({
          email: "doesnotexist@email.com",
          password: "1234"
        })
        .expect(403)
        .end(function (err, res) {
          if (err) return done(err);

          expect(validator.validate(res.body, schema)).to.be.true;
          expect(res.body.message).to.be.equal('Incorrect login info');
          done();
        });
    });

    it('should respond with default Error', function (done) {
      var schema = {
        "required": [
          "message"
        ],
        "properties": {
          "message": {
            "type": "string"
          }
        }
      };

      api.post('/account/login')
        .set('Content-Type', 'application/json')
        .send({
          LoginInfo: 'Wrong Format'
        })
        .end(function (err, res) {
          if (err) return done(err);

          expect(validator.validate(res.body, schema)).to.be.true;
          expect(res.body.message).to.be.equal('Incorrect login info');
          done();
        });
    });

  });

});
