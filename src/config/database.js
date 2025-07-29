import config from './index.js';

export default {
  username: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  logging: false,
  define: {
    underscored: true,
    timestamps: true,
    paranoid: true
  }
};