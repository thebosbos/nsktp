"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/admin/Icon";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: "dashboard" as const },
  { href: "/admin/projects", label: "Projets", icon: "projects" as const },
  { href: "/admin/services", label: "Services", icon: "services" as const },
  { href: "/admin/stats", label: "Statistiques", icon: "stats" as const },
  { href: "/admin/features", label: "Pourquoi NSKTP", icon: "features" as const },
  { href: "/admin/settings", label: "Coordonnées", icon: "contact" as const },
  { href: "/admin/leads", label: "Demandes", icon: "leads" as const },
  { href: "/admin/users", label: "Administrateurs", icon: "users" as const },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <ul className="admin-nav">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <li key={link.href}>
            <Link href={link.href} className={active ? "active" : ""}>
              <Icon name={link.icon} />
              <span>{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
