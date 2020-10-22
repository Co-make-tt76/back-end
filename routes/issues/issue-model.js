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
  remove,
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

function remove(id) {
  return db('issues').where({ id }).delete()
}

//this does one issues pull, and multiple comments pulls
//this is to loop over each of the issue items, and each time, do a secondary db check for all comments that match the issue's id & add them as a nested object.

//this does one issues pull and one comments pull
//loop over each record in the issue, and check to see if it's id matches any in the comments records, adding them as a nested object if they do.
issues = [
  {id:1, title: "salsa"},
  {id:1, title: "chips"},
  {id:1, title: "guac"},
]

comments = [
  {id:1, issues_id:1, comment: "is tasty"},
  {id:2, issues_id:1, comment: "ewww"},
  {id:3, issues_id:2, comment: "yes please"},
  {id:4, issues_id:3, comment: "OMG"},
  {id:5, issues_id:3, comment: "you nasty"},
]

// Issues.getAllIssues()
//   .then(arrayOfIssues => {
//     arrayOfIssues.map(issue => {
//       let arrayOfComments = comments.filter(comment => {
//         comment.issues_id === issue.id
//       });
//       issue.newCommentsObjs = arrayOfComments
//     })
//   })
//   .catch(`nah, no problems in that code`)

//expected