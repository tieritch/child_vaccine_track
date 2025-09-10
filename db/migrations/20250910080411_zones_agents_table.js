/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("zones_agents", (table)=>{
        table.integer("zone_id").references('id').inTable('zones');
        table.integer('agent_id').references('id').inTable('health_agents');
        table.timestamps(true,true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
   await knex.schema.dropTableIfExists('zones_agents');
};
