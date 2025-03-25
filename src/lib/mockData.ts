
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  beds: number;
  baths: number;
  guests: number;
  host: {
    name: string;
    image: string;
    isSuperhost: boolean;
  };
  amenities: string[];
  availableDates?: {
    start: string;
    end: string;
  };
  featured?: boolean;
}

const mockProperties: Property[] = [
  {
    id: "p1",
    title: "Luxury Beachfront Villa",
    description: "Experience paradise in this stunning beachfront villa with private pool and panoramic ocean views. Perfect for a relaxing getaway with direct beach access and modern amenities.",
    location: "Miami, Florida",
    price: 450,
    rating: 4.97,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 4,
    baths: 3,
    guests: 8,
    host: {
      name: "Amanda",
      image: "https://randomuser.me/api/portraits/women/11.jpg",
      isSuperhost: true
    },
    amenities: ["Pool", "Beach access", "Wifi", "Kitchen", "Air conditioning", "Washer", "Dryer", "Dedicated workspace"],
    featured: true
  },
  {
    id: "p2",
    title: "Modern City Apartment",
    description: "Stylish city center apartment with breathtaking skyline views. Located in the heart of downtown, minutes from restaurants, shopping, and entertainment.",
    location: "New York, New York",
    price: 220,
    rating: 4.85,
    reviewCount: 96,
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 2,
    baths: 1,
    guests: 4,
    host: {
      name: "Michael",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      isSuperhost: false
    },
    amenities: ["Wifi", "Kitchen", "Air conditioning", "Washer", "Dryer", "Dedicated workspace", "Elevator", "24/7 security"],
    featured: true
  },
  {
    id: "p3",
    title: "Rustic Mountain Cabin",
    description: "Cozy mountain retreat with stunning views and a wood-burning fireplace. Perfect for nature lovers with hiking trails and wildlife right outside your door.",
    location: "Aspen, Colorado",
    price: 195,
    rating: 4.92,
    reviewCount: 73,
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 3,
    baths: 2,
    guests: 6,
    host: {
      name: "Robert",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      isSuperhost: true
    },
    amenities: ["Fireplace", "Mountain view", "Wifi", "Kitchen", "Heating", "Free parking", "Dedicated workspace", "Hot tub"],
    featured: true
  },
  {
    id: "p4",
    title: "Scenic Countryside Cottage",
    description: "Charming cottage nestled in the tranquil countryside. Featuring a beautiful garden, exposed beams, and a cozy interior that's perfect for a peaceful retreat.",
    location: "Bath, United Kingdom",
    price: 135,
    rating: 4.88,
    reviewCount: 62,
    images: [
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 2,
    baths: 1,
    guests: 3,
    host: {
      name: "Emily",
      image: "https://randomuser.me/api/portraits/women/26.jpg",
      isSuperhost: true
    },
    amenities: ["Garden", "Wifi", "Kitchen", "Heating", "Free parking", "Breakfast", "Fireplace", "BBQ grill"],
    featured: false
  },
  {
    id: "p5",
    title: "Lakefront Paradise",
    description: "Serene lakeside retreat with private dock and stunning water views. Enjoy kayaking, fishing, or simply relaxing on the spacious deck overlooking the lake.",
    location: "Lake Tahoe, California",
    price: 275,
    rating: 4.95,
    reviewCount: 84,
    images: [
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 3,
    baths: 2,
    guests: 6,
    host: {
      name: "David",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      isSuperhost: false
    },
    amenities: ["Lake access", "Private dock", "Wifi", "Kitchen", "Heating", "Air conditioning", "Free parking", "BBQ grill"],
    featured: false
  },
  {
    id: "p6",
    title: "Downtown Loft",
    description: "Stylish loft in the heart of the arts district. High ceilings, exposed brick, and designer furnishings create a unique urban retreat perfect for your city adventures.",
    location: "Portland, Oregon",
    price: 165,
    rating: 4.82,
    reviewCount: 57,
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 1,
    baths: 1,
    guests: 3,
    host: {
      name: "Jessica",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      isSuperhost: true
    },
    amenities: ["Wifi", "Kitchen", "Air conditioning", "Washer", "Dryer", "Dedicated workspace", "Gym access", "Roof terrace"],
    featured: false
  },
  {
    id: "p7",
    title: "Tropical Beach Bungalow",
    description: "Idyllic beach bungalow surrounded by palm trees and just steps from crystal clear waters. The perfect tropical escape with outdoor shower and hammock for relaxation.",
    location: "Kauai, Hawaii",
    price: 310,
    rating: 4.94,
    reviewCount: 112,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 2,
    baths: 1,
    guests: 4,
    host: {
      name: "Thomas",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
      isSuperhost: true
    },
    amenities: ["Beach access", "Wifi", "Kitchen", "Air conditioning", "Outdoor shower", "Hammock", "Free parking", "BBQ grill"],
    featured: false
  },
  {
    id: "p8",
    title: "Historic Townhouse",
    description: "Elegant townhouse in a historic district with original architectural details and modern amenities. Walking distance to cafes, boutiques, and historic landmarks.",
    location: "Charleston, South Carolina",
    price: 225,
    rating: 4.89,
    reviewCount: 76,
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=800&h=500"
    ],
    beds: 3,
    baths: 2.5,
    guests: 6,
    host: {
      name: "Sarah",
      image: "https://randomuser.me/api/portraits/women/57.jpg",
      isSuperhost: false
    },
    amenities: ["Wifi", "Kitchen", "Air conditioning", "Washer", "Dryer", "Dedicated workspace", "Courtyard", "Free street parking"],
    featured: false
  }
];

export const getFeaturedProperties = () => {
  return mockProperties.filter(property => property.featured);
};

export const getAllProperties = () => {
  return mockProperties;
};

export const getPropertyById = (id: string) => {
  return mockProperties.find(property => property.id === id);
};

export const searchProperties = (
  location?: string,
  guests?: number,
  minPrice?: number,
  maxPrice?: number
) => {
  return mockProperties.filter(property => {
    // Filter by location if provided
    if (location && !property.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by guests if provided
    if (guests && property.guests < guests) {
      return false;
    }
    
    // Filter by price range if provided
    if (minPrice && property.price < minPrice) {
      return false;
    }
    
    if (maxPrice && property.price > maxPrice) {
      return false;
    }
    
    return true;
  });
};
