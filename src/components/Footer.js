import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white px-6 py-6 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-stretch">
        {/* Left: Branding + Contact */}
        <div className="space-y-3 md:max-w-xl">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold whitespace-nowrap">
              Sri Ram Embroidery
            </h3>
            <Link
              href="https://www.instagram.com/shri_ram_designer_blouse/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-200"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100069255315263"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-gray-200"
            >
              <Facebook size={18} />
            </Link>
          </div>

          {/* Address */}
          <Link
            href="https://www.google.com/maps/place/Gandhiram+Homemade+Food/@13.0156989,80.2417275,640m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a5267f172d88c13:0x162b8fc78bb01377!8m2!3d13.0156937!4d80.2443024!16s%2Fg%2F11mv4x1m1p?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200"
            aria-label="Google Maps Location"
          >
            <MapPin size={16} className="shrink-0" />
            9/1, Thulukanathamman Koil St, Duraisamy Nagar, Kotturpuram, Chennai
            - 600085
          </Link>

          {/* Phone */}
          <Link
            href="tel:9962109574"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200"
            aria-label="Call Phone"
          >
            <Phone size={16} className="shrink-0" />
            9962109574
          </Link>
        </div>

        {/* Right: Responsive copyright */}
        <div className="mt-6 md:mt-0 w-full md:w-auto self-center md:self-end text-white/60 text-xs text-center md:text-right">
          &copy; {new Date().getFullYear()} Sri Ram. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
