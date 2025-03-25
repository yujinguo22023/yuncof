
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Calendar, Users, Map } from "lucide-react";

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [activeTab, setActiveTab] = useState("location");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (dates) params.append("dates", dates);
    if (guests) params.append("guests", guests);
    
    // Navigate to listings page with search params
    navigate(`/listings?${params.toString()}`);
    
    // Close search bar if provided
    if (onClose) onClose();
  };

  return (
    <div className="w-full rounded-full py-3 px-4">
      <form onSubmit={handleSearch}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <button
              type="button"
              className={`flex items-center space-x-2 ${
                activeTab === "location" ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("location")}
            >
              <Map className="h-4 w-4" />
              <span className="text-sm font-medium">Where</span>
            </button>
            <button
              type="button"
              className={`flex items-center space-x-2 ${
                activeTab === "dates" ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("dates")}
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">When</span>
            </button>
            <button
              type="button"
              className={`flex items-center space-x-2 ${
                activeTab === "guests" ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("guests")}
            >
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Who</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {onClose && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button 
              type="submit" 
              size="sm" 
              className="rounded-full bg-primary text-primary-foreground"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="mt-4">
          {activeTab === "location" && (
            <div className="animate-fade-in">
              <Input
                placeholder="Search destinations"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-full border-muted"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setLocation("New York")}
                >
                  New York
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setLocation("Los Angeles")}
                >
                  Los Angeles
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setLocation("London")}
                >
                  London
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setLocation("Paris")}
                >
                  Paris
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setLocation("Tokyo")}
                >
                  Tokyo
                </Button>
              </div>
            </div>
          )}

          {activeTab === "dates" && (
            <div className="animate-fade-in">
              <Input
                placeholder="Add dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="rounded-full border-muted"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setDates("This weekend")}
                >
                  This weekend
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setDates("Next weekend")}
                >
                  Next weekend
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setDates("June 2023")}
                >
                  June 2023
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setDates("July 2023")}
                >
                  July 2023
                </Button>
              </div>
            </div>
          )}

          {activeTab === "guests" && (
            <div className="animate-fade-in">
              <Input
                placeholder="Add guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="rounded-full border-muted"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setGuests("1 guest")}
                >
                  1 guest
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setGuests("2 guests")}
                >
                  2 guests
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setGuests("4 guests")}
                >
                  4 guests
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setGuests("6+ guests")}
                >
                  6+ guests
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
