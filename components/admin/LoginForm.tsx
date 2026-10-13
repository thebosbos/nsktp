"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="admin-form">
      <div className="admin-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required autoFocus />
      </div>
      <div className="admin-field">
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" required />
      </div>
      {state.error && <p className="admin-error">{state.error}</p>}
      <button type="submit" className="admin-btn" disabled={pending}>
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
