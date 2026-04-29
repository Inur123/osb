"use client";

import { useCallback } from "react";

interface SmoothScrollLinkProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A link component that smoothly scrolls to a target element
 * WITHOUT adding # to the URL — keeps the URL clean.
 */
export default function SmoothScrollLink({
  targetId,
  children,
  className = "",
  onClick,
}: SmoothScrollLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        // Keep URL clean — no hash
        window.history.replaceState(null, "", window.location.pathname);
      }

      onClick?.();
    },
    [targetId, onClick],
  );

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
