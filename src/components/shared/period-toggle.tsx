"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { togglePeriodeStatus } from "@/app/actions/periode-actions";
import { Periode } from "@prisma/client";

interface PeriodToggleProps {
  activePeriode: Periode | null;
}

export function PeriodToggle({ activePeriode }: PeriodToggleProps) {
  const [isActive, setIsActive] = useState(!!activePeriode);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (!activePeriode && !isActive) {
      toast.error("Tidak ada periode yang bisa diaktifkan. Silakan buat periode baru.");
      return;
    }

    setLoading(true);
    try {
      // Jika activePeriode null tapi kita coba toggle ke true, ini butuh ID.
      // Untuk kesederhanaan, kita asumsikan ID p2025 dari seeder jika null.
      const id = activePeriode?.id || "p2025"; 
      await togglePeriodeStatus(id, !isActive);
      setIsActive(!isActive);
      toast.success(isActive ? "Pendaftaran Berhasil Ditutup" : "Pendaftaran Berhasil Dibuka", {
        description: isActive ? "Formulir pendaftaran sekarang tidak dapat diakses." : "Calon peserta sekarang bisa mendaftar.",
      });
    } catch (error) {
      toast.error("Gagal mengubah status pendaftaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between sm:justify-start space-x-2 bg-card border rounded-2xl sm:rounded-full px-4 py-3 sm:py-2 shadow-sm w-full sm:w-auto">
      <Label htmlFor="registration-mode" className="text-sm font-medium cursor-pointer">
        {isActive ? "Pendaftaran Terbuka" : "Pendaftaran Tertutup"}
      </Label>
      <Switch
        id="registration-mode"
        checked={isActive}
        onCheckedChange={handleToggle}
        disabled={loading}
      />
    </div>
  );
}
