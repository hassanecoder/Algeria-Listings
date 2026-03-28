import { useState } from "react";
import { useParams } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useGetProperty, useCreateInquiry } from "@workspace/api-client-react";
import { formatPrice, formatArea } from "@/lib/format";
import { MapPin, BedDouble, Bath, Maximize, Calendar, Check, Share2, Heart, Shield, Phone, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const inquirySchema = z.object({
  name: z.string().min(2, "Nom requis"),
  phone: z.string().min(8, "Numéro valide requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  message: z.string().min(10, "Message trop court"),
  inquiryType: z.enum(["visit", "info", "offer"])
});

export default function PropertyDetail() {
  const { id } = useParams();
  const propertyId = Number(id);
  const { data: property, isLoading, isError } = useGetProperty(propertyId);
  const createInquiry = useCreateInquiry();
  const { toast } = useToast();
  
  const [activeImage, setActiveImage] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      inquiryType: "info",
      message: "Bonjour, je suis intéressé par ce bien. Merci de me recontacter."
    }
  });

  const onSubmit = (data: z.infer<typeof inquirySchema>) => {
    createInquiry.mutate(
      { data: { ...data, propertyId } },
      {
        onSuccess: () => {
          toast({
            title: "Demande envoyée !",
            description: "L'agent vous contactera dans les plus brefs délais.",
          });
          reset();
        },
        onError: () => {
          toast({
            title: "Erreur",
            description: "Impossible d'envoyer la demande.",
            variant: "destructive"
          });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-28 pb-20 animate-pulse">
          <div className="h-8 bg-muted w-1/3 rounded mb-4"></div>
          <div className="h-[50vh] bg-muted rounded-2xl mb-8"></div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="h-6 bg-muted w-1/2 rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
            <div className="h-96 bg-muted rounded-2xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold">Bien introuvable</h1>
          <p className="mt-4 text-muted-foreground">Cette annonce n'existe plus ou a été retirée.</p>
        </div>
      </Layout>
    );
  }

  const images = property.images?.length > 0 ? property.images : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
  ];

  return (
    <Layout>
      <div className="bg-background pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <span className="hover:text-primary cursor-pointer">Accueil</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="hover:text-primary cursor-pointer">Vente</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="hover:text-primary cursor-pointer">{property.wilaya}</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{property.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wide rounded-md">
                  {property.type === 'sale' ? 'À Vendre' : property.type === 'rent' ? 'À Louer' : 'Commercial'}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-md capitalize">
                  {property.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground text-lg">
                <MapPin className="w-5 h-5 text-primary" />
                {property.commune}, {property.wilaya}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <div className="text-4xl font-bold text-primary">
                {formatPrice(property.price)}
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border shadow-sm hover:bg-muted transition-colors font-medium">
                  <Share2 className="w-4 h-4" /> Partager
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border shadow-sm hover:text-red-500 hover:border-red-200 transition-colors font-medium">
                  <Heart className="w-4 h-4" /> Favori
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[50vh] md:h-[60vh]">
            <div className="md:col-span-3 relative h-full rounded-2xl overflow-hidden group">
              <img 
                src={images[activeImage]} 
                alt="Main" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="hidden md:flex flex-col gap-4 h-full">
              {images.slice(0, 3).map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`flex-1 relative rounded-xl overflow-hidden ${activeImage === idx ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  {activeImage !== idx && <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />}
                </button>
              ))}
              {images.length > 3 && (
                <button 
                  onClick={() => setActiveImage(3)} // Simplified logic
                  className="flex-1 relative rounded-xl overflow-hidden bg-black group"
                >
                  <img src={images[3]} alt="More" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    +{images.length - 3} photos
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Key Features Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-border rounded-2xl shadow-sm">
                <div className="flex flex-col items-center justify-center p-2 text-center border-r border-border/50 last:border-0">
                  <Maximize className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xl font-bold">{formatArea(property.area)}</span>
                  <span className="text-sm text-muted-foreground">Surface</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center border-r border-border/50 last:border-0">
                  <BedDouble className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xl font-bold">{property.rooms || '-'}</span>
                  <span className="text-sm text-muted-foreground">Pièces</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center border-r border-border/50 last:border-0">
                  <Bath className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xl font-bold">{property.bathrooms || '-'}</span>
                  <span className="text-sm text-muted-foreground">Salles de bain</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <Calendar className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xl font-bold">{property.yearBuilt || '-'}</span>
                  <span className="text-sm text-muted-foreground">Année</span>
                </div>
              </div>

              {/* Description */}
              <section>
                <h2 className="text-2xl font-display font-bold mb-4">Description</h2>
                <div className="prose max-w-none text-muted-foreground leading-relaxed">
                  <p>{property.description || "Aucune description fournie pour ce bien."}</p>
                  {property.descriptionAr && (
                    <p dir="rtl" className="font-arabic mt-4">{property.descriptionAr}</p>
                  )}
                </div>
              </section>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <section>
                  <h2 className="text-2xl font-display font-bold mb-4">Commodités & Équipements</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-foreground">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Location Map Placeholder */}
              <section>
                <h2 className="text-2xl font-display font-bold mb-4">Emplacement</h2>
                <div className="w-full h-80 bg-muted rounded-2xl border border-border relative overflow-hidden flex items-center justify-center">
                  {/* Pseudo Map */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent" style={{ backgroundImage: 'radial-gradient(#e5e7eb 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                  <div className="text-center z-10 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white">
                    <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="font-bold text-lg">{property.wilaya}</p>
                    <p className="text-muted-foreground">{property.commune}</p>
                    <p className="text-xs text-muted-foreground mt-2">Carte interactive désactivée</p>
                  </div>
                </div>
              </section>

            </div>

            {/* Right Column - Agent & Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-border rounded-2xl shadow-xl overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-primary to-emerald-400"></div>
                
                <div className="p-6">
                  {/* Agent Info */}
                  {property.agent ? (
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                      <img 
                        src={property.agent.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80"} 
                        alt="Agent" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{property.agent.name}</h3>
                        <p className="text-sm text-primary font-medium mb-1">{property.agent.agency}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Shield className="w-3 h-3 text-green-500" />
                          Agent vérifié
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 pb-6 border-b border-border">
                      <h3 className="font-bold text-lg">Contacter l'agence</h3>
                      <p className="text-sm text-muted-foreground">Référence: #{property.id}</p>
                    </div>
                  )}

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h4 className="font-semibold text-foreground mb-4">Demande d'information</h4>
                    
                    <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-xl mb-4">
                      {["info", "visit", "offer"].map((type) => (
                        <label key={type} className={`cursor-pointer text-center py-2 text-sm font-medium rounded-lg transition-colors ${
                          // @ts-ignore
                          register("inquiryType").value === type ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`}>
                          <input type="radio" value={type} {...register("inquiryType")} className="hidden" />
                          {type === 'info' ? 'Info' : type === 'visit' ? 'Visite' : 'Offre'}
                        </label>
                      ))}
                    </div>

                    <div>
                      <input 
                        type="text" 
                        placeholder="Nom complet *" 
                        className={`w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none ${errors.name ? 'border-red-500' : 'border-border'}`}
                        {...register("name")}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <input 
                        type="tel" 
                        placeholder="Téléphone *" 
                        className={`w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none ${errors.phone ? 'border-red-500' : 'border-border'}`}
                        {...register("phone")}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <input 
                        type="email" 
                        placeholder="Email (optionnel)" 
                        className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                        {...register("email")}
                      />
                    </div>

                    <div>
                      <textarea 
                        placeholder="Votre message *" 
                        rows={4}
                        className={`w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none resize-none ${errors.message ? 'border-red-500' : 'border-border'}`}
                        {...register("message")}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button 
                      type="submit"
                      disabled={createInquiry.isPending}
                      className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                      {createInquiry.isPending ? "Envoi..." : "Envoyer la demande"}
                    </button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      En soumettant ce formulaire, j'accepte les conditions d'utilisation d'ImmoAlgérie.
                    </p>
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
