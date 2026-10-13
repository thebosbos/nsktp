import { getSession } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">NSKTP Admin</div>
        <AdminNav />
        <div className="admin-user">
          Connecté : {session?.name}
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
