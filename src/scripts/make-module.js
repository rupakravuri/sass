import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const name = process.argv[2];
if (!name) {
  console.error('❌  Provide a module name: node src/scripts/make-module.js users');
  process.exit(1);
}

const pascal = name.charAt(0).toUpperCase() + name.slice(1);
const baseDir = path.join(process.cwd(), 'src', 'modules', name);

const files = {
  [`${name}.model.js`]: `module.exports = (sequelize, DataTypes) => {
  const ${pascal} = sequelize.define('${pascal}', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: '${name}s' });
  return ${pascal};
};
`,
  [`${name}.repo.js`]: `import BaseRepository from '../../core/db/BaseRepository.js';
import db from '../../models/index.js';

class ${pascal}Repository extends BaseRepository {}

export default new ${pascal}Repository(db.${pascal});`,
  [`${name}.service.js`]: `import repo from './${name}.repo.js';

export async function list(where = {}, opts = {}) { return repo.findAll(where, opts); }
export async function get(id) { return repo.findById(id); }
export async function create(payload) { return repo.create(payload); }
export async function update(id, payload) { await repo.update(payload, { id }); return get(id); }
export async function remove(id) { return repo.delete({ id }); }`,
  [`${name}.controller.js`]: `import BaseController from '../../core/http/BaseController.js';
import catchAsync from '../../utils/catchAsync.js';
import * as service from './${name}.service.js';

class ${pascal}Controller extends BaseController {
  index = catchAsync(async (req, res) => { this.ok(res, await service.list()); });
  show = catchAsync(async (req, res) => { this.ok(res, await service.get(req.params.id)); });
  create = catchAsync(async (req, res) => { this.created(res, await service.create(req.body)); });
  update = catchAsync(async (req, res) => { this.ok(res, await service.update(req.params.id, req.body)); });
  remove = catchAsync(async (req, res) => { await service.remove(req.params.id); this.ok(res, { deleted: true }); });
}

export default new ${pascal}Controller();`,
  [`${name}.routes.js`]: `import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import controller from './${name}.controller.js';
import { createSchema, updateSchema } from './${name}.validation.js';

const router = Router();

router.get('/', auth(), controller.index);
router.get('/:id', auth(), controller.show);
router.post('/', auth('manage${pascal}'), validate(createSchema), controller.create);
router.put('/:id', auth('manage${pascal}'), validate(updateSchema), controller.update);
router.delete('/:id', auth('manage${pascal}'), controller.remove);

export default router;`,
  [`${name}.validation.js`]: `import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().required()
});

export const updateSchema = Joi.object({
  name: Joi.string().optional()
});`
};

(async () => {
  try {
    await fs.promises.mkdir(baseDir, { recursive: true });
    for (const [file, content] of Object.entries(files)) {
      const full = path.join(baseDir, file);
      if (fs.existsSync(full)) {
        console.log('⚠️  Exists, skipping:', full);
        continue;
      }
      await fs.promises.writeFile(full, content, 'utf8');
      console.log('✅  Created', path.relative(process.cwd(), full));
    }

    console.log(`\n👉  Add to src/routes/v1/index.js:\nimport ${name}Routes from '../../modules/${name}/${name}.routes.js';\nrouter.use('/${name}', ${name}Routes);\n`);
  } catch (e) {
    console.error('❌  Failed:', e);
    process.exit(1);
  }
})();