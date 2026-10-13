"use client";

import { useActionState } from "react";
import { createUser, type UserFormState } from "@/lib/actions/users";

const initialState: UserFormState = {};

export default function UserForm() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction} className="admin-form">
      <div className="admin-form-row">
        <div className="admin-field">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
      </div>
      <div className="admin-field">
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" required minLength={8} />
        <span className="admin-hint">8 caractères minimum.</span>
      </div>
      {state.error && <p className="admin-error">{state.error}</p>}
      <button type="submit" className="admin-btn" disabled={pending}>
        {pending ? "Création..." : "Ajouter l'administrateur"}
      </button>
    </form>
  );
}
