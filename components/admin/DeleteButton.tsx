"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  action,
  id,
  confirmMessage = "Confirmer la suppression ?",
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  confirmMessage?: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!confirm(confirmMessage)) return;
    const formData = new FormData();
    formData.set("id", id);
    startTransition(async () => {
      await action(formData);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      className="admin-btn admin-btn-danger"
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? "..." : "Supprimer"}
    </button>
  );
}
