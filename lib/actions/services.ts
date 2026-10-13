"use server";

import { z } from "zod";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/session";
import { serialize } from "@/lib/serialize";
import type { Service } from "@/lib/types";

const serviceSchema = z.object({
  slug: z.string().min(1),
  badge: z.string().min(1),
  title: z.string().min(1),
  problem: z.string().min(1),
  solutionIntro: z.string().min(1),
  ctaText: z.string().min(1),
  order: z.coerce.number().default(0),
  features: z.array(z.string().min(1)),
  methodology: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).max(3),
  benefits: z.array(z.object({ highlight: z.string().min(1), text: z.string().min(1) })).max(3),
});

function parseLines(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** "Audit & Étude | Analyse complète de vos besoins" per line */
function parsePairs(raw: string, keys: [string, string]) {
  return parseLines(raw)
    .map((line) => {
      const [a, b] = line.split("|").map((s) => s.trim());
      return { [keys[0]]: a ?? "", [keys[1]]: b ?? "" };
    })
    .filter((entry) => entry[keys[0]] && entry[keys[1]]);
}

function fromFormData(formData: FormData) {
  return serviceSchema.parse({
    slug: formData.get("slug"),
    badge: formData.get("badge"),
    title: formData.get("title"),
    problem: formData.get("problem"),
    solutionIntro: formData.get("solutionIntro"),
    ctaText: formData.get("ctaText"),
    order: formData.get("order") || 0,
    features: parseLines(String(formData.get("featuresRaw") ?? "")),
    methodology: parsePairs(String(formData.get("methodologyRaw") ?? ""), ["title", "text"]).slice(0, 3),
    benefits: parsePairs(String(formData.get("benefitsRaw") ?? ""), ["highlight", "text"]).slice(0, 3),
  });
}

function revalidateServicePages() {
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function getServices(): Promise<Service[]> {
  const db = await getDb();
  const docs = await db.collection("services").find().sort({ order: 1 }).toArray();
  return serialize(docs);
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const data = fromFormData(formData);
  const db = await getDb();
  await db.collection("services").insertOne(data);
  revalidateServicePages();
}

export async function updateService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const data = fromFormData(formData);
  const db = await getDb();
  await db.collection("services").updateOne({ _id: new ObjectId(id) }, { $set: data });
  revalidateServicePages();
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const db = await getDb();
  await db.collection("services").deleteOne({ _id: new ObjectId(id) });
  revalidateServicePages();
}
