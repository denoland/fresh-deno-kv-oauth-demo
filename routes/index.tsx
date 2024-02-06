import { getSessionId } from "$deno_kv_oauth/mod.ts";

export default async function HomePage(req: Request) {
  const sessionId = await getSessionId(req);

  return (
    <>
      <p>Provider: GitHub</p>
      <p>Signed in: {sessionId === undefined ? `No` : `Yes`}</p>
      <p>
        <a href="/signin">Sign in</a>
      </p>
      <p>
        <a href="/protected">Protected page</a>
      </p>
      <p>
        <a href="/signout">Sign out</a>
      </p>
      <p>
        <a href="https://github.com/denoland/fresh-deno-kv-oauth-demo">
          Source code
        </a>
      </p>
    </>
  );
}
