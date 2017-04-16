import * as chai from 'chai';
import * as supertest from 'supertest';
var ZSchema = require('z-schema');
var customFormats = module.exports = function (zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function (val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function (val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function (val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function (val) {
    // should parse
    return Number.isInteger(val);
  });

  zSchema.registerFormat('date', function (val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function (val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function (val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
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
        .send({ LoginInfo: 'DATA GOES HERE' })
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
          LoginInfo: 'DATA GOES HERE'
        })
        .expect(403)
        .end(function (err, res) {
          if (err) return done(err);

          expect(validator.validate(res.body, schema)).to.be.true;
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
          LoginInfo: 'DATA GOES HERE'
        })
        .expect('DEFAULT RESPONSE CODE HERE')
        .end(function (err, res) {
          if (err) return done(err);

          expect(validator.validate(res.body, schema)).to.be.true;
          done();
        });
    });

  });

});
