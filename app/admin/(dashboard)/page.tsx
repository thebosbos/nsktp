import Link from "next/link";
import { getDb } from "@/lib/mongodb";
import { getLeads } from "@/lib/actions/leads";

export default async function AdminDashboardPage() {
  const db = await getDb();
  const [projectsCount, servicesCount, statsCount, leads] = await Promise.all([
    db.collection("projects").countDocuments(),
    db.collection("services").countDocuments(),
    db.collection("stats").countDocuments(),
    getLeads(),
  ]);

  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const recentLeads = leads.slice(0, 5);

  return (
    <div>
      <div className="admin-header">
        <h1>Tableau de bord</h1>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-number">{projectsCount}</div>
          <div className="admin-stat-label">Projets</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-number">{servicesCount}</div>
          <div className="admin-stat-label">Services</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-number">{statsCount}</div>
          <div className="admin-stat-label">Statistiques</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-number">{newLeadsCount}</div>
          <div className="admin-stat-label">Nouvelles demandes</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-header">
          <h2 style={{ fontSize: "1.1rem" }}>Demandes récentes</h2>
          <Link href="/admin/leads" className="admin-btn admin-btn-secondary">
            Voir tout
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="admin-empty">Aucune demande pour le moment.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Type</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead._id}>
                  <td>
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td>{lead.email}</td>
                  <td>{lead.projectType}</td>
                  <td>
                    <span className={`admin-badge admin-badge-${lead.status}`}>{lead.status}</span>
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
