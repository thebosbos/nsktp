import { getLeads, deleteLead } from "@/lib/actions/leads";
import DeleteButton from "@/components/admin/DeleteButton";
import LeadStatusForm from "@/components/admin/LeadStatusForm";

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <div className="admin-header">
        <h1>Demandes de contact</h1>
      </div>

      <div className="admin-card">
        {leads.length === 0 ? (
          <p className="admin-empty">Aucune demande pour le moment.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Message</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{new Date(lead.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td>
                    <div>
                      {lead.firstName} {lead.lastName}
                    </div>
                    <div className="admin-hint">{lead.email}</div>
                    <div className="admin-hint">{lead.phone}</div>
                  </td>
                  <td>{lead.projectType}</td>
                  <td style={{ maxWidth: 280 }}>{lead.message}</td>
                  <td>
                    <LeadStatusForm id={lead._id} status={lead.status} />
                  </td>
                  <td>
                    <DeleteButton
                      action={deleteLead}
                      id={lead._id}
                      confirmMessage={`Supprimer la demande de ${lead.firstName} ${lead.lastName} ?`}
                    />
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
