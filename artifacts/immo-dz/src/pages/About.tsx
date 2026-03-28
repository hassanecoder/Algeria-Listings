import { Layout } from "@/components/layout/Layout";
import { CheckCircle2, Target, Eye, Building2 } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/about-hero.png`}
            alt="Luxurious interior" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Moderniser l'immobilier en Algérie</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Nous construisons le pont de confiance entre ceux qui cherchent un foyer et les professionnels de l'immobilier.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Lancée en 2024, ImmoAlgérie est née d'un constat simple : la recherche immobilière en Algérie était trop souvent source de stress, d'opacité et de perte de temps.
                </p>
                <p>
                  Nous avons décidé de créer une plateforme technologique moderne qui met l'accent sur la <strong>qualité des annonces</strong> plutôt que sur la quantité. Fini les photos floues, les prix cachés et les annonces obsolètes.
                </p>
                <p>
                  Aujourd'hui, nous collaborons avec des centaines d'agences agréées à travers les 48 wilayas pour offrir l'expérience immobilière la plus fiable du pays.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full bg-secondary/10 absolute -top-8 -right-8 w-64 h-64 blur-3xl"></div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-xl relative z-10">
                <Building2 className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
                <p className="text-muted-foreground mb-6">Devenir la référence incontournable de l'immobilier maghrébin en alliant technologie de pointe et expertise locale.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary" /> Innovation continue
                  </li>
                  <li className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary" /> Transparence totale
                  </li>
                  <li className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary" /> Satisfaction client
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-16">Nos Valeurs</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Précision</h3>
              <p className="text-muted-foreground">Nous fournissons des données exactes sur les biens, les prix du marché et les localisations pour des décisions éclairées.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Transparence</h3>
              <p className="text-muted-foreground">Pas de frais cachés. Des relations claires avec les agences partenaires. L'honnêteté est au cœur de notre modèle.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Fiabilité</h3>
              <p className="text-muted-foreground">Un système strict de modération des annonces pour garantir que ce que vous voyez en ligne correspond à la réalité.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
