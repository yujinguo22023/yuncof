
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  Star, 
  Share, 
  Heart, 
  MapPin, 
  Users, 
  Home, 
  Bed, 
  Bath, 
  Coffee, 
  Wifi, 
  Car, 
  Tv, 
  Utensils,
  CalendarDays,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Property, getPropertyById } from "@/lib/mockData";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | undefined>(
    id ? getPropertyById(id) : undefined
  );
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't find the property you're looking for.
        </p>
        <Button onClick={() => navigate("/listings")}>
          View All Properties
        </Button>
      </div>
    );
  }

  // Map amenity names to icons
  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Wifi": <Wifi className="h-5 w-5" />,
      "Kitchen": <Utensils className="h-5 w-5" />,
      "Free parking": <Car className="h-5 w-5" />,
      "TV": <Tv className="h-5 w-5" />,
      "Air conditioning": <Coffee className="h-5 w-5" />,
      "Pool": <Bath className="h-5 w-5" />,
      "Washer": <Bath className="h-5 w-5" />,
      "Dryer": <Bath className="h-5 w-5" />,
    };

    return iconMap[amenity] || <Home className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
      {/* Back button (mobile) */}
      <Button
        variant="ghost"
        size="icon"
        className="mb-4 rounded-full md:hidden"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </Button>

      {/* Property title section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{property.title}</h1>
          <div className="flex items-center mt-2 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-primary mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="mx-1.5">·</span>
              <span className="text-muted-foreground">{property.reviewCount} reviews</span>
            </div>
            <span className="mx-1.5">·</span>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>
        </div>

        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full ${isLiked ? 'text-primary border-primary' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-4 w-4 mr-2 ${isLiked ? 'fill-primary' : ''}`}
              strokeWidth={isLiked ? 2 : 1.5}
            />
            Save
          </Button>
        </div>
      </div>

      {/* Image gallery */}
      <div className="mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {property.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors" />
          <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors" />
        </Carousel>
      </div>

      {/* Main content and booking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Host info */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Hosted by {property.host.name}
              </h2>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span>{property.guests} guests</span>
                <span className="mx-1.5">·</span>
                <span>{property.beds} beds</span>
                <span className="mx-1.5">·</span>
                <span>{property.baths} baths</span>
              </div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={property.host.image} alt={property.host.name} />
                <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {property.host.isSuperhost && (
                <Badge variant="outline" className="ml-2">
                  Superhost
                </Badge>
              )}
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">About this place</h3>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>

          <Separator className="mb-6" />

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.amenities.slice(0, 8).map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            {property.amenities.length > 8 && (
              <Button variant="outline" className="mt-4 rounded-full">
                Show all {property.amenities.length} amenities
              </Button>
            )}
          </div>
        </div>

        {/* Booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-2xl font-semibold">${property.price}</span>
                <span className="text-muted-foreground"> night</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-primary mr-1" />
                <span>{property.rating}</span>
                <span className="mx-1 text-muted-foreground">·</span>
                <span className="text-muted-foreground underline">
                  {property.reviewCount} reviews
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="col-span-2 border rounded-t-lg p-3">
                <div className="text-xs font-medium mb-1">DATES</div>
                <div className="flex justify-between items-center">
                  <span>Add dates</span>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="border-x border-b rounded-bl-lg p-3">
                <div className="text-xs font-medium mb-1">CHECK-IN</div>
                <div>Add date</div>
              </div>
              <div className="border-x border-b rounded-br-lg p-3">
                <div className="text-xs font-medium mb-1">CHECKOUT</div>
                <div>Add date</div>
              </div>
              <div className="col-span-2 border rounded-lg mt-2 p-3">
                <div className="text-xs font-medium mb-1">GUESTS</div>
                <div className="flex justify-between items-center">
                  <span>1 guest</span>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <Button className="w-full mb-4">Reserve</Button>

            <div className="text-center text-sm text-muted-foreground mb-4">
              You won't be charged yet
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="underline">${property.price} x 5 nights</span>
                <span>${property.price * 5}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Cleaning fee</span>
                <span>$75</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Service fee</span>
                <span>$176</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total before taxes</span>
                <span>${property.price * 5 + 75 + 176}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
