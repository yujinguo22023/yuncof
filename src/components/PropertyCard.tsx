
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Property } from "@/lib/mockData";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard = ({ property, featured = false }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean[]>(
    property.images.map(() => false)
  );

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleImageLoad = (index: number) => {
    setIsImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <Link to={`/property/${property.id}`}>
      <div className={`property-card rounded-xl overflow-hidden bg-card border ${featured ? 'shadow-md' : ''}`}>
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                    {!isImageLoaded[index] && (
                      <div className="absolute inset-0 image-loading" />
                    )}
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isImageLoaded[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors" />
            <CarouselNext className="absolute right-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors" />
          </Carousel>

          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background transition-colors ${
              isLiked ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={handleLikeClick}
          >
            <Heart
              className={`h-5 w-5 ${isLiked ? 'fill-primary' : ''}`}
              strokeWidth={isLiked ? 2 : 1.5}
            />
            <span className="sr-only">Like</span>
          </Button>

          {property.host.isSuperhost && (
            <Badge
              variant="outline"
              className="absolute top-3 left-3 bg-background/70 backdrop-blur-sm text-xs"
            >
              Superhost
            </Badge>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium line-clamp-1">{property.title}</h3>
            <div className="flex items-center ml-2">
              <Star className="h-4 w-4 mr-1 text-primary" strokeWidth={1.5} />
              <span className="text-sm">{property.rating}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{property.location}</p>

          <div className="flex justify-between items-center mt-4">
            <p className="font-medium">
              ${property.price} <span className="text-sm font-normal text-muted-foreground">night</span>
            </p>

            <div className="text-sm text-muted-foreground">
              {property.beds} bed{property.beds !== 1 ? 's' : ''} · {property.baths} bath{property.baths !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
