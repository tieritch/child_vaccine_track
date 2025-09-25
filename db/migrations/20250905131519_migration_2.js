/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =  async function(knex) {
   
    await knex.schema
        
        .alterTable('children',(table)=>{
            table.dropColumn('zone_id')
        })

        .createTable('zone_child_enrollments',(table)=>{
            table.increments();
            table.integer('child_id').references('id').inTable('children');
            table.integer('zone_id').references('id').inTable('zones');
            table.timestamps(true,true);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    
    await knex.schema
        
        .alterTable('children',(table)=>{
            table.integer('zone_id')
        })
        
        .dropTableIfExists('zone_child_enrollments')
};
