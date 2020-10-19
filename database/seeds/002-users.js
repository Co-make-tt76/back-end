
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: "Josh_just_wants_plants",
          email: "josh@josh.com",
          password: "josh",
          role: "user",
          phone: "123-123-1234",
          location_id: 1
        },
        {
          id: 2,
          name: "Suzanne 'Sweetie' Sweetheart",
          email: "suzanne@suzanne.com",
          password: "suzanne",
          role: "user",
          phone: "1231231234",
          location_id: 1
        },
        {
          id: 3,
          name: "PHINEAS CRANKIUS",
          email: "phineas@phineas.com",
          password: "phineas",
          role: "admin",
          phone: "1231231234",
          location_id: 2
        },
      ]);
    });
};
