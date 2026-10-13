"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  type: "bot" | "user";
}

function getBotResponse(message: string): string {
  const m = message.toLowerCase();

  if (m.includes("voirie") || m.includes("route") || m.includes("chaussée")) {
    return "Pour la voirie, nous réalisons création et réhabilitation de routes, couches de forme, enrobés et signalisation. Souhaitez-vous un devis ?";
  } else if (m.includes("vrd") || m.includes("terrassement") || m.includes("plateforme")) {
    return "Nous prenons en charge terrassements, plateformes, réseaux secs et humides, et aménagements de voirie. Voulez-vous être rappelé par un conducteur de travaux ?";
  } else if (m.includes("génie") || m.includes("genie") || m.includes("béton") || m.includes("ouvrage")) {
    return "Côté génie civil, nous exécutons ouvrages en béton, dalots, murs de soutènement et petits ouvrages d'art. Quel type d'ouvrage prévoyez-vous ?";
  } else if (m.includes("assainissement") || m.includes("réseau") || m.includes("reseau") || m.includes("eau")) {
    return "Nous posons et réhabilitons les réseaux d'assainissement, d'eau potable et de drainage, avec contrôles et récolements. Avez-vous un plan de réseau ?";
  } else if (m.includes("bonjour") || m.includes("salut")) {
    return "Bonjour ! Je suis l'assistant NSKTP. Décrivez votre chantier et je vous orienterai vers le bon interlocuteur.";
  } else if (m.includes("devis") || m.includes("prix") || m.includes("tarif")) {
    return "Pour un devis, le plus simple est de décrire le chantier (nature des travaux, localisation, délais). Un conducteur de travaux vous recontacte. Souhaitez-vous ouvrir le formulaire ?";
  } else if (m.includes("contact") || m.includes("téléphone") || m.includes("mail")) {
    return "Vous pouvez nous écrire via la page Contact ou par email. Un conducteur de travaux vous répond rapidement.";
  }
  return "Merci pour votre message. Pouvez-vous préciser votre projet ? (voirie, VRD, génie civil, assainissement)";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Bonjour. Je suis l'assistant NSKTP. Décrivez votre chantier.", type: "bot" },
  ]);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("nsktp:open-chatbot", handler);
    return () => window.removeEventListener("nsktp:open-chatbot", handler);
  }, []);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    });
  }

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { text, type: "user" }]);
    setInput("");
    scrollToBottom();
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getBotResponse(text), type: "bot" }]);
      scrollToBottom();
    }, 1000);
  }

  return (
    <div className="chatbot-container" id="chatbotContainer">
      <div className="chatbot-toggle" id="chatbotToggle" onClick={() => setOpen((v) => !v)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div className={`chatbot-window${open ? " active" : ""}`} id="chatbotWindow">
        <div className="chatbot-header">
          <h4>Assistant NSKTP</h4>
          <button className="chatbot-close" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <div className="chatbot-messages" id="chatbotMessages" ref={messagesRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-message ${msg.type}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Tapez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={sendMessage}>→</button>
        </div>
      </div>
    </div>
  );
}
