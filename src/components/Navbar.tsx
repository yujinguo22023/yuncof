
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";
import UserAccountNav from "./UserAccountNav";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-xs">air</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">airspace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-sm font-medium"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              Anywhere
            </Button>
            <span className="text-muted-foreground">|</span>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-sm font-medium"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              Any week
            </Button>
            <span className="text-muted-foreground">|</span>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-sm font-medium"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              Add guests
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-primary text-primary-foreground ml-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Right side menu (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/listings">
              <Button variant="ghost" size="sm" className="rounded-full">
                Explore
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to={isAuthenticated ? "/host" : "/login?redirect=/host"}>
                Become a host
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-4 w-4" />
            </Button>
            
            <UserAccountNav />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 px-4">
            <div className="bg-background rounded-full shadow-lg border animate-slide-up">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t animate-slide-up">
            <div className="space-y-1 px-2 py-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/listings"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Saved Listings
                  </Link>
                  <Link
                    to="/profile-settings"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </>
              )}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="w-full justify-start rounded-md"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
