import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/actions/projects";
import { getStatsByGroup } from "@/lib/actions/stats";
import StickyCta from "@/components/StickyCta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projets & Réalisations",
  description:
    "Réalisations NSKTP — voirie, VRD, génie civil et assainissement. Découvrez nos chantiers de travaux publics.",
};

export default async function ProjetsPage() {
  const [projects, stats] = await Promise.all([getProjects(), getStatsByGroup("projects")]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Projets &amp; Réalisations</h1>
          <p className="page-hero-subtitle">Des chantiers concrets. Des résultats mesurables.</p>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project._id}>
                <div className="project-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.results.length > 0 && (
                    <div className="project-results">
                      {project.results.map((result, i) => (
                        <div className="project-result" key={i}>
                          <strong>{result.value}</strong>
                          <span>{result.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="projects-stats">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Chiffres clés</h2>
              <p className="section-subtitle">Des résultats qui parlent d&apos;eux-mêmes</p>
            </div>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-item" key={stat._id}>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Votre chantier sera notre prochaine réalisation</h2>
            <p className="cta-subtitle">Décrivez-nous votre projet. Nous revenons vers vous rapidement.</p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-large">
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StickyCta href="/contact" label="Demander un devis" />
    </>
  );
}
