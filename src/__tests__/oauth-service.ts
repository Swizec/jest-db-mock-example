import db from "../db";
import * as oauthService from "../oauth-service";
import Faker from "faker";
import omit from "lodash/omit";

describe("oauth-service", () => {
    let token: oauthService.OAuthToken, tokenReference: string;

    beforeEach(() => {
        tokenReference = Faker.datatype.uuid();
        token = {
            access_token: Faker.datatype.string(20),
            refresh_token: Faker.datatype.string(20),
            expires_in: 3600,
        };
    });

    describe("getOAuthToken", () => {
        it("should read the oauth token from db", async () => {
            await db("oauth_token").insert({
                ...token,
                internal_reference: tokenReference,
            });

            const oauthToken = await oauthService.getOAuthToken(tokenReference);

            expect(omit(oauthToken, "internal_reference")).toEqual(token);
        });
    });

    describe("insertOAuthToken", () => {
        it("should insert a token", async () => {
            const [{ count: prevCount }] = await db("oauth_token").count();

            await oauthService.insertOAuthToken(tokenReference, token);

            const [{ count: afterCount }] = await db("oauth_token").count();

            const newToken = await db("oauth_token")
                .where("internal_reference", tokenReference)
                .first();

            expect(afterCount).toEqual((prevCount as number) + 1);
            expect(omit(newToken, "internal_reference")).toEqual(token);
        });
    });
});
