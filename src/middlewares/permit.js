import db from '../models/index.js';

export default function permit(perms = []) {
  return async (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const rolePerms = new Set();
    if (user.Roles) {
      user.Roles.forEach(r => r.Permissions?.forEach(p => rolePerms.add(p.name)));
    }
    const ok = perms.some(p => rolePerms.has(p));
    if (!ok) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}