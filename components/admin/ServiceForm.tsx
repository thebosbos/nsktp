import type { Service } from "@/lib/types";

function linesToRaw(lines: string[]) {
  return lines.join("\n");
}

function pairsToRaw(pairs: { title?: string; text: string; highlight?: string }[]) {
  return pairs.map((p) => `${p.title ?? p.highlight ?? ""} | ${p.text}`).join("\n");
}

export default function ServiceForm({ service }: { service?: Service }) {
  return (
    <>
      {service && <input type="hidden" name="id" value={service._id} />}

      <div className="admin-form-row">
        <div className="admin-field">
          <label>
            Identifiant (ancre URL)
            <input type="text" name="slug" required defaultValue={service?.slug} placeholder="voirie" />
          </label>
        </div>
        <div className="admin-field">
          <label>
            Ordre d&apos;affichage
            <input type="number" name="order" defaultValue={service?.order ?? 0} />
          </label>
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-field">
          <label>
            Badge
            <input type="text" name="badge" required defaultValue={service?.badge} placeholder="Expertise 01" />
          </label>
        </div>
        <div className="admin-field">
          <label>
            Titre
            <input type="text" name="title" required defaultValue={service?.title} />
          </label>
        </div>
      </div>

      <div className="admin-field">
        <label>
          Problématique
          <textarea name="problem" required defaultValue={service?.problem} />
        </label>
      </div>

      <div className="admin-field">
        <label>
          Introduction de la solution
          <textarea name="solutionIntro" required defaultValue={service?.solutionIntro} />
        </label>
      </div>

      <div className="admin-field">
        <label>
          Points forts (une ligne chacun)
          <textarea
            name="featuresRaw"
            required
            placeholder={"Terrassements et couches de forme\nStructures de chaussée et enrobés"}
            defaultValue={service ? linesToRaw(service.features) : ""}
          />
        </label>
      </div>

      <div className="admin-field">
        <label>
          Méthodologie (max 3 lignes)
          <textarea
            name="methodologyRaw"
            placeholder={"Étude & implantation | Piquetage et phasage chantier\nExécution | Compactage et nivellement"}
            defaultValue={service ? pairsToRaw(service.methodology) : ""}
          />
        </label>
        <span className="admin-hint">Format : titre | description</span>
      </div>

      <div className="admin-field">
        <label>
          Avantages mesurables (max 3 lignes)
          <textarea
            name="benefitsRaw"
            placeholder={"Durabilité | structures adaptées au trafic\nSécurité | usagers et riverains protégés"}
            defaultValue={service ? pairsToRaw(service.benefits) : ""}
          />
        </label>
        <span className="admin-hint">Format : mise en avant | description</span>
      </div>

      <div className="admin-field">
        <label>
          Texte du bouton d&apos;appel à l&apos;action
          <input type="text" name="ctaText" required defaultValue={service?.ctaText} />
        </label>
      </div>
    </>
  );
}
