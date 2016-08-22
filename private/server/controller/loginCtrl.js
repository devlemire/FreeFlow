var app = require('../server.js');
var db = app.get('db');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var passwordHash = require('password-hash');
var config = require('../config/config.js');

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = {
  localAuth: function(req, res) {

    db.queries.login.verifyUser([req.body.username], function(err, r) {
      if(r.length !== 0) {
        if(passwordHash.verify(req.body.password, r[0].password)) {
          res.json({user: r, token: createJWT(req.body.username)});
        } else {
          res.status(200).send({error: 'wrongPassword'});
        }
      } else {
        res.status(200).send({error: 'userNotFound'});
      }
    });
  },
  googleAuth: function(req, res) {
    db.queries.google.verifyUser([req.body.sub], function(err, r) {
      if(r.length === 0) {
        res.status(200).send({error: 'notRegistered'});
      } else {
        res.json({user: r, token: createJWT(req.body.sub)});
      }
    });
  }
};
