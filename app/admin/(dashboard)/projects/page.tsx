import { getProjects, createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import DeleteButton from "@/components/admin/DeleteButton";
import EntityModal from "@/components/admin/EntityModal";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="admin-header">
        <h1>Projets</h1>
        <EntityModal title="Nouveau projet" action={createProject} submitLabel="Créer le projet" trigger="Nouveau projet">
          <ProjectForm />
        </EntityModal>
      </div>

      {projects.length === 0 ? (
        <div className="admin-card">
          <p className="admin-empty">Aucun projet pour le moment.</p>
        </div>
      ) : (
        <div className="admin-project-grid">
          {projects.map((project) => (
            <div className="admin-project-card" key={project._id}>
              <div className="admin-project-card-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.title} />
              </div>
              <div className="admin-project-card-body">
                <span className="admin-project-card-category">{project.category}</span>
                <div className="admin-project-card-title">{project.title}</div>
                <span className="admin-project-card-order">Ordre : {project.order}</span>
                <div className="admin-project-card-actions">
                  <EntityModal
                    title="Modifier le projet"
                    action={updateProject}
                    triggerClassName="admin-btn admin-btn-secondary"
                    trigger="Modifier"
                  >
                    <ProjectForm project={project} />
                  </EntityModal>
                  <DeleteButton
                    action={deleteProject}
                    id={project._id}
                    confirmMessage={`Supprimer le projet "${project.title}" ?`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
