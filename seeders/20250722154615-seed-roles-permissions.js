// seeders/20250722154615-seed-roles-permissions.js
export async function up (qi, Sequelize) {
  const now = new Date();

  await qi.bulkInsert('roles', [
    { id: 1, name: 'admin',   description: 'Full access',              created_at: now, updated_at: now },
    { id: 2, name: 'manager', description: 'Manage limited resources', created_at: now, updated_at: now },
    { id: 3, name: 'user',    description: 'Regular user',             created_at: now, updated_at: now }
  ], { ignoreDuplicates: true });

  await qi.bulkInsert('permissions', [
    { id: 1, name: 'manageUsers',       group: 'users',     created_at: now, updated_at: now },
    { id: 2, name: 'manageSettings',    group: 'settings',  created_at: now, updated_at: now },
    { id: 3, name: 'manageOrders',      group: 'orders',    created_at: now, updated_at: now },
    { id: 4, name: 'manageRestaurants', group: 'stores',    created_at: now, updated_at: now }
  ], { ignoreDuplicates: true });

  await qi.bulkInsert('role_permissions', [
    { role_id: 1, permission_id: 1 },
    { role_id: 1, permission_id: 2 },
    { role_id: 1, permission_id: 3 },
    { role_id: 1, permission_id: 4 }
  ], { ignoreDuplicates: true });

  // attach admin user if exists
  const [rows] = await qi.sequelize.query("SELECT id FROM users WHERE email='admin@example.com' LIMIT 1");
  if (rows.length) {
    const uid = rows[0].id;
    const [ur] = await qi.sequelize.query(
      "SELECT 1 FROM user_roles WHERE user_id=? AND role_id=1 LIMIT 1",
      { replacements: [uid] }
    );
    if (!ur.length) {
      await qi.bulkInsert('user_roles', [{ user_id: uid, role_id: 1 }]);
    }
  }
}

export async function down (qi, Sequelize) {
  await qi.bulkDelete('user_roles', null, {});
  await qi.bulkDelete('role_permissions', null, {});
  await qi.bulkDelete('permissions', null, {});
  await qi.bulkDelete('roles', null, {});
}
