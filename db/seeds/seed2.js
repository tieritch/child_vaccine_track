/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sexes').del()
  await knex('sexes').insert([
    {name: 'male'},
    { name: 'female'},
  ]);
};
