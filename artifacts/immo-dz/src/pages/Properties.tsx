import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { useListProperties } from "@workspace/api-client-react";
import { Filter, SlidersHorizontal, ChevronDown, X } from "lucide-react";

export default function Properties() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  // State from URL or defaults
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || "",
    category: searchParams.get('category') || "",
    wilaya: searchParams.get('wilaya') || "",
    search: searchParams.get('search') || "",
    minPrice: searchParams.get('minPrice') || "",
    maxPrice: searchParams.get('maxPrice') || "",
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse filters for API
  const apiParams = {
    ...(filters.type && { type: filters.type as any }),
    ...(filters.category && { category: filters.category as any }),
    ...(filters.wilaya && { wilaya: filters.wilaya }),
    ...(filters.search && { search: filters.search }),
    ...(filters.minPrice && { minPrice: Number(filters.minPrice) }),
    ...(filters.maxPrice && { maxPrice: Number(filters.maxPrice) }),
  };

  const { data, isLoading, isError } = useListProperties(apiParams);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ type: "", category: "", wilaya: "", search: "", minPrice: "", maxPrice: "" });
  };

  return (
    <Layout>
      <div className="bg-muted/30 pt-28 pb-12 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Immobilier en Algérie</h1>
              <p className="text-muted-foreground mt-2">
                {data?.total ? `${data.total} biens trouvés` : "Recherche de biens..."}
              </p>
            </div>
            
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-border rounded-xl font-medium shadow-sm"
            >
              <Filter className="w-4 h-4" />
              Filtres
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`
              ${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden md:block w-72 shrink-0'}
            `}>
              <div className="sticky top-28 bg-white p-6 rounded-2xl border border-border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                    Filtres
                  </h3>
                  {isMobileFiltersOpen && (
                    <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Transaction Type */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Type de transaction</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['sale', 'rent'].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleFilterChange('type', filters.type === type ? "" : type)}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors border ${
                            filters.type === type 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-transparent border-border hover:border-primary/50 text-foreground'
                          }`}
                        >
                          {type === 'sale' ? 'Achat' : 'Location'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Catégorie</label>
                    <select 
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="">Tous les types</option>
                      <option value="apartment">Appartement</option>
                      <option value="villa">Villa</option>
                      <option value="house">Maison</option>
                      <option value="commercial">Local Commercial</option>
                      <option value="land">Terrain</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Wilaya</label>
                    <select 
                      value={filters.wilaya}
                      onChange={(e) => handleFilterChange('wilaya', e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="">Toute l'Algérie</option>
                      <option value="Alger">Alger</option>
                      <option value="Oran">Oran</option>
                      <option value="Constantine">Constantine</option>
                      <option value="Annaba">Annaba</option>
                      <option value="Bejaia">Bejaia</option>
                      <option value="Blida">Blida</option>
                      <option value="Tizi Ouzou">Tizi Ouzou</option>
                      <option value="Tlemcen">Tlemcen</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Budget (DZD)</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Min" 
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      />
                      <input 
                        type="number" 
                        placeholder="Max" 
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={clearFilters}
                    className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Effacer les filtres
                  </button>

                  {isMobileFiltersOpen && (
                    <button 
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="w-full py-3 bg-primary text-white rounded-xl font-bold"
                    >
                      Appliquer
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <main className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-96 bg-white border border-border/50 animate-pulse rounded-2xl" />
                  ))}
                </div>
              ) : isError ? (
                <div className="bg-destructive/10 text-destructive p-6 rounded-2xl text-center">
                  Une erreur est survenue lors du chargement des annonces.
                </div>
              ) : data?.properties.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-border shadow-sm flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Aucun résultat trouvé</h3>
                  <p className="text-muted-foreground mb-6">Modifiez vos critères de recherche pour trouver plus de biens.</p>
                  <button onClick={clearFilters} className="px-6 py-2 bg-primary text-white rounded-xl font-medium">
                    Réinitialiser
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data?.properties.map(property => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                  
                  {/* Pagination placeholder */}
                  {data && data.total > (data.limit || 10) && (
                    <div className="mt-12 flex justify-center gap-2">
                      <button className="px-4 py-2 border border-border rounded-lg bg-white hover:bg-muted font-medium">Précédent</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-white hover:bg-muted">2</button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-white hover:bg-muted">3</button>
                      <button className="px-4 py-2 border border-border rounded-lg bg-white hover:bg-muted font-medium">Suivant</button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
