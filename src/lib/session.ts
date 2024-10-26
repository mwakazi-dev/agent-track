import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function createSession(
  idToken: string,
  expiresIn: number,
  admin: boolean
) {
  const nextCookies = await cookies();

  nextCookies.set("session", idToken, {
    httpOnly: true,
    maxAge: expiresIn,
    path: "/",
  });

  if (admin) {
    nextCookies.set("role", "admin", {
      httpOnly: true,
      maxAge: expiresIn,
      path: "/",
    });
  }
}

export const verifySession = cache(async () => {
  const nextCookies = await cookies();

  const session = nextCookies.get("session")?.value;

  return { isAuth: true, session: session };
});

export const deleteSession = async () => {
  const nextCookies = await cookies();

  nextCookies.delete("session");
  nextCookies.delete("role");

  redirect("/", RedirectType.push);
};
