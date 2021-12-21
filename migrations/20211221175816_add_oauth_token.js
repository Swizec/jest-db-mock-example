exports.up = async (knex) => {
    await knex.schema.createTable("oauth_token", (table) => {
        table
            .string("internal_reference")
            .primary()
            .comment("A string reference to later fetch the token");
        table
            .string("access_token")
            .notNullable()
            .comment(
                "The token to use to authenticate with when using the Cronofy API"
            );
        table
            .string("refresh_token")
            .notNullable()
            .comment("The refresh token for the granted authorization");
        table
            .integer("expires_in")
            .notNullable()
            .comment(
                "The approximate number of seconds that the access token will be valid for"
            );
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("oauth_token");
};
