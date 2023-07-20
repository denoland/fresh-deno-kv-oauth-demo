import { createGitHubOAuth2Client } from "kv_oauth";
import type { Plugin } from "$fresh/server.ts";
import { handleCallback, signIn, signOut } from "kv_oauth";

export const oauth2Client = createGitHubOAuth2Client();

export function plugin(): Plugin {
  return {
    name: "kv-oauth",
    routes: [
      {
        path: "/signin",
        handler: async (req) => await signIn(req, oauth2Client),
      },
      {
        path: "/callback",
        handler: async (req) => {
          // Return object also includes `accessToken` and `sessionId` properties.
          const { response } = await handleCallback(req, oauth2Client);
          return response;
        },
      },
      {
        path: "/signout",
        handler: async (req) => await signOut(req),
      },
    ],
  };
}
