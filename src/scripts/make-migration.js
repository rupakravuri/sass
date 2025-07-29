#!/usr/bin/env node
/**
 * Simple Sequelize migration generator (ESM).
 * Usage:
 *   node src/scripts/make-migration.js create-settings
 *   node src/scripts/make-migration.js add-type-to-settings
 *
 * Options (optional flags):
 *   --dir=custom/migrations         # default: migrations
 *
 * It just creates the file with a boilerplate; you edit `up/down`.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- helpers ---------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const args = process.argv.slice(2);
if (!args[0]) {
  console.error('❌  Usage: node src/scripts/make-migration.js <name> [--dir=path]');
  process.exit(1);
}

const nameArg = args[0];
const dirArg  = (args.find(a => a.startsWith('--dir=')) || '').split('=')[1];

const outDir  = path.join(process.cwd(), dirArg || 'migrations');

// Timestamp like 20250722142310
const stamp = new Date().toISOString().replace(/[-T:Z.]/g, '').slice(0,14);
const fileName = `${stamp}-${nameArg}.js`;

const template = `\
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // TODO: write your migration here.
    // Example:
    // await queryInterface.createTable('settings', {
    //   key:  { type: Sequelize.STRING(191), primaryKey: true },
    //   value:{ type: Sequelize.TEXT('long') },
    //   type: { type: Sequelize.ENUM('string','number','boolean','json','array'), defaultValue: 'string' },
    //   updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    // });
  },

  async down (queryInterface, Sequelize) {
    // TODO: revert your migration here.
    // Example:
    // await queryInterface.dropTable('settings');
  }
};
`;

(async () => {
  try {
    await fs.promises.mkdir(outDir, { recursive: true });
    const fullPath = path.join(outDir, fileName);
    await fs.promises.writeFile(fullPath, template, 'utf8');
    console.log(`✅  Created ${path.relative(process.cwd(), fullPath)}`);
  } catch (err) {
    console.error('❌  Failed to create migration:', err);
    process.exit(1);
  }
})();
