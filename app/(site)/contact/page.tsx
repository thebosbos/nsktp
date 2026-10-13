import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import OpenChatbotButton from "@/components/OpenChatbotButton";
import StickyCta from "@/components/StickyCta";
import { getSettings } from "@/lib/actions/settings";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez NSKTP pour votre chantier de travaux publics. Formulaire, email et chatbot. Intervention à Kadiria et sur tout le territoire.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Contactez-nous</h1>
          <p className="page-hero-subtitle">Un expert vous répond sous 24h. Planning limité.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-form-wrapper">
              <h2 className="section-title">Demander un devis</h2>
              <p className="contact-intro">
                Décrivez votre chantier : nos équipes vous proposeront un mode opératoire et un planning.
              </p>
              <ContactForm />
            </div>

            <div className="contact-info-wrapper">
              <div className="contact-info-card">
                <h3>Contact direct</h3>
                <div className="contact-methods">
                  <a href={`mailto:${settings.email}`} className="contact-method">
                    <div className="contact-icon">✉️</div>
                    <div className="contact-details">
                      <strong>Email</strong>
                      <span>{settings.email}</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <h3>Horaires</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Lundi - Vendredi</span>
                    <span>{settings.hoursWeekdays}</span>
                  </div>
                  <div className="hours-item">
                    <span>Urgences</span>
                    <span>{settings.hoursEmergency}</span>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <h3>Zones d&apos;intervention</h3>
                <p className="zones-text">{settings.zonesText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-placeholder">
          <div className="map-content">
            <h3>Nous intervenons à Kadiria et au-delà</h3>
            <p>Chantiers de voirie, VRD et génie civil sur tout le territoire</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Besoin d&apos;une réponse immédiate ?</h2>
            <p className="cta-subtitle">Écrivez-nous ou utilisez le chatbot pour un pré-diagnostic.</p>
            <div className="cta-buttons">
              <a href={`mailto:${settings.email}`} className="btn btn-large">
                Envoyer un email
              </a>
              <OpenChatbotButton className="btn btn-large">Ouvrir le chatbot</OpenChatbotButton>
            </div>
          </div>
        </div>
      </section>

      <StickyCta href="/contact" label="Demander un devis" />
    </>
  );
}
