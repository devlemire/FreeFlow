var app = require('../server.js');
var passwordHash = require('password-hash');
var config = require('../config/config.js');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var db = app.get('db');

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
    if(req.body.password !== req.body.confirm_password) {
      res.status(200).send({error: 'passwordMatch'});
    } else {
      db.queries.localAuth.checkForEmail([req.body.email], function(err, r) {
        if(r.length !== 0) {
          res.status(200).send({error: 'emailTaken'});
        } else {
          db.queries.localAuth.checkForUser([req.body.username], function(err, r) {
            if(r.length !== 0) {
              res.status(200).send({error: 'userTaken'});
            } else {
              console.log('INCOMING REGISTER', req.body);
              var hashedPassword = passwordHash.generate(req.body.password, {algorithm: 'sha256'});
              db.queries.register.localAuth([req.body.freelancer, req.body.client, req.body.first_name, req.body.last_name, req.body.email, null, null, req.body.username, hashedPassword], function(err, r) {
                db.queries.users.getUserByUsername([req.body.username], function(err, r) {
                  res.json({user: r, token: createJWT(req.body.username)});
                });
              });
            }
          });
        }
      });
    }
  },
  googleAuth: function(req, res) {
    console.log('NEW GOOGLE REGISTRATION', req.body);
    db.queries.google.verifyUser([req.body.user.sub], function(err, r) {
      if(r.length === 0) {
        //No user with Google ID
        db.queries.google.checkForEmail([req.body.user.email], function(err, r) {
          if(r.length === 0) {
            //New user
            db.queries.google.createUser([req.body.freelancer, req.body.client, req.body.user.given_name, req.body.user.family_name, req.body.user.email, req.body.user.sub], function(err, r) {
              console.log("USER SUCCESSFULLY REGISTERED WITH GOOGLE", r);
              db.queries.users.googleId([req.body.user.sub], function(err, r) {
                res.json({user: r, token: createJWT(req.body.user.sub)});
              });
            });
          } else {
            //Returning user, new login method
            db.queries.google.updateUser([req.body.user.sub, req.body.user.email], function(err, r) {
              console.log("USER SUCCESSFULLY UPDATED");
              db.queries.users.googleId([req.body.user.sub], function(err, r) {
                res.json({user: r, token: createJWT(req.body.user.sub)});
              });
            });
          }
        });
      } else {
        res.status(200).send({error: 'alreadyRegistered'});
      }
    });
    // db.queries.login.verifyUserGoogle([profile.sub], function(err, r) {
    //   if(r.length === 0) {
    //     console.log('NEW USER LOGGING IN. GOOGLE ID:', profile);
    //     db.queries.register.checkForEmail([profile.email], function(err, r) {
    //       if(r.length === 0) {
    //         //No registered user found with email
    //         console.log("NO USER FOUND WITH EMAIL", req.body);
    //         res.status(200).send('test');
    //       } else {
    //         //User found with email
    //         console.log("USER FOUND WITH EMAIL");
    //         db.queries.users.updateUserGoogleAuth([profile.sub, profile.email], function(err, r) {
    //           console.log("UPDATING GOOGLE ID FOR ACCOUNT");
    //           res.status(201).send('User successfully updated');
    //         });
    //       }
    //     });
    //     // res.json({user: profile, token: createJWT(profile.sub)});
    //   } else {
    //     console.log('USER LOGGING IN. GOOGLE ID:', profile.sub);
    //     res.json({user: r, token: createJWT(profile.sub)});
    //   }
    // });
  }
};
