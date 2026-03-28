import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, MapPin, Home as HomeIcon, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { useGetFeaturedProperties, useGetStats } from "@workspace/api-client-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchType, setSearchType] = useState("sale");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchWilaya, setSearchWilaya] = useState("");

  const { data: featuredData, isLoading: isLoadingFeatured } = useGetFeaturedProperties();
  const { data: statsData } = useGetStats();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchType) params.append("type", searchType);
    if (searchQuery) params.append("search", searchQuery);
    if (searchWilaya) params.append("wilaya", searchWilaya);
    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-algiers.png`}
            alt="Algiers Bay" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
                Trouvez la maison <br/>
                de vos <span className="text-secondary">rêves</span> en Algérie
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
                La première plateforme immobilière avec des annonces vérifiées, des visites virtuelles et un accompagnement de A à Z.
              </p>
            </motion.div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-4 md:p-6"
            >
              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-border/20 pb-2">
                <button 
                  onClick={() => setSearchType("sale")}
                  className={`pb-2 font-semibold transition-colors relative ${searchType === "sale" ? "text-primary" : "text-gray-500 hover:text-gray-800"}`}
                >
                  À Vendre
                  {searchType === "sale" && (
                    <motion.div layoutId="searchTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button 
                  onClick={() => setSearchType("rent")}
                  className={`pb-2 font-semibold transition-colors relative ${searchType === "rent" ? "text-primary" : "text-gray-500 hover:text-gray-800"}`}
                >
                  À Louer
                  {searchType === "rent" && (
                    <motion.div layoutId="searchTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              </div>

              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Wilaya ou Commune..." 
                    value={searchWilaya}
                    onChange={(e) => setSearchWilaya(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="flex-1 relative">
                  <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <select 
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  >
                    <option value="">Type de bien</option>
                    <option value="apartment">Appartement</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                    <option value="land">Terrain</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="md:w-auto w-full px-8 py-4 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  <Search className="w-5 h-5" />
                  Rechercher
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={`${import.meta.env.BASE_URL}images/pattern-bg.png`} alt="Pattern" className="w-full h-full object-cover invert" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">
                {statsData ? statsData.totalListings.toLocaleString() : "10k+"}
              </p>
              <p className="text-sm font-medium text-white/80">Biens Disponibles</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">
                {statsData ? statsData.totalAgents.toLocaleString() : "500+"}
              </p>
              <p className="text-sm font-medium text-white/80">Agences Partenaires</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">
                {statsData ? statsData.totalWilayas : "48"}
              </p>
              <p className="text-sm font-medium text-white/80">Wilayas Couvertes</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">24/7</p>
              <p className="text-sm font-medium text-white/80">Support Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">Biens d'Exception</h2>
              <p className="text-muted-foreground max-w-2xl">Découvrez notre sélection exclusive des meilleures propriétés du moment en Algérie.</p>
            </div>
            <Link href="/properties" className="mt-4 md:mt-0 text-primary font-semibold hover:text-primary/80 flex items-center gap-1 group">
              Voir toutes les annonces
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : featuredData?.properties && featuredData.properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredData.properties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-2xl">
              <p className="text-muted-foreground">Aucun bien en vedette pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Pourquoi choisir ImmoAlgérie ?</h2>
            <p className="text-muted-foreground">Nous redéfinissons l'expérience immobilière en Algérie avec des outils modernes et une transparence totale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Annonces Vérifiées</h3>
              <p className="text-muted-foreground">Chaque annonce est minutieusement vérifiée par notre équipe pour éviter les arnaques et doublons.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Données du Marché</h3>
              <p className="text-muted-foreground">Accédez aux vrais prix du marché pour acheter ou vendre au juste prix en toute confiance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Réseau d'Experts</h3>
              <p className="text-muted-foreground">Mise en relation directe avec les meilleures agences et agents immobiliers de votre région.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-20">
           <img src={`${import.meta.env.BASE_URL}images/pattern-bg.png`} alt="Pattern" className="w-full h-full object-cover invert" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Prêt à trouver votre nouveau foyer ?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Parcourez nos listes ou contactez un agent pour vous aider dans votre recherche.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/properties" className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all">
              Explorer les biens
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-lg hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
