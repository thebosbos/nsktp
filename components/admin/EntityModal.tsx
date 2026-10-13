"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function EntityModal({
  trigger,
  triggerClassName = "admin-btn",
  title,
  action,
  submitLabel = "Enregistrer",
  children,
}: {
  trigger: React.ReactNode;
  triggerClassName?: string;
  title: string;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await action(formData);
      router.refresh();
      setOpen(false);
    });
  }

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {trigger}
      </button>
      <dialog ref={dialogRef} className="admin-modal" onClose={() => setOpen(false)}>
        <div className="admin-modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="admin-modal-close"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="admin-form admin-modal-form">
          {children}
          <button type="submit" className="admin-btn" disabled={pending}>
            {pending ? "Enregistrement..." : submitLabel}
          </button>
        </form>
      </dialog>
    </>
  );
}
