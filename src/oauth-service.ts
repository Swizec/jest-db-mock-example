import { omit } from "lodash";
import db from "./db";

export type OAuthToken = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
};

export type OAuthTokenRow = OAuthToken & {
    internal_reference: string;
};

export const getOAuthToken = async (
    tokenReference: string
): Promise<OAuthToken> => {
    const tokenRow: OAuthTokenRow = await db("oauth_token")
        .where("internal_reference", tokenReference)
        .first();

    return omit(tokenRow, "internal_reference");
};

export const insertOAuthToken = async (
    tokenReference: string,
    token: OAuthToken
) => {
    return db("oauth_token").insert({
        ...token,
        internal_reference: tokenReference,
    });
};
