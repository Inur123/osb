"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Komponen invisible yang memantau perubahan data pendaftar secara realtime.
 * Menggunakan polling ringan setiap 5 detik untuk memperbarui dashboard.
 */
export function RealtimeDashboard() {
  const router = useRouter();
  const lastCount = useRef<number | null>(null);

  useEffect(() => {
    const checkData = async () => {
      try {
        const res = await fetch("/api/form-status");
        if (!res.ok) return;
        const data = await res.json();

        // Refresh jika jumlah pendaftar berubah
        if (lastCount.current !== null && lastCount.current !== data.totalPendaftar) {
          router.refresh();
        }
        lastCount.current = data.totalPendaftar;
      } catch {
        // Silent fail
      }
    };

    checkData();
    const interval = setInterval(checkData, 5000);
    return () => clearInterval(interval);
  }, [router]);

  return null;
}
