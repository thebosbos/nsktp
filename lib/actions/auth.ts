"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export interface LoginState {
  error?: string;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Email ou mot de passe invalide." };
  }

  const db = await getDb();
  const user = await db
    .collection("users")
    .findOne({ email: parsed.data.email.toLowerCase() });

  if (!user) {
    return { error: "Identifiants incorrects." };
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash as string);
  if (!valid) {
    return { error: "Identifiants incorrects." };
  }

  await setSessionCookie({
    userId: user._id.toString(),
    email: user.email as string,
    name: user.name as string,
  });

  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}
