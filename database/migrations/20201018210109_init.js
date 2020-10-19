
exports.up = function(knex) {
  return knex.schema
    .createTable("locations", tbl => {
      tbl.increments();
      tbl.string("street_address");
      tbl.string("city").notNullable();
      tbl.string("state").notNullable();
      tbl.string("zip_code").notNullable();
    })

    .createTable("users", tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("email").notNullable();
      tbl.string("password").notNullable();
      tbl.string("role").defaultTo("user").notNullable();
      tbl.string("phone");
      tbl.integer("location_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })

    .createTable("issues", tbl => {
      tbl.increments();
      //Did I timestamps right???
      tbl.timestamps(true, true);
      tbl.string("name").notNullable();
      tbl.text("description").notNullable();
      tbl.integer("author_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.integer("location_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.string("status").notNullable().defaultTo("new");
      tbl.integer("upvotes").notNullable();
      tbl.integer("downvotes").notNullable();
    })

    //TODO COMMENTS TABLE
    //TODO SUGGESTIONS TABLE

};

exports.down = function(knex) {
  //TODO FINISH THIS
};
