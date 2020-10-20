const db = require("../../database/db-config")

module.exports = {
  add,
  getAllIssues,
  findById,
  findBy,
};


async function add (issue) {
  try {
    const response = await db("issues").insert(issue, "id")
    console.log(response)
    return findById(1);
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