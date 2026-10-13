import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/actions/settings";

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <Image
              src="/assets/nsktp-logo.jpg"
              alt="NSKTP"
              width={220}
              height={56}
              className="footer-logo"
            />
            <p className="footer-tagline">
              NCIRI Slaheddine Kadiria — Travaux publics. Des infrastructures durables, livrées avec rigueur.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link href="/services#voirie">Voirie &amp; routes</Link></li>
              <li><Link href="/services#vrd">Terrassement &amp; VRD</Link></li>
              <li><Link href="/services#genie-civil">Génie civil</Link></li>
              <li><Link href="/services#reseaux">Assainissement &amp; réseaux</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Entreprise</h4>
            <ul className="footer-links">
              <li><Link href="/about">À propos</Link></li>
              <li><Link href="/projets">Projets</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {settings.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
