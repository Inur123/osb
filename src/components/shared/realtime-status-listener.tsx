"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Komponen invisible yang memantau perubahan status pendaftaran secara realtime.
 * Menggunakan polling ringan untuk memastikan kompatibilitas penuh dengan Next.js.
 */
export function RealtimeStatusListener() {
  const router = useRouter();
  const lastStatus = useRef<boolean | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/form-status");
        if (!res.ok) return;
        const data = await res.json();
        
        // Hanya refresh jika status berubah
        if (lastStatus.current !== null && lastStatus.current !== data.isFormActive) {
          router.refresh();
        }
        lastStatus.current = data.isFormActive;
      } catch {
        // Silent fail
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [router]);

  return null;
}
