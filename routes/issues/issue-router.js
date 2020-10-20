const Issues = require('./issue-model');

const router = require('express').Router();


router.get('/all', (req, res) => {
  res.status(200).json({message: "comming soon"})
});
// router.get('/all', (req, res) => {
//   Issues.getAllIssues()
//     .then(issues => {
//       res.status(200).json(issues);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Issues', error: err });
//     });
// });

// router.get('/:id', (req, res) => {
//   const id = params.id
//   Issues.findById(id)
//     .then(issues => {
//       res.status(200).json(issues);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Issue', error: err });
//     });
// });

module.exports = router;
