import { Link } from "wouter";
import { MapPin, BedDouble, Bath, Maximize, Heart } from "lucide-react";
import { formatPrice, formatArea } from "@/lib/format";
import type { Property } from "@workspace/api-client-react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Use a nice placeholder if no images
  {/* fallback property placeholder */}
  const defaultImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
  const mainImage = property.images && property.images.length > 0 ? property.images[0] : defaultImage;

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-primary text-white';
      case 'rent': return 'bg-secondary text-secondary-foreground';
      case 'commercial': return 'bg-blue-600 text-white';
      default: return 'bg-gray-800 text-white';
    }
  };

  const getBadgeText = (type: string) => {
    switch (type) {
      case 'sale': return 'À Vendre';
      case 'rent': return 'À Louer';
      case 'commercial': return 'Commercial';
      default: return type;
    }
  };

  return (
    <Link href={`/properties/${property.id}`} className="group block h-full">
      <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
        {/* Image Box */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={mainImage} 
            alt={property.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${getBadgeColor(property.type)}`}>
              {getBadgeText(property.type)}
            </span>
            {property.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-primary shadow-sm">
                En Vedette
              </span>
            )}
          </div>

          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>

          {/* Price */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-2xl font-bold text-white drop-shadow-md">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{property.commune}, {property.wilaya}</span>
          </div>

          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-muted-foreground text-sm">
            <div className="flex items-center gap-1.5" title="Chambres">
              <BedDouble className="w-4 h-4" />
              <span>{property.bedrooms || property.rooms || 0}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Salles de bain">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms || 1}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Surface">
              <Maximize className="w-4 h-4" />
              <span>{formatArea(property.area)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
