
const { transaction } = require('objection');

async function withTransaction(modelClass, callback,errorInfo) {
  const trx = await transaction.start(modelClass.knex());
  try {
    const result = await callback(trx);
    await trx.commit();
    return result;
  } catch (err) {
    await trx.rollback();
    throw new Error(`${errorInfo}: ${err.message}`);
  }
}

module.exports = withTransaction;