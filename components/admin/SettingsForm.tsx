"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { SiteSettings } from "@/lib/types";

export default function SettingsForm({
  settings,
  action,
}: {
  settings: SiteSettings;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await action(formData);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-field">
        <label>
          Email
          <input type="email" name="email" required defaultValue={settings.email} placeholder="slaheldinenciri@slaheddinensktp.me" />
        </label>
      </div>

      <div className="admin-form-row">
        <div className="admin-field">
          <label>
            Horaires — Lundi à Vendredi
            <input
              type="text"
              name="hoursWeekdays"
              required
              defaultValue={settings.hoursWeekdays}
              placeholder="8h00 - 18h00"
            />
          </label>
        </div>
        <div className="admin-field">
          <label>
            Horaires — Urgences
            <input
              type="text"
              name="hoursEmergency"
              required
              defaultValue={settings.hoursEmergency}
              placeholder="24/7"
            />
          </label>
        </div>
      </div>

      <div className="admin-field">
        <label>
          Zones d&apos;intervention
          <textarea
            name="zonesText"
            required
            defaultValue={settings.zonesText}
            placeholder="Kadiria, wilaya de Bouira, et tout le territoire selon les marchés."
          />
        </label>
      </div>

      <div className="admin-field">
        <label>
          Texte de copyright (pied de page)
          <input
            type="text"
            name="copyrightText"
            required
            defaultValue={settings.copyrightText}
            placeholder="NSKTP — NCIRI Slaheddine Kadiria"
          />
        </label>
      </div>

      <button type="submit" className="admin-btn" disabled={pending}>
        {pending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
