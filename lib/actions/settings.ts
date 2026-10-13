"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/session";
import { serialize } from "@/lib/serialize";
import type { SiteSettings } from "@/lib/types";

const settingsSchema = z.object({
  email: z.string().min(1),
  hoursWeekdays: z.string().min(1),
  hoursEmergency: z.string().min(1),
  zonesText: z.string().min(1),
  copyrightText: z.string().min(1),
});

const DEFAULT_SETTINGS: SiteSettings = {
  email: "slaheldinenciri@slaheddinensktp.me",
  hoursWeekdays: "8h00 - 17h00",
  hoursEmergency: "Astreinte chantier",
  zonesText:
    "Kadiria et wilaya de Bouira. Interventions sur tout le territoire selon les marchés.",
  copyrightText: "NSKTP — NCIRI Slaheddine Kadiria",
};

function fromFormData(formData: FormData) {
  return settingsSchema.parse({
    email: formData.get("email"),
    hoursWeekdays: formData.get("hoursWeekdays"),
    hoursEmergency: formData.get("hoursEmergency"),
    zonesText: formData.get("zonesText"),
    copyrightText: formData.get("copyrightText"),
  });
}

function revalidateSettingsPages() {
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}

export async function getSettings(): Promise<SiteSettings> {
  const db = await getDb();
  const doc = await db.collection("settings").findOne({ key: "site" });
  if (!doc) return DEFAULT_SETTINGS;
  return serialize<SiteSettings>({
    email: doc.email ?? DEFAULT_SETTINGS.email,
    hoursWeekdays: doc.hoursWeekdays ?? DEFAULT_SETTINGS.hoursWeekdays,
    hoursEmergency: doc.hoursEmergency ?? DEFAULT_SETTINGS.hoursEmergency,
    zonesText: doc.zonesText ?? DEFAULT_SETTINGS.zonesText,
    copyrightText: doc.copyrightText ?? DEFAULT_SETTINGS.copyrightText,
  });
}

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  const data = fromFormData(formData);
  const db = await getDb();
  await db.collection("settings").updateOne(
    { key: "site" },
    { $set: data, $unset: { phone: "" } },
    { upsert: true }
  );
  revalidateSettingsPages();
}
