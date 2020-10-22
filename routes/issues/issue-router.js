const Issues = require('./issue-model');

const router = require('express').Router();

//get all issues w comments
router.get('/all', async (req, res) => {
  let commentList = await Issues.findAllComments()
  let suggestionList = await Issues.findAllSuggestions()
  Issues.getAllIssues()
    .then(arrayOfIssues => {
      arrayOfIssues.map(issue => {

        issue.comments = commentList.filter(comment => {
          return comment.issue_id == issue.id
        });
        issue.suggestions = suggestionList.filter(suggestion => {
          return suggestion.issue_id == issue.id
        })

      })
      res.status(200).json(arrayOfIssues)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Issues', error: err });
    });
});


// get all comments
router.get('/comments', (req, res) => {
  Issues.findAllComments()
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Finding comments', error: err });
    });
});

// get all suggestions
router.get('/suggestions', (req, res) => {
  Issues.findAllSuggestions()
    .then(suggestions => {
      res.status(200).json(suggestions)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Finding suggestions', error: err });
    });
});

//get specific issue
router.get('/:id', (req, res) => {
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
router.post("/", (req, res) => {
  Issues.addIssue(req.body)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Issue', error: err.message });
    })
})

//post a new comment
//do I need the ":id"???
router.post("/comment", (req, res) => {
  Issues.addComment(req.body)
    .then(comment => {
      res.status(200).json(comment)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Comment', error: err.message });
    })
})

//post a new suggestion
router.post("/suggestion", (req, res) => {
  Issues.addSuggestion(req.body)
    .then(suggestion => {
      res.status(200).json(suggestion)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Suggestion', error: err.message });
    })
})

//edit existing issue
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  //TODO: validate changes
  Issues.findById(id) //check that exists in db, but I'm debating removing this
    .then(issue => {
      if (issue) {
        Issues.update(changes, id)//update it
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

// delete issue
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Issues.remove(id)
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