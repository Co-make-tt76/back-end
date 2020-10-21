const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const configs = require("../../api/configs");
const Users = require("../users/user-model");
const { isValid } = require("./auth-services");

// //temp/sanity check
// router.get('/users', (req, res) => {
//   Users.getAllUsers()
//     .then(users => {
//       res.status(201).json(users)
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to get all users" })
//     })
// })

router.post("/register", (req, res) => {
  const credentials = req.body;
  if(isValid(credentials)){
    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 4;
    // const rounds = 4;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Users.add(credentials)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new user", error: err.message })
      })
  } else {
    res.status(400).json({ message: "Must include name,  email, password, & location"})
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (isValid(req.body)) {
    Users.findBy({ email: email })
      .then(([user]) => {
        if( user && bcryptjs.compareSync(password, user.password)) {
          const token = getJwt(user);
          res.status(200).json({ message: "login post success", token, userId: user.id })
        } else {
          res.status(500).json({ message: error.message, triggered: "after compareSync failed" })
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message, triggered: "by the email couldn't be found" });
      })
  } else {
    res.status(400).json({
      message: "please provide email and an alphanumeric password"
    })
  }
});

//TODO Logout

module.exports = router;

function getJwt(user) {
  const payload = {
    username: user.username,
  }
  const jwtOptions = {
    expiresIn: "8hr",
  }
  return jwt.sign(payload, configs.jwtSecret, jwtOptions)
}
