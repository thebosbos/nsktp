"use server";

import { z } from "zod";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/session";
import { serialize } from "@/lib/serialize";
import type { Lead, LeadStatus } from "@/lib/types";

const leadSchema = z.object({
  projectType: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().optional().default(""),
  message: z.string().min(1),
  consent: z.literal("on"),
});

export interface LeadFormState {
  error?: string;
  success?: boolean;
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse({
    projectType: formData.get("projectType"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company") ?? "",
    message: formData.get("message"),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return { error: "Merci de remplir tous les champs obligatoires." };
  }

  const { consent: _consent, ...lead } = parsed.data;
  const db = await getDb();
  await db.collection("leads").insertOne({
    ...lead,
    status: "new" satisfies LeadStatus,
    createdAt: new Date(),
  });
  revalidatePath("/admin/leads");

  return { success: true };
}

export async function getLeads(): Promise<Lead[]> {
  await requireAdmin();
  const db = await getDb();
  const docs = await db.collection("leads").find().sort({ createdAt: -1 }).toArray();
  return serialize(docs);
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as LeadStatus;
  const db = await getDb();
  await db.collection("leads").updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const db = await getDb();
  await db.collection("leads").deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
