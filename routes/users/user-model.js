const db = require("../../database/db-config")

module.exports = {
  add,
  getAllUsers,
  findById,
  findBy,
};


async function add (user) {
  try {
    const [id] = await db("users").insert(user, "id")
    return findById(id);
  } catch (error) {
    throw new Error(`cannot create user ${user.first_name} ${user.last_name}: ${error.message}`);
  }
};

function getAllUsers () {
  return db("users")
}

function findBy (filter) {
  return db("users")
    .where(filter)
}

function findById(id) {
  return db("users")
  .where({ id }).first();
}