/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.alterTable('vaccinations', (table)=>{
     table.timestamps(true,true);
     table.integer('by').notNullable();
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('vaccinations', (table)=>{
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
        table.dropColumn('by');
    })
};
