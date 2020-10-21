const Issues = require('./issue-model');

const router = require('express').Router();

router.get('/all', (req, res) => {
  Issues.getAllIssues()
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Issues', error: err });
    });
});

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

router.post("/", (req, res) => {
  Issues.add(req.body)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Issue', error: err.message });
    })
})


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  //TODO: validate changes
  Issues.findById(id) //check that exists in db, but I'm debating removing this
    .then(issue => {
      if (issue) {
        //this might drop/reset the up/downvotes. check after successfully editing
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
    res.status(500).json({ message: 'Failed to delete scheme. Error:' + error.message });
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