const passportJWT = require('passport-jwt');
const { findAll, findOne, addOne, updateOne, deleteOne } = require('../fake-db/data');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport) => {
  // we assume that the client will send the JWT token in Authorization Header as a Bearer Token
  // https://github.com/themikenicholson/passport-jwt
  passport.use(new JWTStrategy({
    // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
  }, (jwtPayload, cb) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('jwtPayload:', jwtPayload);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~');
    
    // find the user in db if needed. This functionality may be omitted 
    // if you store everything you'll need in JWT payload.
    const user = findOne(jwtPayload.userid);
    console.log('user:', user);
    return cb(null, user);
  }));
};
