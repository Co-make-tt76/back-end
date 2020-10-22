const Users = require('./user-model');

const router = require('express').Router();

//get all users
router.get('/all', (req, res) => {
  Users.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Users', error: err });
    });
});
// /get a user
router.get('/:id', (req, res) => {
  const id = req.params.id
  Users.findById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching User', error: err });
    });
});


// router.get('/', (req, res) => {
//   const requestOptions = {
//     headers: { accept: 'application/json' },
//   };
//   Users.getAllUsers("/", requestOptions)
//     .then(response => {
//       res.status(200).json(response.data.results);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Jokes', error: err });
//     });
// });

module.exports = router;
