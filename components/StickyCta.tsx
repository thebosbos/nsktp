"use client";

import { useEffect, useState } from "react";

export default function StickyCta({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.innerWidth <= 768 && window.scrollY > 300);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`sticky-cta-mobile${visible ? " active" : ""}`}>
      <a href={href} className="sticky-cta-btn">
        {label}
      </a>
    </div>
  );
}
