import type { Feature } from "@/lib/types";

export default function FeatureForm({ feature }: { feature?: Feature }) {
  return (
    <>
      {feature && <input type="hidden" name="id" value={feature._id} />}

      <div className="admin-form-row">
        <div className="admin-field">
          <label>
            Titre
            <input type="text" name="title" required defaultValue={feature?.title} placeholder="Maîtrise de chantier" />
          </label>
        </div>
        <div className="admin-field">
          <label>
            Ordre d&apos;affichage
            <input type="number" name="order" defaultValue={feature?.order ?? 0} />
          </label>
        </div>
      </div>

      <div className="admin-field">
        <label>
          Texte
          <textarea
            name="text"
            required
            defaultValue={feature?.text}
            placeholder="Planning, phasage et coordination jusqu'à la réception."
          />
        </label>
      </div>
    </>
  );
}
