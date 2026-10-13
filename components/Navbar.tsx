"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/projets", label: "Projets" },
  { href: "/about", label: "À propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} ref={navRef}>
      <div className="container">
        <div className="nav-wrapper">
          <Link href="/" className="logo" aria-label="NSKTP - Accueil">
            <Image
              src="/assets/nsktp-logo.jpg"
              alt="NSKTP — NCIRI Slaheddine Kadiria Travaux Publics"
              width={280}
              height={72}
              className="logo-img"
              priority
            />
          </Link>
          <button
            className={`mobile-menu-btn${menuOpen ? " active" : ""}`}
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu${menuOpen ? " active" : ""}`}>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={pathname === link.href ? "active" : ""}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className={`btn-nav${pathname === "/contact" ? " active" : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
