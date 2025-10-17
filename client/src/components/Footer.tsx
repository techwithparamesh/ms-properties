import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";
import { SOCIAL_LINKS } from "@shared/social";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-lg">Dream Dwellings</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted partner in finding the perfect property in Tirupati.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties" data-testid="link-footer-properties">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    Browse Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blogs" data-testid="link-footer-blogs">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    Our Blog
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" data-testid="link-footer-dashboard">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    List Property
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities We Serve */}
          <div>
            <h3 className="font-semibold mb-4">Cities We Serve</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Tirupati</li>
              {/* Removed Kadapa */}
            </ul>
          </div>

          {/* Contact & Follow Us - Side by Side */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm text-muted-foreground mb-0">
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 9908547461</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>msproperties96@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>Tirupati, Andhra Pradesh</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="font-semibold mb-4 text-center">Follow Us</h3>
              <div className="flex gap-4 items-center justify-center">
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                  className="flex items-center justify-center rounded-full bg-green-100 hover:bg-green-500 w-10 h-10 transition-colors shadow-md">
                  <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-7 h-7 rounded-full object-cover" onError={e => {e.currentTarget.src='/icons/whatsapp.png'; e.currentTarget.alt='WhatsApp icon'}} />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-600 w-10 h-10 transition-colors shadow-md">
                  <img src="/icons/facebook.png" alt="Facebook" className="w-7 h-7 rounded-full object-cover" onError={e => {e.currentTarget.src='/icons/facebook.png'; e.currentTarget.alt='Facebook icon'}} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-400 hover:from-pink-500 hover:to-yellow-500 w-10 h-10 transition-colors shadow-md">
                  <img src="/icons/instagram.png" alt="Instagram" className="w-7 h-7 rounded-full object-cover" onError={e => {e.currentTarget.src='/icons/instagram.png'; e.currentTarget.alt='Instagram icon'}} />
                </a>
                <a href={SOCIAL_LINKS.gmail} target="_blank" rel="noopener noreferrer" aria-label="Gmail"
                  className="flex items-center justify-center rounded-full bg-red-100 hover:bg-red-500 w-10 h-10 transition-colors shadow-md">
                  <img src="/icons/gmail.png" alt="Gmail" className="w-7 h-7 rounded-full object-cover" onError={e => {e.currentTarget.src='/icons/gmail.png'; e.currentTarget.alt='Gmail icon'}} />
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dream Dwellings. All rights reserved.</p>
        </div>
    </footer>
  );
}
