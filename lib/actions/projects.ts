"use server";

import { z } from "zod";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/session";
import { serialize } from "@/lib/serialize";
import type { Project } from "@/lib/types";

const MAX_IMAGE_LENGTH = 6_000_000; // ~4.5MB decoded, comfortably under Mongo's 16MB document limit

const projectSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  image: z
    .string()
    .min(1)
    .max(MAX_IMAGE_LENGTH, "Image trop volumineuse.")
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:image/"),
      "L'image doit être une URL ou un fichier importé."
    ),
  description: z.string().min(1),
  order: z.coerce.number().default(0),
  results: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .max(4),
});

/** "35% | Économie énergétique" per line -> [{ value: "35%", label: "Économie énergétique" }] */
function parseResults(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, label] = line.split("|").map((s) => s.trim());
      return { value: value ?? "", label: label ?? "" };
    })
    .filter((r) => r.value && r.label)
    .slice(0, 4);
}

function fromFormData(formData: FormData) {
  return projectSchema.parse({
    title: formData.get("title"),
    category: formData.get("category"),
    image: formData.get("image"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
    results: parseResults(String(formData.get("resultsRaw") ?? "")),
  });
}

function revalidateProjectPages() {
  revalidatePath("/projets");
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function getProjects(): Promise<Project[]> {
  const db = await getDb();
  const docs = await db.collection("projects").find().sort({ order: 1 }).toArray();
  return serialize(docs);
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const data = fromFormData(formData);
  const db = await getDb();
  const now = new Date();
  await db.collection("projects").insertOne({ ...data, createdAt: now, updatedAt: now });
  revalidateProjectPages();
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const data = fromFormData(formData);
  const db = await getDb();
  await db
    .collection("projects")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } });
  revalidateProjectPages();
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const db = await getDb();
  await db.collection("projects").deleteOne({ _id: new ObjectId(id) });
  revalidateProjectPages();
}
