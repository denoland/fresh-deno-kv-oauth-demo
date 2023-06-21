import type { Handlers, PageProps } from "$fresh/server.ts";
import { getSessionAccessToken, getSessionId } from "kv_oauth";
import { oauth2Client } from "../utils/oauth2_client.ts";

interface Data {
  isSignedIn: boolean;
  accessToken: null | string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req);
    const isSignedIn = sessionId !== null;
    const accessToken = isSignedIn
      ? await getSessionAccessToken(oauth2Client, sessionId)
      : null;

    return ctx.render({ isSignedIn, accessToken });
  },
};

export default function HomePage(props: PageProps<Data>) {
  const { isSignedIn, accessToken } = props.data;
  return (
    <>
      <p>Provider: GitHub</p>
      <p>Signed in: {isSignedIn || "undefined"}</p>
      <p>
        Your access token: {accessToken !== null
          ? (
            <span style="filter:blur(3px)">
              ${accessToken + " (intentionally blurred for security)"}
            </span>
          )
          : null}
      </p>
      <p>
        <a href="/signin">Sign in</a>
      </p>
      <p>
        <a href="/signout">Sign out</a>
      </p>
      <p>
        <a href="https://github.com/iuioiua/fresh-deno-kv-oauth-demo">
          Source code
        </a>
      </p>
    </>
  );
}
