const db = require("../../database/db-config")

module.exports = {
  add,
  getAllIssues,
  findById,
  findAllComments,
  findAllSuggestions,
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
// select i.*, c.*
// from issues as i
// join comments as c on c.issue_id = i.id
function getAllIssues () {
  return db("issues as i")
    .join("comments as c", "c.issue_id", "i.id")
    .select("c.*", "i.*")
}

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

function findAllComments() {
  return db("comments")
}

function findAllSuggestions() {
  return db("suggestions")
}

function update(changes, id) {
  return db('issues').where({ id }).update(changes)
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