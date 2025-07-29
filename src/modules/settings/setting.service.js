import settingRepo from './setting.repo.js';
import * as cache from '../../services/cache.service.js';
import { sequelize } from '../../models/index.js';

const CACHE_KEY = 'app-settings';

const parsers = {
  boolean: (v) => v === 'true' || v === true,
  number: (v) => Number(v),
  json: (v) => (typeof v === 'string' ? JSON.parse(v||'null') : v),
  array: (v) => (Array.isArray(v) ? v : (v ? String(v).split(',') : [])),
  string: (v) => (v == null ? '' : String(v))
};

export async function getAll(force = false) {
  if (!force) {
    const cached = await cache.get(CACHE_KEY);
    if (cached) return cached;
  }
  const rows = await settingRepo.findAll();
  const obj = {};
  rows.forEach((r) => {
    const parse = parsers[r.type] || parsers.string;
    obj[r.key] = parse(r.value);
  });
  await cache.set(CACHE_KEY, obj, 300);
  return obj;
}

export async function getByKey(key) {
  const all = await getAll();
  return all[key];
}

export async function saveMany(payload) {
  // payload: { key: value, ... }
  return sequelize.transaction(async (t) => {
    const kv = {};
    Object.entries(payload).forEach(([k, v]) => {
      const type = Array.isArray(v) ? 'array' : typeof v === 'boolean' ? 'boolean' : typeof v === 'number' ? 'number' : (isJson(v) ? 'json' : 'string');
      kv[k] = { value: type === 'json' || type === 'array' ? JSON.stringify(v) : String(v), type };
    });
    await settingRepo.upsertMany(kv, { transaction: t });
  });
}

function isJson(v){
  if (typeof v !== 'string') return false;
  try { JSON.parse(v); return true; } catch { return false; }
}

export async function clearCache() {
  await cache.del(CACHE_KEY);
}