import { Link } from "wouter";
import { Star, Phone, Mail, Building } from "lucide-react";
import type { Agent } from "@workspace/api-client-react";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  {/* fallback agent profile */}
  const defaultPhoto = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80";
  
  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 text-center group flex flex-col h-full">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img 
          src={agent.photo || defaultPhoto} 
          alt={agent.name} 
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg group-hover:border-primary/20 transition-colors"
        />
        {agent.verified && (
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      <h3 className="font-display font-bold text-xl text-foreground mb-1">{agent.name}</h3>
      <p className="text-primary font-medium text-sm mb-3 flex items-center justify-center gap-1.5">
        <Building className="w-4 h-4" />
        {agent.agency}
      </p>

      <div className="flex items-center justify-center gap-1 mb-4">
        <Star className="w-4 h-4 fill-secondary text-secondary" />
        <span className="font-semibold text-sm">{agent.rating.toFixed(1)}</span>
        <span className="text-muted-foreground text-xs">({agent.reviewCount} avis)</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-6">
        <div className="bg-muted rounded-lg py-2 px-1">
          <span className="block font-bold text-foreground">{agent.listingCount}</span>
          <span className="text-xs">Annonces</span>
        </div>
        <div className="bg-muted rounded-lg py-2 px-1">
          <span className="block font-bold text-foreground">{agent.yearsExperience || 5}</span>
          <span className="text-xs">Années d'exp.</span>
        </div>
      </div>

      <div className="mt-auto flex gap-2">
        <a 
          href={`tel:${agent.phone}`} 
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          <Phone className="w-4 h-4" />
          Appeler
        </a>
        <a 
          href={`mailto:${agent.email}`}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-secondary/10 text-secondary-foreground hover:bg-secondary hover:text-white transition-colors"
          title="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
