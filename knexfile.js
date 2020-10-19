const pgConnection = process.env.DATABASE_URL || "postgres://atygwohkvblkrk:d507498d6dca1c8c5d75d68b93665add57df3b4b4529307b6903dec9e87819ae@ec2-52-21-0-111.compute-1.amazonaws.com:5432/d869aehen1p4gt";

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/comake.db3'
    },
	  useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    // needed when using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  }

};
