export type AlkymityTab = 
  | 'home'
  | 'studio'
  | 'kitchen'
  | 'running'
  | 'retreats'
  | 'suites'
  | 'experiences'
  | 'membership'
  | 'certifications'
  | 'member-portal';

export interface PilatesClass {
  id: string;
  title: string;
  category: 'Reformer' | 'Mat' | 'Mobility' | 'Strength' | 'Recovery' | 'Private';
  instructor: string;
  instructorAvatar: string;
  time: string;
  duration: string;
  date: string;
  intensity: 'Gentle' | 'Moderate' | 'High' | 'All Levels';
  spotsLeft: number;
  maxSpots: number;
  location: string;
  price: number;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Bowls' | 'Salads' | 'Functional Drinks' | 'Coffee' | 'Smoothies' | 'Desserts' | 'Grab & Go';
  price: number;
  description: string;
  image: string;
  ingredients: string[];
  dietary: ('Vegan' | 'Gluten-Free' | 'Keto' | 'Nut-Free' | 'Organic' | 'High-Protein')[];
  calories: number;
  protein: string;
}

export interface RunEvent {
  id: string;
  title: string;
  type: 'Sunrise Trail' | 'Lava Tunnel Dash' | 'Coastal Pace' | 'Tempo Track' | 'Recovery Walk';
  date: string;
  time: string;
  distance: string;
  elevation: string;
  pace: string;
  coach: string;
  location: string;
  attendees: number;
  maxCapacity: number;
  image: string;
  description: string;
}

export interface RetreatItem {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  duration: string;
  location: string;
  price: number;
  image: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  included: string[];
  facilitators: { name: string; role: string; avatar: string }[];
  spotsRemaining: number;
}

export interface SuiteItem {
  id: string;
  name: string;
  tagline: string;
  pricePerNight: number;
  maxGuests: number;
  size: string;
  bed: string;
  images: string[];
  amenities: string[];
  description: string;
  oceanView: boolean;
  privatePool: boolean;
}

export interface WellnessExperience {
  id: string;
  title: string;
  category: 'Breathwork' | 'Sound Bath' | 'Ice Bath Recovery' | 'Sunset Meditation' | 'Farm-to-Table' | 'Private Coaching';
  duration: string;
  price: number;
  location: string;
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
}

export interface CertificationProgram {
  id: string;
  title: string;
  level: string;
  hours: string;
  modality: 'Presencial (Galápagos)' | 'Híbrido (Online + Imersão)';
  dates: string;
  instructor: string;
  investment: number;
  image: string;
  description: string;
  modules: string[];
}

export interface MemberProfile {
  name: string;
  email: string;
  avatar: string;
  tier: 'Lava Member' | 'Coral Elite' | 'Galápagos Founder';
  creditsRemaining: number;
  totalClassesAttended: number;
  nextBooking?: {
    type: string;
    title: string;
    date: string;
    time: string;
    location: string;
  };
  membershipExpiry: string;
}

export interface CartItem {
  id: string;
  type: 'class' | 'kitchen' | 'retreat' | 'suite' | 'experience' | 'membership';
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  date?: string;
  time?: string;
  image?: string;
}
