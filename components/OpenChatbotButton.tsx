"use client";

export default function OpenChatbotButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new Event("nsktp:open-chatbot"))}
    >
      {children}
    </button>
  );
}
