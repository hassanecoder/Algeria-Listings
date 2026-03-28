import { Layout } from "@/components/layout/Layout";
import { WilayaCard } from "@/components/WilayaCard";
import { useListWilayas } from "@workspace/api-client-react";
import { Map } from "lucide-react";

export default function Wilayas() {
  const { data: wilayas, isLoading } = useListWilayas();

  return (
    <Layout>
      <div className="bg-background pt-28 pb-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Guide des Wilayas</h1>
            <p className="text-xl text-muted-foreground">
              Découvrez le marché immobilier dans chaque région d'Algérie. Statistiques, prix moyens et biens disponibles.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : wilayas && wilayas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wilayas.map((wilaya) => (
                <WilayaCard key={wilaya.id} wilaya={wilaya} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-border rounded-2xl shadow-sm">
              <Map className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Aucune donnée disponible</h2>
              <p className="text-muted-foreground">Les données des wilayas ne sont pas accessibles pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
