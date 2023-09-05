import { getSessionAccessToken, getSessionId } from "kv_oauth/mod.ts";
import { oauth2Client } from "../utils/kv_oauth.ts";

export default async function HomePage(req: Request) {
  const sessionId = await getSessionId(req);
  const isSignedIn = sessionId !== undefined;
  const accessToken = isSignedIn
    ? await getSessionAccessToken(oauth2Client, sessionId)
    : null;

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
        <a href="/oauth/signin">Sign in</a>
      </p>
      <p>
        <a href="/oauth/signout">Sign out</a>
      </p>
      <p>
        <a href="https://github.com/denoland/fresh-deno-kv-oauth-demo">
          Source code
        </a>
      </p>
    </>
  );
}
