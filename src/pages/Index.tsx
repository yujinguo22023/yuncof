
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronDown, 
  ArrowRight, 
  Building, 
  Castle, 
  Tent, 
  PalmTree, 
  Mountain, 
  Home, 
  Waves,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import FeaturedProperties from "@/components/FeaturedProperties";
import SearchBar from "@/components/SearchBar";

const PropertyTypeButton = ({ 
  icon: Icon, 
  label 
}: { 
  icon: React.ElementType; 
  label: string;
}) => (
  <Button 
    variant="outline" 
    className="flex flex-col items-center justify-center h-24 w-full rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors"
  >
    <Icon className="h-6 w-6 mb-2" />
    <span className="text-sm">{label}</span>
  </Button>
);

const Index = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=2000&h=600&q=80')",
            transform: `translateY(${scrollPosition * 0.4}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center sm:px-6 lg:px-8">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm mb-4">
            Launch Offer: 15% off your first booking
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Find your perfect place <br className="hidden sm:inline" />
            anywhere in the world
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
            Discover unique homes and experiences that make every journey memorable
          </p>
          <div className="w-full max-w-lg">
            <Button 
              size="lg" 
              className="w-full rounded-full shadow-lg"
              onClick={() => setShowSearch(!showSearch)}
            >
              Start your search
            </Button>
            {showSearch && (
              <div className="mt-4 bg-background border rounded-xl shadow-xl animate-slide-up">
                <SearchBar onClose={() => setShowSearch(false)} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Browse by property type</h2>
            <Link to="/listings">
              <Button variant="ghost" className="group">
                View all
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PropertyTypeButton icon={Building} label="Apartments" />
            <PropertyTypeButton icon={Home} label="Houses" />
            <PropertyTypeButton icon={Castle} label="Unique stays" />
            <PropertyTypeButton icon={Tent} label="Cabins" />
            <PropertyTypeButton icon={PalmTree} label="Tropical" />
            <PropertyTypeButton icon={Mountain} label="Mountain" />
            <PropertyTypeButton icon={Waves} label="Beachfront" />
            <PropertyTypeButton icon={Coffee} label="Breakfast" />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Become a Host Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Become a host and start earning
              </h2>
              <p className="text-muted-foreground mb-6">
                Share your space, share your city, and build a sustainable source of income while connecting with travelers from around the world.
              </p>
              <Button size="lg" className="rounded-full">
                Learn more
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500"
                alt="Become a host"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-background rounded-xl p-4 shadow-lg">
                <p className="font-semibold">Earn up to</p>
                <p className="text-2xl font-bold text-primary">$1,500/month</p>
                <p className="text-sm text-muted-foreground">Hosting your space</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-center mb-12">
            What our guests are saying
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jessica K.",
                location: "New York",
                quote: "The property exceeded our expectations. Beautiful views and the host was incredibly responsive and helpful."
              },
              {
                name: "Robert M.",
                location: "London",
                quote: "We had a fantastic experience. The location was perfect and the amenities were exactly what we needed for our vacation."
              },
              {
                name: "Elena T.",
                location: "Paris",
                quote: "A truly memorable stay. The attention to detail was impressive and made us feel right at home from the moment we arrived."
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="font-medium text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Thousands of unique properties are waiting for you. Find your perfect stay today.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-full"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Explore properties
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
