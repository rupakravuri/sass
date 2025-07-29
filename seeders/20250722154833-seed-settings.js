// seeders/20250722-seed-settings.js
export async function up (qi, Sequelize) {
  const now = new Date();

  const defaults = [
    { key: 'platformFee',             value: '3.5',                         type: 'number'  },
    { key: 'orderIdPrefix',           value: 'ORD-',                        type: 'string'  },
    { key: 'orderIdSuffix',           value: '',                            type: 'string'  },
    { key: 'enableDunzoDelivery',     value: 'false',                       type: 'boolean' },
    { key: 'tips',                    value: JSON.stringify([10,20,30]),    type: 'array'   },
    { key: 'tips_percentage',         value: JSON.stringify([5,10,15]),     type: 'array'   },
    { key: 'delivery_charge_type',    value: 'flat',                        type: 'string'  },
    { key: 'delivery_charges',        value: '40',                          type: 'number'  },
    { key: 'base_delivery_charge',    value: '20',                          type: 'number'  },
    { key: 'base_delivery_distance',  value: '3',                           type: 'number'  },
    { key: 'extra_delivery_charge',   value: '10',                          type: 'number'  },
    { key: 'extra_delivery_distance', value: '1',                           type: 'number'  },
    { key: 'storeUrl',                value: 'http://localhost:8080',       type: 'string'  },
    { key: 'forceNewSettingsVersion', value: '',                            type: 'string'  },
    { key: 'forceCacheClearVersion',  value: '',                            type: 'string'  }
  ];

  for (const s of defaults) {
    await qi.sequelize.query(
      `INSERT INTO settings (\`key\`, \`value\`, \`type\`)
       VALUES (:key, :value, :type)
       ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`), \`type\` = VALUES(\`type\`)`,
      { replacements: s }
    );
  }
}

export async function down (qi) {
  const keys = [
    'platformFee','orderIdPrefix','orderIdSuffix','enableDunzoDelivery',
    'tips','tips_percentage','delivery_charge_type','delivery_charges',
    'base_delivery_charge','base_delivery_distance','extra_delivery_charge',
    'extra_delivery_distance','storeUrl','forceNewSettingsVersion','forceCacheClearVersion'
  ];
  await qi.bulkDelete('settings', { key: keys }, {});
}
