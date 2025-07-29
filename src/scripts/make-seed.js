#!/usr/bin/env node
// Usage: node src/scripts/make-seed.js seed-roles-permissions
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name) {
  console.error('❌ Usage: node src/scripts/make-seed.js <name>');
  process.exit(1);
}

const ts = new Date().toISOString().replace(/[-T:Z.]/g, '').slice(0,14);
const fileName = `${ts}-${name}.js`;
const template = `'use strict';

module.exports = {
  async up (qi, Sequelize) {
    // TODO: insert data with qi.bulkInsert(...)
  },

  async down (qi, Sequelize) {
    // TODO: revert with qi.bulkDelete(...)
  }
};
`;

await fs.promises.mkdir(path.join(process.cwd(), 'seeders'), { recursive: true });
await fs.promises.writeFile(path.join('seeders', fileName), template, 'utf8');
console.log('✅  Created seeders/' + fileName);
