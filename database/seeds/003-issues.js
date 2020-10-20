
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').del()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {
          // id: 1,
          title: "Illegal trash dumping",
          description: "Trashbags have been abandoned in the empty lot next to my home",
          author_id: 2,
          street_address: "1570 Nannete Cir",
          address_notes: "Lot to the west of property",
          city: "Reno",
          state: "NV",
          zip_code: 89502,
          upvotes: 2,
          downvotes: 0,
          status: "new",
        },
        {
          // id: 2,
          title: "Park weeds",
          description: "Everytime I go to take a nap at the park, I end up laying in a goathead patch. With the number of kids and dogs that play in the grass, this is becoming a serious danger",
          author_id: 3,
          street_address: "3925 Neil Rd",
          address_notes: "Miguel Ribera Park",
          city: "Reno",
          state: "NV",
          zip_code: 89502,
          upvotes: 3,
          downvotes: 0,
          status: "in progress",
        },
        {
          // id: 3,
          title: "More tree mulching please",
          description: "I love when we have those community mulching times at the park, can we schedule them more often, pretty please?",
          author_id: 1,
          street_address: "6000 Bartley Ranch Rd",
          city: "Reno",
          state: "NV",
          zip_code: 89511,
          upvotes: 1,
          downvotes: 1,
          status: "notified",
        },
        {
          // id: 4,
          title: "HOMOCIDAL DUCKS",
          description: "HAVE YOU SEEN HOW MANY DUCKS ARE TAKING OVER THE MARINA??? HOW AM I SUPPOSED TO ENJOY MY WALK WHEN THEY VISCIOUSLY TRY TO ATTACK ME EVERY TIME I GET THERE",
          author_id: 3,
          street_address: "300 Howard Dr",
          address_notes: "SPARKS MARINA",
          city: "Sparks",
          state: "NV",
          zip_code: 89434,
          upvotes: 0,
          downvotes: 3,
          status: "notified",
        },
      ]);
    });
};
