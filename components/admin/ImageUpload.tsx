"use client";

import { useRef, useState } from "react";

const MAX_DIMENSION = 1400;
const JPEG_QUALITY = 0.82;

function resizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas non supporté"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.onerror = () => reject(new Error("Image invalide"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({ defaultValue }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDataUri = value.startsWith("data:");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Veuillez choisir un fichier image.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const dataUrl = await resizeImageFile(file);
      setValue(dataUrl);
    } catch {
      setError("Impossible de traiter cette image.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="admin-field">
      <label>Image du projet</label>
      <input type="hidden" name="image" value={value} required />

      {value && (
        <div className="admin-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Aperçu" />
        </div>
      )}

      <div className="admin-image-inputs">
        <input
          type="text"
          placeholder="Coller une URL d'image..."
          value={isDataUri ? "" : value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
        >
          {loading ? "Traitement..." : "Importer depuis mon ordinateur"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </div>

      {error && <span className="admin-error">{error}</span>}
      <span className="admin-hint">
        Collez une URL ou importez une image depuis votre ordinateur (redimensionnée automatiquement).
      </span>
    </div>
  );
}
