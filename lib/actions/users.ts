"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/session";
import { serialize } from "@/lib/serialize";
import type { AdminUser } from "@/lib/types";

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});

export interface UserFormState {
  error?: string;
}

export async function getUsers(): Promise<AdminUser[]> {
  await requireAdmin();
  const db = await getDb();
  const docs = await db
    .collection("users")
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: 1 })
    .toArray();
  return serialize(docs);
}

export async function createUser(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  await requireAdmin();
  const parsed = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Champs invalides." };
  }

  const db = await getDb();
  const email = parsed.data.email.toLowerCase();
  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await db.collection("users").insertOne({
    name: parsed.data.name,
    email,
    passwordHash,
    createdAt: new Date(),
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(formData: FormData) {
  const session = await requireAdmin();
  const id = String(formData.get("id"));

  if (id === session.userId) {
    throw new Error("Vous ne pouvez pas supprimer votre propre compte.");
  }

  const db = await getDb();
  const count = await db.collection("users").countDocuments();
  if (count <= 1) {
    throw new Error("Impossible de supprimer le dernier compte administrateur.");
  }

  await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
