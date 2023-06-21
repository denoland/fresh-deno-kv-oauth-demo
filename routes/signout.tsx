import type { Handlers } from "$fresh/server.ts";
import { signOut } from "kv_oauth";

export const handler: Handlers = {
  async GET(req) {
    return await signOut(req, "/");
  },
};
