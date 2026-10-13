import { getServices, createService, updateService, deleteService } from "@/lib/actions/services";
import DeleteButton from "@/components/admin/DeleteButton";
import EntityModal from "@/components/admin/EntityModal";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <div className="admin-header">
        <h1>Services</h1>
        <EntityModal title="Nouveau service" action={createService} submitLabel="Créer le service" trigger="Nouveau service">
          <ServiceForm />
        </EntityModal>
      </div>

      <div className="admin-card">
        {services.length === 0 ? (
          <p className="admin-empty">Aucun service pour le moment.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Identifiant</th>
                <th>Ordre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service.title}</td>
                  <td>{service.slug}</td>
                  <td>{service.order}</td>
                  <td>
                    <div className="admin-table-actions">
                      <EntityModal
                        title="Modifier le service"
                        action={updateService}
                        triggerClassName="admin-btn admin-btn-secondary"
                        trigger="Modifier"
                      >
                        <ServiceForm service={service} />
                      </EntityModal>
                      <DeleteButton
                        action={deleteService}
                        id={service._id}
                        confirmMessage={`Supprimer le service "${service.title}" ?`}
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
