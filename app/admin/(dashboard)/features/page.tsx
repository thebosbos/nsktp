import { getFeatures, createFeature, updateFeature, deleteFeature } from "@/lib/actions/features";
import DeleteButton from "@/components/admin/DeleteButton";
import EntityModal from "@/components/admin/EntityModal";
import FeatureForm from "@/components/admin/FeatureForm";

export default async function AdminFeaturesPage() {
  const features = await getFeatures();

  return (
    <div>
      <div className="admin-header">
        <h1>Pourquoi NSKTP</h1>
        <EntityModal
          title="Nouvel argument"
          action={createFeature}
          submitLabel="Créer l'argument"
          trigger="Nouvel argument"
        >
          <FeatureForm />
        </EntityModal>
      </div>

      <div className="admin-card">
        {features.length === 0 ? (
          <p className="admin-empty">Aucun argument pour le moment.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Texte</th>
                <th>Ordre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature._id}>
                  <td>{feature.title}</td>
                  <td style={{ maxWidth: 360 }}>{feature.text}</td>
                  <td>{feature.order}</td>
                  <td>
                    <div className="admin-table-actions">
                      <EntityModal
                        title="Modifier l'argument"
                        action={updateFeature}
                        triggerClassName="admin-btn admin-btn-secondary"
                        trigger="Modifier"
                      >
                        <FeatureForm feature={feature} />
                      </EntityModal>
                      <DeleteButton
                        action={deleteFeature}
                        id={feature._id}
                        confirmMessage={`Supprimer "${feature.title}" ?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
