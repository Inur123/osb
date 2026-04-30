"use client";

import { useCallback, useRef } from "react";

interface SmoothScrollLinkProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Scroll ke section tanpa menambahkan # ke URL.
 * Menggunakan <button> agar URL tidak pernah berubah di iOS.
 */
export default function SmoothScrollLink({
  targetId,
  children,
  className = "",
  onClick,
}: SmoothScrollLinkProps) {
  const isScrolling = useRef(false);

  const handleClick = useCallback(() => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    onClick?.();

    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = 70;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
        window.history.replaceState(null, "", window.location.pathname);
      }
      isScrolling.current = false;
    }, 50);
  }, [targetId, onClick]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      // JANGAN tambahkan inline style apapun di sini
      // agar class seperti btn-primary tidak tertimpa
      data-smooth-scroll={targetId}
    >
      {children}
    </button>
  );
}
