import { logout } from "@/lib/actions/auth";
import Icon from "@/components/admin/Icon";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="admin-logout-btn">
        <Icon name="logout" size={15} />
        Déconnexion
      </button>
    </form>
  );
}
