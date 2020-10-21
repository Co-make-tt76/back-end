const db = require("../../database/db-config")

module.exports = {
  add,
  getAllIssues,
  findById,
  findBy,
  update,
  remove,
};


async function add (issue) {
  try {
    const [id] = await db("issues").insert(issue, "id")
    return findById(id);
  } catch (error) {
    throw new Error(`cannot create issue ${issue.title}: ${error.message}`);
  }
};

function getAllIssues () {
  return db("issues")
}

function findBy (filter) {
  return db("issues")
    .where(filter)
}

function findById(id) {
  return db("issues")
  .where({ id }).first();
}

function update(changes, id) {
  return db('issues').where({ id }).update(changes)
}

function remove(id) {
  return db('issues').where({ id }).delete()
}
