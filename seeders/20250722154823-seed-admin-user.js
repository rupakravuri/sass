// seeders/20250722-seed-admin-user.js
export async function up (qi, Sequelize) {
  const now = new Date();
  const email = 'admin@example.com';

  const [rows] = await qi.sequelize.query(
    'SELECT id FROM users WHERE email = :email LIMIT 1',
    { replacements: { email } }
  );

  if (!rows.length) {
    const bcrypt = await import('bcrypt');
    const hash = await bcrypt.hash('password', 10);
    await qi.bulkInsert('users', [{
      name: 'Admin',
      email,
      password: hash,
      role: 'admin',
      created_at: now,
      updated_at: now
    }]);
  }

  // attach to admin role if RBAC tables exist
  try {
    const [[user]] = await qi.sequelize.query(
      'SELECT id FROM users WHERE email = :email LIMIT 1',
      { replacements: { email } }
    );
    const [[role]] = await qi.sequelize.query(
      "SELECT id FROM roles WHERE name = 'admin' LIMIT 1"
    );
    if (user && role) {
      const [ur] = await qi.sequelize.query(
        'SELECT 1 FROM user_roles WHERE user_id = :uid AND role_id = :rid LIMIT 1',
        { replacements: { uid: user.id, rid: role.id } }
      );
      if (!ur.length) {
        await qi.bulkInsert('user_roles', [{ user_id: user.id, role_id: role.id }]);
      }
    }
  } catch (e) {
    // ignore if roles/user_roles tables don’t exist yet
  }
}

export async function down (qi) {
  await qi.bulkDelete('user_roles', null, {});
  await qi.bulkDelete('users', { email: 'admin@example.com' }, {});
}
