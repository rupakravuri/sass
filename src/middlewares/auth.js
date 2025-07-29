import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../config/index.js';
import db from '../models/index.js';

passport.use(new JwtStrategy({
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
  try {
    const user = await db.User.findByPk(payload.sub);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) { return done(err, false); }
}));

export default (roles = []) => (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Unauthorized' });
    if (roles.length && !roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  })(req, res, next);
};