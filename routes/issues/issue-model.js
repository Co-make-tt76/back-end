const db = require("../../database/db-config")

module.exports = {
  addIssue,
  addComment,
  addSuggestion,
  getAllIssues,
  findById,
  findCommentById,
  findSuggestionById,
  findAllComments,
  findAllSuggestions,
  findBy,
  updateIssue,
  updateComment,
  updateSuggestion,
  removeIssue,
  removeComment,
  removeSuggestion,
};


async function addIssue (issue) {
  try {
    const [id] = await db("issues").insert(issue, "id")
    return findById(id);
  } catch (error) {
    throw new Error(`cannot create issue ${issue.title}: ${error.message}`);
  }
};

async function addComment (comment) {
  try {
    const [id] = await db("comments").insert(comment, "id")
    return findCommentById(id);
  } catch (error) {
    throw new Error(`cannot create comment ${comment.title}: ${error.message}`);
  }
};

async function addSuggestion (suggestion) {
  try {
    const [id] = await db("suggestions").insert(suggestion, "id")
    return findSuggestionById(id);
  } catch (error) {
    throw new Error(`cannot create suggestion ${suggestion.title}: ${error.message}`);
  }
};

// function getAllIssues () {
//   return db("issues as i")
//     .join("comments as c", "c.issue_id", "i.id")
//     .select("c.*", "i.*")
// }

function getAllIssues () {
  return db("issues").orderBy("created_at")
}

function findBy (filter) {
  return db("issues")
    .where(filter)
}

function findById(id) {
  return db("issues")
  .where({ id }).first();
}
function findCommentById(id) {
  return db("comments")
  .where({ id }).first();
}
function findSuggestionById(id) {
  return db("suggestions")
  .where({ id }).first();
}

function findAllComments() {
  return db("comments")
}

function findAllSuggestions() {
  return db("suggestions")
}
//why does this break if I try to pass in a table name instead of hardcoding it? I could have suuuuuuch cleaner code, but it won't cooperate
// function update(changes, id, tableName) {
//   return db(tableName).where({ id }).update(changes)
// }
function updateIssue(changes, id) {
  return db("issues").where({ id }).update(changes)
}

function updateComment(changes, id) {
  return db("comments").where({ id }).update(changes)
}

function updateSuggestion(changes, id) {
  return db("suggestions").where({ id }).update(changes)
}

function removeIssue(id) {
  return db('issues').where({ id }).delete()
}

function removeComment(id) {
  return db('comments').where({ id }).delete()
}

function removeSuggestion(id) {
  return db('suggestions').where({ id }).delete()
}
