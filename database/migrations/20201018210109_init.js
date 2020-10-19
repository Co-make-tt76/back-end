
exports.up = function(knex) {
  return knex.schema
    .createTable("locations", locations => {
      locations.increments();
      locations.string("street_address");
      locations.string("city").notNullable();
      locations.string("state").notNullable();
      locations.string("zip_code").notNullable();
    })

    .createTable("users", users => {
      users.increments();
      users.string("name").notNullable();
      users.string("email").notNullable();
      users.string("password").notNullable();
      users.string("role").defaultTo("user").notNullable();
      users.string("phone");
      users.integer("location_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })

    .createTable("issues", issues => {
      issues.increments();
      //Did I timestamps right???
      issues.timestamps(true, true);
      issues.string("name").notNullable();
      issues.text("description").notNullable();
      issues.integer("author_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      issues.integer("location_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      issues.string("status").notNullable().defaultTo("new");
      issues.integer("upvotes").notNullable();
      issues.integer("downvotes").notNullable();
    })

    .createTable("comments", comments => {
      comments.increments();
      comments.text("comment").notNullable();
      comments.integer("author_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      comments.integer("issue_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('issues')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      comments.integer("upvotes").notNullable()
      comments.integer("downvotes").notNullable()
      comments.timestamps(true, true);
    })

    .createTable("suggestions", suggestions => {
      suggestions.increments();
      suggestions.text("suggestion").notNullable();
      suggestions.integer("author_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      suggestions.integer("issue_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('issues')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      suggestions.integer("upvotes").notNullable()
      suggestions.integer("downvotes").notNullable()
      suggestions.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("suggestions")
    .dropTableIfExists("comments")
    .dropTableIfExists("issues")
    .dropTableIfExists("users")
    .dropTableIfExists("locations");
};
