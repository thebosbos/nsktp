"use server";

import { z } from "zod";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/session";
import { serialize } from "@/lib/serialize";
import type { Feature } from "@/lib/types";

const featureSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  order: z.coerce.number().default(0),
});

function fromFormData(formData: FormData) {
  return featureSchema.parse({
    title: formData.get("title"),
    text: formData.get("text"),
    order: formData.get("order") || 0,
  });
}

function revalidateFeaturePages() {
  revalidatePath("/");
  revalidatePath("/admin/features");
}

export async function getFeatures(): Promise<Feature[]> {
  const db = await getDb();
  const docs = await db.collection("features").find().sort({ order: 1 }).toArray();
  return serialize(docs);
}

export async function createFeature(formData: FormData) {
  await requireAdmin();
  const data = fromFormData(formData);
  const db = await getDb();
  await db.collection("features").insertOne(data);
  revalidateFeaturePages();
}

export async function updateFeature(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const data = fromFormData(formData);
  const db = await getDb();
  await db.collection("features").updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidateFeaturePages();
}

export async function deleteFeature(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const db = await getDb();
  await db.collection("features").deleteOne({ _id: new ObjectId(id) });
  revalidateFeaturePages();
}
