import type { Project } from "@/lib/types";
import ImageUpload from "@/components/admin/ImageUpload";

function resultsToRaw(results: Project["results"]) {
  return results.map((r) => `${r.value} | ${r.label}`).join("\n");
}

export default function ProjectForm({ project }: { project?: Project }) {
  return (
    <>
      {project && <input type="hidden" name="id" value={project._id} />}

      <div className="admin-field">
        <label>
          Titre
          <input type="text" name="title" required defaultValue={project?.title} />
        </label>
      </div>

      <div className="admin-form-row">
        <div className="admin-field">
          <label>
            Catégorie
            <input type="text" name="category" required defaultValue={project?.category} />
          </label>
        </div>
        <div className="admin-field">
          <label>
            Ordre d&apos;affichage
            <input type="number" name="order" defaultValue={project?.order ?? 0} />
          </label>
        </div>
      </div>

      <ImageUpload defaultValue={project?.image} />

      <div className="admin-field">
        <label>
          Description
          <textarea name="description" required defaultValue={project?.description} />
        </label>
      </div>

      <div className="admin-field">
        <label>
          Résultats (une ligne par résultat)
          <textarea
            name="resultsRaw"
            placeholder={"2,4 km | Linéaire traité\nDélai | Respecté"}
            defaultValue={project ? resultsToRaw(project.results) : ""}
          />
        </label>
        <span className="admin-hint">Format : valeur | libellé — max 4 lignes.</span>
      </div>
    </>
  );
}
