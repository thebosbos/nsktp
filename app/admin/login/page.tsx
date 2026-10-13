import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h1>Administration NSKTP</h1>
        <LoginForm />
      </div>
    </div>
  );
}
