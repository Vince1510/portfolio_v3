export interface Vacation {
  id: string;
  year: string;
  image: string;
  coords: [number, number];
}

export const vacationsData: Vacation[] = [
  { 
    id: "mallorca",
    year: "2026", 
    image: "",
    coords: [39.6953, 3.0176]
  },
  { 
    id: "thailand",
    year: "2025", 
    image: "",
    coords: [13.7563, 100.5018]
  },
  { 
    id: "malaysia2024",
    year: "2024", 
    image: "",
    coords: [3.1390, 101.6869]
  },
  { 
    id: "malaysia2023",
    year: "2023", 
    image: "",
    coords: [4.2105, 101.9758]
  },
];
