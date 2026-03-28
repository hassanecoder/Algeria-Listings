import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Wilaya } from "@workspace/api-client-react";

interface WilayaCardProps {
  wilaya: Wilaya;
}

export function WilayaCard({ wilaya }: WilayaCardProps) {
  {/* fallback wilaya image */}
  const defaultImage = "https://images.unsplash.com/photo-1539651044670-315229da9d2f?w=600&q=80";

  return (
    <Link href={`/properties?wilaya=${wilaya.name}`} className="group block relative overflow-hidden rounded-2xl h-80">
      <img 
        src={wilaya.imageUrl || defaultImage} 
        alt={wilaya.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradients for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="self-end bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold border border-white/30 text-sm shadow-lg">
          {wilaya.code}
        </div>
        
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-display font-bold text-white drop-shadow-md mb-1">{wilaya.name}</h3>
              <p className="text-white/80 font-arabic text-lg" dir="rtl">{wilaya.nameAr}</p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <div>
              <span className="block text-secondary text-lg font-bold">{wilaya.propertyCount}</span>
              Biens
            </div>
            {wilaya.avgPriceSale && (
              <div>
                <span className="block text-white text-lg font-bold">{wilaya.avgPriceSale}M</span>
                Prix moyen
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
