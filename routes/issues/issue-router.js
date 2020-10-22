const Issues = require('./issue-model');
const Users = require('../users/user-model');

const authenticate = require("../auth/authenticate-middleware");

const router = require('express').Router();

//get all issues w comments, suggestion, and author data attatched & in the structure front-end wants. I'm sure theres a more elegant solution, but this works for quick and dirty.
router.get('/all', async (req, res) => {
  let commentList = await Issues.findAllComments()
  let suggestionList = await Issues.findAllSuggestions()
  let authorList = await Users.getAllUsers()
  Issues.getAllIssues()
    .then(arrayOfIssues => {
      arrayOfIssues.map(issue => {

        issue.comments = commentList.filter(comment => {
          return comment.issue_id == issue.id
        });
        issue.suggestions = suggestionList.filter(suggestion => {
          return suggestion.issue_id == issue.id
        })
        issue.user = authorList.filter(author => {
          return author.id == issue.author_id
        })

      })
      res.status(200).json(arrayOfIssues)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Issues', error: err });
    });
});

//everything after this point should have to pass authenticate. I think there's a way to do it with router.use/, but figured I'd poke that later & again, just do the simple, safe, dirty work. (yes it's only as safe as my memory to include it in every router, i know.)
// get all comments
router.get('/comments', authenticate, (req, res) => {
  Issues.findAllComments()
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Finding comments', error: err });
    });
});

// get all suggestions
router.get('/suggestions', authenticate, (req, res) => {
  Issues.findAllSuggestions()
    .then(suggestions => {
      res.status(200).json(suggestions)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Finding suggestions', error: err });
    });
});

//get specific issue
router.get('/:id', authenticate, (req, res) => {
  const id = req.params.id
  Issues.findById(id)
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Issue', error: err });
    });
});

//post a new issue
router.post("/", authenticate, (req, res) => {
  Issues.addIssue(req.body)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Issue', error: err.message });
    })
})

//post a new comment
router.post("/comment", authenticate, (req, res) => {
  Issues.addComment(req.body)
    .then(comment => {
      res.status(200).json(comment)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Comment', error: err.message });
    })
})

//post a new suggestion
router.post("/suggestion", authenticate, (req, res) => {
  Issues.addSuggestion(req.body)
    .then(suggestion => {
      res.status(200).json(suggestion)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Suggestion', error: err.message });
    })
})

//edit suggestion
router.put("/suggestion/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  //TODO: validate changes
  Issues.findSuggestionById(id) //check that exists in db, but I'm debating removing this
    .then(suggestion => {
      if (suggestion) {
        Issues.updateSuggestion(changes, id, "suggestions")//update it
          .then(updatedsuggestion => {
            res.json(updatedsuggestion);
          })
          .catch(error => {
            console.log("inside the .catch", error)
            res.status(500).json({ message: "failed to update", error: error.message })
          })
      } else {
        res.status(404).json({ message: 'Could not find suggestion with given id' });
      };
    })
    .catch(error => {
      res.status(404).json({ message: 'Could not find suggestion with given id, error:'+ error.message  })
    })
})

//edit comment
router.put("/comment/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  //TODO: validate changes
  Issues.findCommentById(id) //check that exists in db, but I'm debating removing this
    .then(comment => {
      if (comment) {
        Issues.updateComment(changes, id)//update it
          .then(updatedComment => {
            res.json(updatedComment);
          })
          .catch(error => {
            console.log("inside the .catch", error)
            res.status(500).json({ message: "failed to update", error: error.message })
          })
      } else {
        res.status(404).json({ message: 'Could not find comment with given id' });
      };
    })
    .catch(error => {
      res.status(404).json({ message: 'Could not find comment with given id, error:'+ error.message  })
    })
})

//edit issue
router.put("/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  //TODO: validate changes
  Issues.findById(id) //check that exists in db, but I'm debating removing this
    .then(issue => {
      if (issue) {
        Issues.updateIssue(changes, id, 'issues')//update it
          .then(updatedissue => {
            res.json(updatedissue);
          })
          .catch(error => {
            console.log("inside the .catch", error)
            res.status(500).json({ message: "failed to update", error: error.message })
          })
      } else {
        res.status(404).json({ message: 'Could not find issue with given id' });
      };
    })
    .catch(error => {
      res.status(404).json({ message: 'Could not find issue with given id, error:'+ error.message  })
    })
})

// delete comment
router.delete('/comment/:id', authenticate, (req, res) => {
  const { id } = req.params;
  Issues.removeComment(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id. Error' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme. Error:' + err.message });
  });
});

// delete suggestion
router.delete('/suggestion/:id', authenticate, (req, res) => {
  const { id } = req.params;
  Issues.removeSuggestion(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id. Error' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme. Error:' + err.message });
  });
});

// delete issue
router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  Issues.removeIssue(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id. Error' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme. Error:' + err.message });
  });
});

 module.exports = router;

function isValid(req, res, next) {
  const { title, description, author_id, city, state } = req.body
  let zip_code = parseInt(req.body.zip_code)
  if (title && description && author_id) {
    if (city && state && zip_code ) {
      console.log("passed validation")
      next();
    } else {
      res.status(500).json({ message: "city, state & zip_code are required"})
    }
  } else{
    res.status(500).json({ message: "title, description & author_id are required"})
  }
}