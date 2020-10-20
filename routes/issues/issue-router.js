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
  console.log("gets inside the post")
  Issues.add(req.body)
    .then(issue => {
      res.status(200).json(issue)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Posting Issue', error: err.message });
    })
})

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