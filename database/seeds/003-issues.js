
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').del()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {
          id: 1,
          name: "Illegal trash dumping",
          description: "Trashbags have been abandoned in the empty lot next to my home",
          author_id: 2,
          location_id: 1,
          upvotes: 2,
          downvotes: 0,
          status: "new",
        },
        {
          id: 2,
          name: "Park weeds",
          description: "Everytime I go to take a nap at the park, I end up laying in a goathead patch. With the number of kids and dogs that play in the grass, this is becoming a serious danger",
          author_id: 3,
          location_id: 2,
          upvotes: 3,
          downvotes: 0,
          status: "in progress",
        },
        {
          id: 3,
          name: "More tree mulching please",
          description: "I love when we have those community mulching times at the park, can we schedule them more often, pretty please?",
          author_id: 1,
          location_id: 3,
          upvotes: 1,
          downvotes: 1,
          status: "notified",
        },
        {
          id: 4,
          name: "HOMOCIDAL DUCKS",
          description: "HAVE YOU SEEN HOW MANY DUCKS ARE TAKING OVER THE MARINA??? HOW AM I SUPPOSED TO ENJOY MY WALK WHEN THEY VISCIOUSLY TRY TO ATTACK ME EVERY TIME I GET THERE",
          author_id: 3,
          location_id: 4,
          upvotes: 0,
          downvotes: 3,
          status: "notified",
        },
      ]);
    });
};
