export interface Restaurant {
  id: string;
  name: string;
  city: string;
  address: string;
  cuisine: string[];
  tags: string[];
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  reviewCount: number;
  description: string;
  phone: string;
  website?: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dietaryOptions: string[];
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    dietaryRestrictions: string[];
    cuisinePreferences: string[];
    priceRange: string[];
  };
  favoriteRestaurants: string[];
  isAdmin?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  recommendations?: Restaurant[];
}
