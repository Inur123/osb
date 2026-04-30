"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { toggleFormStatus } from "@/app/actions/settings-actions";

interface PeriodToggleProps {
  initialState: boolean;
}

export function PeriodToggle({ initialState }: PeriodToggleProps) {
  const [isActive, setIsActive] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await toggleFormStatus(!isActive);
      if (res.success) {
        setIsActive(!isActive);
        toast.success(!isActive ? "Pendaftaran Berhasil Dibuka" : "Pendaftaran Berhasil Ditutup", {
          description: !isActive ? "Calon peserta sekarang bisa mendaftar." : "Formulir pendaftaran sekarang tidak dapat diakses.",
        });
      } else {
        toast.error("Gagal mengubah status pendaftaran");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
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
