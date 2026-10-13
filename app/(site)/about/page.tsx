import type { Metadata } from "next";
import Link from "next/link";
import { getStatsByGroup } from "@/lib/actions/stats";
import StickyCta from "@/components/StickyCta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "À propos",
  description:
    "NSKTP — NCIRI Slaheddine Kadiria, entreprise de travaux publics. Découvrez notre vision, nos valeurs et notre engagement chantier.",
};

export default async function AboutPage() {
  const teamStats = await getStatsByGroup("team");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">
            Construire des infrastructures
            <br />
            qui durent.
          </h1>
          <p className="page-hero-subtitle">
            Rigueur • Sécurité • Qualité • Délais • Engagement
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="section-header">
              <h2 className="section-title">Notre Vision</h2>
              <p className="section-subtitle">
                NSKTP — NCIRI Slaheddine Kadiria — place la qualité d&apos;exécution au centre de
                chaque chantier. Nous ne livrons pas seulement des travaux : nous livrons des
                routes, des réseaux et des ouvrages fiables, utilisables et maintenables.
              </p>
            </div>
            <div className="about-details">
              <div className="about-detail-item">
                <h3>Maîtrise de chantier</h3>
                <p>Organisation, planning et coordination des corps d&apos;état pour un avancement maîtrisé.</p>
              </div>
              <div className="about-detail-item">
                <h3>Exécution soignée</h3>
                <p>Respect des prescriptions techniques, des normes et des règles de l&apos;art sur chaque poste.</p>
              </div>
              <div className="about-detail-item">
                <h3>Sécurité d&apos;abord</h3>
                <p>Protection des équipes, des riverains et des usagers, sans compromis sur le terrain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos Valeurs</h2>
            <p className="section-subtitle">
              Les piliers qui guident nos équipes, du bureau au chantier
            </p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">R</div>
              <h3>Rigueur</h3>
              <p>Méthode, contrôles et traçabilité à chaque étape du projet.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">S</div>
              <h3>Sécurité</h3>
              <p>Prévention des risques et respect des consignes de chantier.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">Q</div>
              <h3>Qualité</h3>
              <p>Matériaux, compactage, nivellement : le détail fait la durabilité.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">D</div>
              <h3>Délais</h3>
              <p>Un planning réaliste, suivi et tenu, pour ne pas bloquer vos projets.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">E</div>
              <h3>Engagement</h3>
              <p>Un interlocuteur dédié, présent jusqu&apos;à la réception des travaux.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="section-header">
              <h2 className="section-title">Équipe &amp; Expertise Terrain</h2>
              <p className="section-subtitle">
                Conducteurs de travaux, chefs de chantier, opérateurs et conducteurs d&apos;engins :
                une équipe formée aux réalités du BTP, capable d&apos;intervenir sur voirie, VRD et
                ouvrages de génie civil.
              </p>
            </div>
            {teamStats.length > 0 && (
              <div className="team-stats">
                {teamStats.map((stat) => (
                  <div className="team-stat" key={stat._id}>
                    <div className="team-stat-number">{stat.value}</div>
                    <div className="team-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="about-section quality-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Engagement Qualité &amp; Sécurité</h2>
            <p className="section-subtitle">
              Des pratiques de chantier alignées sur les exigences des maîtres d&apos;ouvrage
            </p>
          </div>
          <div className="quality-grid">
            <div className="quality-item">
              <h3>Qualité d&apos;exécution</h3>
              <ul className="quality-list">
                <li>Contrôles de compactage et de nivellement</li>
                <li>Suivi des matériaux et des provenances</li>
                <li>Récolements et dossiers de réception</li>
                <li>Respect des CCTP et plans d&apos;exécution</li>
              </ul>
            </div>
            <div className="quality-item">
              <h3>Normes &amp; référentiels</h3>
              <ul className="quality-list">
                <li>Voirie et chaussées</li>
                <li>VRD et assainissement</li>
                <li>Béton et ouvrages de génie civil</li>
                <li>Signalisation et sécurité routière</li>
              </ul>
            </div>
            <div className="quality-item">
              <h3>Processus chantier</h3>
              <ul className="quality-list">
                <li>Préparation et installation de chantier</li>
                <li>Points d&apos;arrêt et contrôles intermédiaires</li>
                <li>Coordination avec les concessionnaires</li>
                <li>Remise en état et réception</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Construisons votre prochain chantier</h2>
            <p className="cta-subtitle">Découvrez comment NSKTP peut mener vos travaux publics de A à Z.</p>
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
