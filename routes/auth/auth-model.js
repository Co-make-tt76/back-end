const db = require("../../database/db-config")

module.exports = {
  add,
  getAllUsers,
  findById,
  findBy,
};


async function add (user) {
  try {
    const location = {
      street_address: user.street_address,
      city: user.city,
      state: user.state,
      zip_code: user.zip_code
    };

    // const location_id = await addLocation(location)
    const location_id = 1

    const userInfo = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      phone: user.phone,
      location_id
    }
    const [id] = await db("users").insert(userInfo, "id")
    return findById(id);
  } catch (error) {
    throw new Error(`cannot create user ${user.name}: ${error.message}`);
  }
};

async function addLocation (location) {
  try {
    const [id] = await db("locations").insert(location, "id")
    return id;
  } catch (error) {
    throw new Error(`problem with adding location: ${error.message}`);
  }
}

function getAllUsers () {
  return db("users")
}

function findBy (filter) {
  return db("users")
    .where(filter)
}

function findById(id) {
  return db("users")
  .where({ id }).first();
}