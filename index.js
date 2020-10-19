// const server = require('./api/server.js');

// const PORT = process.env.PORT || 3300;
// server.listen(PORT, () => {
//   console.log(`\n=== Server listening on port ${PORT} ===\n`);
// });

const server = require('./api/server');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})