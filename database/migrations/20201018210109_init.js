
exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users.string("first_name").notNullable();
      users.string("last_name").notNullable();
      users.string("email").notNullable().unique();
      users.string("password").notNullable();
      users.string("role").defaultTo("user").notNullable();
      users.bigInteger("phone");
      users.string("street_address");
      users.string("city").notNullable();
      users.string("state").notNullable();
      users.integer("zip_code").notNullable();
    })

    .createTable("issues", issues => {
      issues.increments();
      //Did I timestamps right???
      issues.timestamps(true, true);
      issues.string("title").notNullable();
      issues.text("description").notNullable();
      issues.integer("author_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      issues.string("street_address");
      issues.string("address_notes");
      issues.string("city").notNullable();
      issues.string("state").notNullable();
      issues.integer("zip_code").notNullable();
      issues.string("status").notNullable().defaultTo("new");
      issues.integer("upvotes").notNullable().defaultTo(0);
      issues.integer("downvotes").notNullable().defaultTo(0);
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
      comments.integer("upvotes").notNullable().defaultTo(0);
      comments.integer("downvotes").notNullable().defaultTo(0);
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
      suggestions.integer("upvotes").notNullable().defaultTo(0);
      suggestions.integer("downvotes").notNullable().defaultTo(0);
      suggestions.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("suggestions")
    .dropTableIfExists("comments")
    .dropTableIfExists("issues")
    .dropTableIfExists("users");
};
