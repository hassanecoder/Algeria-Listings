import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Notre équipe vous répondra dans les 24 heures.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <div className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Contactez-nous</h1>
              <p className="text-xl text-muted-foreground">Une question ? Un projet ? Notre équipe est à votre écoute.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Téléphone</h3>
                <p className="text-muted-foreground mb-1">+213 555 12 34 56</p>
                <p className="text-sm text-muted-foreground">Lun - Sam, 9h - 18h</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground mb-1">contact@immodz.com</p>
                <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Bureau</h3>
                <p className="text-muted-foreground">123 Blvd des Martyrs</p>
                <p className="text-sm text-muted-foreground">Alger Centre, Algérie</p>
              </div>
            </div>

            <div className="bg-white border border-border rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 bg-primary text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img src={`${import.meta.env.BASE_URL}images/pattern-bg.png`} alt="Pattern" className="w-full h-full object-cover invert" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl font-display font-bold mb-4">Envoyez un message</h2>
                    <p className="text-white/80 mb-8 leading-relaxed">
                      Remplissez le formulaire ci-contre pour toute demande de partenariat, signalement de problème ou suggestion d'amélioration.
                    </p>
                  </div>
                  <div className="relative z-10 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="font-semibold mb-2">Agences immobilières :</p>
                    <p className="text-sm text-white/80">Pour rejoindre notre réseau professionnel, veuillez préciser "Partenariat" dans l'objet de votre message.</p>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Prénom</label>
                        <input required type="text" className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Nom</label>
                        <input required type="text" className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">Email</label>
                      <input required type="email" className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">Objet</label>
                      <select required className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none">
                        <option value="">Sélectionnez un sujet</option>
                        <option value="support">Support technique</option>
                        <option value="partenariat">Partenariat / Agence</option>
                        <option value="feedback">Suggestion</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">Message</label>
                      <textarea required rows={5} className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
