import { Link } from "wouter";
import { Building2, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary backdrop-blur-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Immo<span className="text-secondary">Algérie</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed">
              La plateforme immobilière de référence en Algérie. Trouvez la maison de vos rêves parmi des milliers d'annonces vérifiées.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Liens Rapides</h4>
            <ul className="flex flex-col gap-4 text-primary-foreground/70">
              <li><Link href="/properties?type=sale" className="hover:text-secondary transition-colors">Acheter un bien</Link></li>
              <li><Link href="/properties?type=rent" className="hover:text-secondary transition-colors">Louer un bien</Link></li>
              <li><Link href="/properties?type=commercial" className="hover:text-secondary transition-colors">Immobilier d'entreprise</Link></li>
              <li><Link href="/agents" className="hover:text-secondary transition-colors">Trouver une agence</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">À propos de nous</Link></li>
            </ul>
          </div>

          {/* Villes */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Top Wilayas</h4>
            <ul className="flex flex-col gap-4 text-primary-foreground/70">
              <li><Link href="/properties?wilaya=Alger" className="hover:text-secondary transition-colors">Immobilier à Alger</Link></li>
              <li><Link href="/properties?wilaya=Oran" className="hover:text-secondary transition-colors">Immobilier à Oran</Link></li>
              <li><Link href="/properties?wilaya=Constantine" className="hover:text-secondary transition-colors">Immobilier à Constantine</Link></li>
              <li><Link href="/properties?wilaya=Annaba" className="hover:text-secondary transition-colors">Immobilier à Annaba</Link></li>
              <li><Link href="/properties?wilaya=Bejaia" className="hover:text-secondary transition-colors">Immobilier à Bejaia</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact</h4>
            <ul className="flex flex-col gap-4 text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>123 Boulevard des Martyrs, Alger Centre, Algérie</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span dir="ltr">+213 555 12 34 56</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>contact@immodz.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} ImmoAlgérie. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
