"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import OSBLogo from "@/components/shared/osb-logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Login Gagal", {
          description: "Email atau password yang Anda masukkan salah.",
        });
      } else {
        toast.success("Login Berhasil", {
          description: "Selamat datang kembali, Admin!",
        });
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      toast.error("Kesalahan Sistem", {
        description: "Terjadi kesalahan saat mencoba masuk.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ipnu-50/20 flex flex-col items-center justify-center p-6">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ipnu-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ipnu-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="mb-6 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <OSBLogo />
        <div className="text-center">
          <p className="text-lg font-black text-gray-900 leading-none tracking-tighter uppercase">OSB</p>
          <p className="text-[9px] font-bold text-ipnu-600 uppercase tracking-widest mt-0.5">Admin Dashboard</p>
        </div>
      </div>

      <Card className="w-full max-w-[400px] border-gray-100 shadow-2xl shadow-ipnu-900/5 rounded-[32px] overflow-hidden bg-white animate-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 pb-4 pt-8 text-center bg-white px-8">
          <CardTitle className="text-2xl font-black text-gray-900">Login Admin</CardTitle>
          <CardDescription className="text-gray-400 font-medium text-sm">
            Masukkan kredensial untuk mengelola data
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8 px-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-gray-600 ml-1 uppercase tracking-wider">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@osb-magetan.org"
                  className="pl-11 h-12 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-ipnu-500 transition-all font-medium text-sm text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold text-gray-600 ml-1 uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 h-12 rounded-2xl border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-ipnu-500 transition-all text-sm text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ipnu-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 rounded-2xl bg-ipnu-600 hover:bg-ipnu-700 text-white font-black text-sm shadow-lg shadow-ipnu-600/20 transition-all active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Masuk Sekarang"
                )}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-[10px] text-gray-300 font-bold uppercase tracking-widest text-center">
            &copy; 2025 PC IPNU IPPNU Magetan
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
