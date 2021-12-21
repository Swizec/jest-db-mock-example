import db from "./src/db";

// enables the fake database for all
jest.mock("./src/db");

// run migrations
beforeAll(async () => {
    await db.migrate.latest();
});

// close connection
afterAll(async () => {
    await db.destroy();
});
