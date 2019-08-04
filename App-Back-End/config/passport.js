const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Agent = mongoose.model("agent");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      Agent.findById(jwt_payload.id)
        .then(agent => {
          if (agent) {
            return done(null, agent);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
