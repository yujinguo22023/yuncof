
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Filter, 
  Building, 
  Castle, 
  Tent, 
  PalmTree, 
  Mountain, 
  Home, 
  Waves,
  Coffee,
  MapPin,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Layout from "@/components/Layout";
import PropertyCard from "@/components/PropertyCard";
import { getAllProperties, searchProperties, Property } from "@/lib/mockData";

const FilterBadge = ({ 
  children, 
  onRemove 
}: { 
  children: React.ReactNode; 
  onRemove: () => void;
}) => (
  <Badge variant="secondary" className="rounded-full">
    <span className="mr-1">{children}</span>
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-4 w-4 rounded-full hover:bg-muted p-0 ml-1" 
      onClick={onRemove}
    >
      <X className="h-3 w-3" />
    </Button>
  </Badge>
);

const PropertyTypeFilter = ({ 
  icon: Icon, 
  label,
  selected,
  onClick
}: { 
  icon: React.ElementType; 
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <Button 
    variant={selected ? "default" : "outline"}
    className="flex flex-col items-center justify-center h-20 rounded-lg"
    onClick={onClick}
  >
    <Icon className="h-6 w-6 mb-1" />
    <span className="text-xs">{label}</span>
  </Button>
);

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter states
  const [location, setLocation] = useState<string>(searchParams.get("location") || "");
  const [guests, setGuests] = useState<number>(
    searchParams.get("guests") ? parseInt(searchParams.get("guests") as string) : 0
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [propertyType, setPropertyType] = useState<string>("");

  const applyFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = searchProperties(
        location || undefined,
        guests || undefined,
        priceRange[0],
        priceRange[1]
      );
      setProperties(filtered);
      setIsLoading(false);
      
      // Update URL params
      const params = new URLSearchParams();
      if (location) params.set("location", location);
      if (guests) params.set("guests", guests.toString());
      if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
      if (priceRange[1] < 1000) params.set("maxPrice", priceRange[1].toString());
      if (propertyType) params.set("type", propertyType);
      
      setSearchParams(params);
    }, 500);
  };

  const clearFilters = () => {
    setLocation("");
    setGuests(0);
    setPriceRange([0, 1000]);
    setPropertyType("");
    setSearchParams({});
  };

  // Handle removing individual filters
  const removeLocationFilter = () => {
    setLocation("");
    const params = new URLSearchParams(searchParams);
    params.delete("location");
    setSearchParams(params);
  };

  const removeGuestsFilter = () => {
    setGuests(0);
    const params = new URLSearchParams(searchParams);
    params.delete("guests");
    setSearchParams(params);
  };

  const removePriceFilter = () => {
    setPriceRange([0, 1000]);
    const params = new URLSearchParams(searchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    setSearchParams(params);
  };

  const removePropertyTypeFilter = () => {
    setPropertyType("");
    const params = new URLSearchParams(searchParams);
    params.delete("type");
    setSearchParams(params);
  };

  // Load properties on initial render and when search params change
  useEffect(() => {
    setIsLoading(true);
    
    // Get params from URL
    const locationParam = searchParams.get("location");
    const guestsParam = searchParams.get("guests");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const typeParam = searchParams.get("type");
    
    // Update filter states
    if (locationParam) setLocation(locationParam);
    if (guestsParam) setGuests(parseInt(guestsParam));
    if (minPriceParam || maxPriceParam) {
      setPriceRange([
        minPriceParam ? parseInt(minPriceParam) : 0,
        maxPriceParam ? parseInt(maxPriceParam) : 1000
      ]);
    }
    if (typeParam) setPropertyType(typeParam);
    
    // Apply filters
    setTimeout(() => {
      const filtered = searchProperties(
        locationParam || undefined,
        guestsParam ? parseInt(guestsParam) : undefined,
        minPriceParam ? parseInt(minPriceParam) : undefined,
        maxPriceParam ? parseInt(maxPriceParam) : undefined
      );
      setProperties(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchParams]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filter properties</SheetTitle>
                <SheetDescription>
                  Adjust the filters to find your perfect stay
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Price range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={priceRange}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Property Type Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Property type</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <PropertyTypeFilter 
                      icon={Home}
                      label="House"
                      selected={propertyType === "house"}
                      onClick={() => setPropertyType(propertyType === "house" ? "" : "house")}
                    />
                    <PropertyTypeFilter 
                      icon={Building}
                      label="Apartment"
                      selected={propertyType === "apartment"}
                      onClick={() => setPropertyType(propertyType === "apartment" ? "" : "apartment")}
                    />
                    <PropertyTypeFilter 
                      icon={Castle}
                      label="Unique"
                      selected={propertyType === "unique"}
                      onClick={() => setPropertyType(propertyType === "unique" ? "" : "unique")}
                    />
                    <PropertyTypeFilter 
                      icon={Tent}
                      label="Cabin"
                      selected={propertyType === "cabin"}
                      onClick={() => setPropertyType(propertyType === "cabin" ? "" : "cabin")}
                    />
                    <PropertyTypeFilter 
                      icon={Waves}
                      label="Beach"
                      selected={propertyType === "beach"}
                      onClick={() => setPropertyType(propertyType === "beach" ? "" : "beach")}
                    />
                    <PropertyTypeFilter 
                      icon={Mountain}
                      label="Mountain"
                      selected={propertyType === "mountain"}
                      onClick={() => setPropertyType(propertyType === "mountain" ? "" : "mountain")}
                    />
                  </div>
                </div>
                
                <Separator />
                
                {/* Rooms and beds */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Rooms and beds</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Guests</p>
                      <div className="flex space-x-2">
                        {[1, 2, 4, 6, 8, 10].map((num) => (
                          <Button
                            key={num}
                            variant={guests === num ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => setGuests(guests === num ? 0 : num)}
                          >
                            {num}+
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <SheetFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all
                  </Button>
                  <SheetClose asChild>
                    <Button onClick={() => {
                      applyFilters();
                      setFilterOpen(false);
                    }}>
                      Show results
                    </Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          {/* Location Badge */}
          {location && (
            <FilterBadge onRemove={removeLocationFilter}>
              <MapPin className="h-3 w-3 inline mr-1" /> {location}
            </FilterBadge>
          )}
          
          {/* Guests Badge */}
          {guests > 0 && (
            <FilterBadge onRemove={removeGuestsFilter}>
              {guests} guest{guests !== 1 ? 's' : ''}
            </FilterBadge>
          )}
          
          {/* Price Range Badge */}
          {(priceRange[0] > 0 || priceRange[1] < 1000) && (
            <FilterBadge onRemove={removePriceFilter}>
              ${priceRange[0]} - ${priceRange[1]}
            </FilterBadge>
          )}
          
          {/* Property Type Badge */}
          {propertyType && (
            <FilterBadge onRemove={removePropertyTypeFilter}>
              {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
            </FilterBadge>
          )}
          
          {/* Clear all button */}
          {(location || guests > 0 || priceRange[0] > 0 || priceRange[1] < 1000 || propertyType) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              Clear all
            </Button>
          )}
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {properties.length} place{properties.length !== 1 ? 's' : ''} to stay
          </h1>
        </div>
        
        {/* Property grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="rounded-xl overflow-hidden border animate-pulse"
              >
                <div className="aspect-[4/3] bg-muted"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-1/4 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No properties found matching your filters.
                </div>
                <Button onClick={clearFilters}>
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Listings;
