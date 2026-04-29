import { MapPin, Mail, Phone, Heart } from "lucide-react";
import { NAV_LINKS, SITE } from "@/app/lib/constants";
import SmoothScrollLink from "@/app/_components/shared/SmoothScrollLink";
import OSBLogo from "@/app/_components/shared/OSBLogo";

export default function Footer() {
  return (
    <footer id="kontak" className="border-t border-gray-100 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <OSBLogo className="w-10 h-10 shadow-lg shadow-ipnu-500/20 rounded-xl" />
              <div>
                <div className="font-bold text-lg text-gray-900">
                  {SITE.name}
                </div>
                <div className="text-[10px] text-ipnu-500 tracking-widest uppercase font-semibold">
                  {SITE.orgShort}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Program {SITE.fullName} {SITE.org}. Mencetak generasi muda NU yang
              berprestasi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Menu</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.id}>
                  <SmoothScrollLink
                    targetId={link.id}
                    className="text-sm text-gray-400 hover:text-ipnu-600 transition-colors"
                  >
                    {link.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-ipnu-500 mt-0.5 shrink-0" />
                <span>{SITE.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-ipnu-500 mt-0.5 shrink-0" />
                <span>{SITE.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-ipnu-500 mt-0.5 shrink-0" />
                <span>Hubungi via WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {SITE.year} {SITE.org}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>Made with</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
            <span>by Departemen OSB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
