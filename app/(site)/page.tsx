import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/actions/services";
import { getStatsByGroup } from "@/lib/actions/stats";
import { getFeatures } from "@/lib/actions/features";
import StickyCta from "@/components/StickyCta";

export const revalidate = 60;

export default async function HomePage() {
  const [services, stats, features] = await Promise.all([
    getServices(),
    getStatsByGroup("home"),
    getFeatures(),
  ]);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Des infrastructures
                <br />
                solides, livrées dans les règles de l&apos;art
              </h1>
              <p className="hero-subtitle">
                NSKTP — NCIRI Slaheddine Kadiria, entreprise de travaux publics.
                Voirie, VRD, génie civil et réseaux : des chantiers maîtrisés, de
                l&apos;étude à la réception.
              </p>
              <div className="hero-tags">
                <span className="tag">Voirie</span>
                <span className="tag">VRD</span>
                <span className="tag">Génie civil</span>
                <span className="tag">Assainissement</span>
                <span className="tag">Qualité</span>
              </div>
              <div className="hero-cta">
                <Link href="/contact" className="btn btn-primary btn-large">
                  Demander un devis
                </Link>
                <Link href="/services" className="btn btn-secondary btn-large">
                  Découvrir nos métiers
                </Link>
              </div>
            </div>
            <div className="hero-media" aria-hidden="true">
              <Image
                src="/assets/nsktp-logo.jpg"
                alt=""
                width={600}
                height={200}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat._id}>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos métiers</h2>
            <p className="section-subtitle">
              Un interlocuteur unique pour vos projets de travaux publics, du terrassement à la mise en service.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service._id}>
                <h3>{service.title}</h3>
                <p>{service.solutionIntro}</p>
                <ul className="service-list">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Link href={`/services#${service.slug}`} className="btn btn-outline">
                  En savoir plus
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pourquoi NSKTP</h2>
            <p className="section-subtitle">
              Une entreprise de terrain, engagée sur la qualité d&apos;exécution et les délais.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <div className="feature-card" key={feature._id}>
                <div className="feature-number">{String(i + 1).padStart(2, "0")}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Un projet de voirie, VRD ou génie civil ?</h2>
            <p className="cta-subtitle">Parlez-nous de votre chantier. Nous établissons une étude et un planning clairs.</p>
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
