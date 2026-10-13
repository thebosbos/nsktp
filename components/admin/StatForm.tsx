import type { Stat } from "@/lib/types";

export default function StatForm({ stat }: { stat?: Stat }) {
  return (
    <>
      {stat && <input type="hidden" name="id" value={stat._id} />}

      <div className="admin-field">
        <label>
          Groupe
          <select name="group" required defaultValue={stat?.group ?? "home"}>
            <option value="home">Accueil</option>
            <option value="projects">Page Projets</option>
            <option value="team">À propos (équipe)</option>
          </select>
        </label>
      </div>

      <div className="admin-form-row">
        <div className="admin-field">
          <label>
            Valeur
            <input type="text" name="value" required defaultValue={stat?.value} placeholder="500+" />
          </label>
        </div>
        <div className="admin-field">
          <label>
            Ordre
            <input type="number" name="order" defaultValue={stat?.order ?? 0} />
          </label>
        </div>
      </div>

      <div className="admin-field">
        <label>
          Libellé
          <input type="text" name="label" required defaultValue={stat?.label} placeholder="Projets réalisés" />
        </label>
      </div>
    </>
  );
}
