import { Layout } from "@/components/layout/Layout";
import { AgentCard } from "@/components/AgentCard";
import { useListAgents } from "@workspace/api-client-react";
import { Search, Users } from "lucide-react";

export default function Agents() {
  const { data: agents, isLoading } = useListAgents();

  return (
    <Layout>
      <div className="bg-muted/30 pt-28 pb-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Trouvez un expert local</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Nos agents immobiliers vérifiés sont là pour vous accompagner dans votre projet d'achat ou de location.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input 
                type="text" 
                placeholder="Rechercher par nom ou agence..." 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-80 bg-white border border-border animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : agents && agents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-border rounded-2xl shadow-sm">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Aucun agent trouvé</h2>
              <p className="text-muted-foreground">Nous n'avons pas d'agents à afficher pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
