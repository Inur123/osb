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
      
      // Execute onClick (e.g., closing the menu)
      onClick?.();

      // Small delay to ensure menu close animation doesn't interrupt scroll
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          try {
            const navHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
          } catch (err) {
            // Fallback to simple scroll if calculation fails
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }

          // Keep URL clean — no hash
          window.history.replaceState(null, "", window.location.pathname);
        }
      }, 50);
    },
    [targetId, onClick]
  );

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
