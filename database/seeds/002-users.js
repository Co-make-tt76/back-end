
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          // id: 1,
          first_name: "Josh_just_wants_plants",
          last_name: "McGee",
          email: "josh@josh.com",
          password: "josh",
          role: "user",
          phone: 1231231234,
          street_address: "1570 Nannete Cir",
          city: "Reno",
          state: "NV",
          zip_code: 89502
        },
        {
          // id: 2,
          first_name: "Suzanne 'Sweetie'",
          last_name: "Sweetheart",
          email: "suzanne@suzanne.com",
          password: "suzanne",
          role: "user",
          phone: 1231231234,
          street_address: "1570 Nannete Cir",
          city: "Reno",
          state: "NV",
          zip_code: 89502
        },
        {
          // id: 3,
          first_name: "PHINEAS",
          last_name: "CRANKIUS",
          email: "phineas@phineas.com",
          password: "phineas",
          role: "admin",
          phone: 1231231234,
          street_address: "3925 Neil Rd",
          city: "Reno",
          state: "NV",
          zip_code: 89502
        },
      ]);
    });
};
