"use client";

import { useActionState, useRef, useEffect } from "react";
import { submitLead, type LeadFormState } from "@/lib/actions/leads";

const initialState: LeadFormState = {};

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="form-success" role="status">
        <h3>Merci pour votre demande.</h3>
        <p>Nous vous contacterons rapidement.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" ref={formRef} action={formAction}>
      <div className="form-group">
        <label htmlFor="projectType">Type de projet *</label>
        <select id="projectType" name="projectType" required defaultValue="">
          <option value="" disabled>
            Sélectionnez un type
          </option>
          <option value="voirie">Voirie &amp; routes</option>
          <option value="vrd">Terrassement &amp; VRD</option>
          <option value="genie-civil">Génie civil</option>
          <option value="reseaux">Assainissement &amp; réseaux</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Prénom *</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Nom *</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Téléphone *</label>
        <input type="tel" id="phone" name="phone" required />
      </div>
      <div className="form-group">
        <label htmlFor="company">Entreprise / Site</label>
        <input type="text" id="company" name="company" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Décrivez votre projet *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Nature des travaux, localisation, délais, contraintes de circulation, etc."
        ></textarea>
      </div>
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input type="checkbox" name="consent" required />
          <span>J&apos;accepte que mes données soient utilisées pour me recontacter. *</span>
        </label>
      </div>
      {state.error && (
        <p role="alert" style={{ color: "#c0392b", marginBottom: "1rem" }}>
          {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-primary btn-large btn-full" disabled={pending}>
        {pending ? "Envoi..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
