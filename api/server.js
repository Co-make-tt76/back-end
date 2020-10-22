const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require("../database/db-config");

const authenticate = require('../routes/auth/authenticate-middleware');
const authRouter = require('../routes/auth/auth-router');
const userRouter = require("../routes/users/user-router");
const issueRouter = require("../routes/issues/issue-router");

const server = express();

// server.use(morgan('dev'))
server.use(helmet());
server.use(cors());
server.use(express.json());



server.use('/auth', authRouter);
server.use('/user', authenticate, userRouter);
server.use('/issues', issueRouter);

server.get('/status', async (req, res) => {
  //checking knex status too
  res.status(200).json({
    api: true,
    db: await getDbStatus(),
    //any other db's to check?
  });
});

server.use("/", (req, res) => {
  res.status(200).json({message: "this endpoint doesn't exist, did you spell it correctly?"})
})

module.exports = server;

async function getDbStatus() {
  try{
    await db.raw('select 1+1 as result');
    return true;
  } catch(err) {
    console.log(err)
    return false;
  }
}