// src/models/index.js
import fg from 'fast-glob';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {};

// load all *.model.js inside src/models and src/modules/**/
const files = await fg([
  path.join(__dirname, '*.model.js'),
  path.join(__dirname, '../modules/**/**/*.model.js')
]);

for (const file of files) {
  const mod = await import(pathToFileURL(file));
  const define = mod.default;                       // every model must export default
  const model  = define(sequelize, DataTypes);
  db[model.name] = model;
}

Object.values(db).forEach((m) => m.associate && m.associate(db));

export default db;
