
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('suggestions').del()
    .then(function () {
      // Inserts seed entries
      return knex('suggestions').insert([
        {
          // id: 1,
          suggestion: "Please send a crew to pickup",
          issue_id: 1,
          author_id: 1,
          upvotes: 1,
          downvotes: 0,
        },
        {
          // id: 2,
          suggestion: "Go talk to the responsable party to stop, maybe even fine them",
          issue_id: 1,
          author_id: 1,
          upvotes: 0,
          downvotes: 1,
        },
        {
          // id: 3,
          suggestion: "GET THOSE LAZY GROUNDSKEEPERS TO DO THEIR JOBS, BY T'UNDER!",
          issue_id: 2,
          author_id: 3,
          upvotes: 0,
          downvotes: 2,
        },
        {
          // id: 4,
          suggestion: "Tell the great groundskeepers that they're doing great and give them a raise for making such a delightful park",
          issue_id: 2,
          author_id: 2,
          upvotes: 2,
          downvotes: 1,
        },
        {
          // id: 5,
          suggestion: "More planned events",
          issue_id: 3,
          author_id: 1,
          upvotes: 0,
          downvotes: 1,
        },
        {
          // id: 6,
          suggestion: "TRAP 'EM OR SHOOT 'EM OR FEED 'EM TO THE FISH, I DON'T CARE WHAT, JUST GET RID OF THEM",
          issue_id: 4,
          author_id: 3,
          upvotes: 0,
          downvotes: 2,
        },
        {
          // id: 7,
          suggestion: "Make sure they get plenty of food and have good nesting materials so they stay around forever",
          issue_id: 4,
          author_id: 2,
          upvotes: 2,
          downvotes: 1,
        },
      ]);
    });
};
