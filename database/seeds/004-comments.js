
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          // id: 1,
          comment: "Yes please, I think it's those snobby people down the street who refuse to take out their gargabe regularly",
          issue_id: 1,
          author_id: 1,
          upvotes: 1,
          downvotes: 0,
        },
        {
          // id: 2,
          comment: "No, it's the cute guys in the other house, who are always just too busy",
          issue_id: 1,
          author_id: 2,
          upvotes: 0,
          downvotes: 1,
        },
        {
          // id: 3,
          comment: "Cute guys?!?! Suzanne, your too young! Get off of these apps young lady!",
          issue_id: 1,
          author_id: 1,
          upvotes: 1,
          downvotes: 1,
        },
        {
          // id: 4,
          comment: "OMG, WHAT?! This is like the awesomes park in town. We go have picnics there all the time (socially distanced of course), and never find any goatheads. Are you sure your thinking of the same park?",
          issue_id: 2,
          author_id: 2,
          upvotes: 0,
          downvotes: 0,
        },
        {
          // id: 5,
          comment: "TREE MULCHING? DON'T YOU MEAN DUMP DAY. THESE CHAOTIC EVENTS ARE A DISGRACE TO OUR COMMUNITY WITH ALL THE RUBBISH PEOPLE BRING. HAVE YOU EVER TRIED TO GET ANY OF THE MULCH THEY MAKE? ITS HALF PLASTIC GARBAGE!",
          issue_id: 3,
          author_id: 3,
          upvotes: 0,
          downvotes: 2,
        },
        {
          // id: 6,
          comment: "Phineas, I know that you're upset, but it's not that bad. I only has 2 peices of trash in the chips I picked up. And I've told you time and time again to please stop using all caps, it's not proper computer ettiquette",
          issue_id: 3,
          author_id: 1,
          upvotes: 2,
          downvotes: 1,
        },
        {
          // id: 7,
          comment: "DO NOT TELL ME WHAT I CAN AND CANNOT DO JOSH! WHY, WHEN I WAS GROWING UP [edited for language by staff]",
          issue_id: 3,
          author_id: 3,
          upvotes: 0,
          downvotes: 2,
        },
        {
          // id: 8,
          comment: "Don't believe him, the ducks are adorable. I love it when the ducklings start waddling around. I would however, love to know if the marina is ever actually cleaned, bc that really is a lot of ducks and the water's starting to look pretty green",
          issue_id: 4,
          author_id: 2,
          upvotes: 1,
          downvotes: 1,
        },
      ]);
    });
};
