export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('zones', [
    {
      id: 1,
      name: 'Downtown District',
      description: 'Central business district with high foot traffic and premium commercial spaces',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Tech Hub Zone',
      description: 'Modern technology park area with IT companies and startups',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Residential West',
      description: 'Family-friendly residential area with local businesses and schools',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Industrial East',
      description: 'Industrial zone with manufacturing units and logistics centers',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: 'Shopping District',
      description: 'Prime shopping area with malls, retail stores and entertainment venues',
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('zones', null, {});
}