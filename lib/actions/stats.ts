"use server";

import { z } from "zod";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/session";
import { serialize } from "@/lib/serialize";
import type { Stat, StatGroup } from "@/lib/types";

const statSchema = z.object({
  group: z.enum(["home", "projects", "team"]),
  value: z.string().min(1),
  label: z.string().min(1),
  order: z.coerce.number().default(0),
});

function fromFormData(formData: FormData) {
  return statSchema.parse({
    group: formData.get("group"),
    value: formData.get("value"),
    label: formData.get("label"),
    order: formData.get("order") || 0,
  });
}

function revalidateStatPages() {
  revalidatePath("/");
  revalidatePath("/projets");
  revalidatePath("/about");
  revalidatePath("/admin/stats");
}

export async function getAllStats(): Promise<Stat[]> {
  const db = await getDb();
  const docs = await db.collection("stats").find().sort({ group: 1, order: 1 }).toArray();
  return serialize(docs);
}

export async function getStatsByGroup(group: StatGroup): Promise<Stat[]> {
  const db = await getDb();
  const docs = await db
    .collection("stats")
    .find({ group })
    .sort({ order: 1 })
    .toArray();
  return serialize(docs);
}

export async function createStat(formData: FormData) {
  await requireAdmin();
  const data = fromFormData(formData);
  const db = await getDb();
  await db.collection("stats").insertOne(data);
  revalidateStatPages();
}

export async function updateStat(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const data = fromFormData(formData);
  const db = await getDb();
  await db.collection("stats").updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidateStatPages();
}

export async function deleteStat(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const db = await getDb();
  await db.collection("stats").deleteOne({ _id: new ObjectId(id) });
  revalidateStatPages();
}
