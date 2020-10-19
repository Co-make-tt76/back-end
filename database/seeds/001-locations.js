
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {id: 1, street_address: "1570 Nannete Cir", city: "Reno", state: "NV", zip_code: "89502"},
        {id: 2, street_address: "3925 Neil Rd", city: "Reno", state: "NV", zip_code: "89502"},
        {id: 3, street_address: "6000 Bartley Ranch Rd", city: "Reno", state: "NV", zip_code: "89511"},
        {id: 4, street_address: "300 Howard Dr", city: "Sparks", state: "NV", zip_code: "89434"},
        {id: 5, street_address: "NF-047", city: "Reno", state: "NV", zip_code: "89511"},

      ]);
    });
};
