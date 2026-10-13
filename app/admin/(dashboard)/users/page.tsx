import { getUsers, deleteUser } from "@/lib/actions/users";
import { getSession } from "@/lib/session";
import DeleteButton from "@/components/admin/DeleteButton";
import UserForm from "@/components/admin/UserForm";

export default async function AdminUsersPage() {
  const [users, session] = await Promise.all([getUsers(), getSession()]);

  return (
    <div>
      <div className="admin-header">
        <h1>Administrateurs</h1>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user._id !== session?.userId && (
                    <DeleteButton
                      action={deleteUser}
                      id={user._id}
                      confirmMessage={`Supprimer l'administrateur ${user.name} ?`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Ajouter un administrateur</h2>
        <UserForm />
      </div>
    </div>
  );
}
