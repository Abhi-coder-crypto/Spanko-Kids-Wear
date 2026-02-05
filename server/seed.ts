import { storage } from "./storage";

const categoriesData = [
  { name: "BOYS", slug: "boys", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300" },
  { name: "Shirts", slug: "boys-shirts", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },
  { name: "Sets & Suits", slug: "boys-sets-suits", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },
  { name: "Night Dresses (1–12 Years)", slug: "boys-night-dresses", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },
  { name: "GIRLS", slug: "girls", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300" },
  { name: "Party Dresses / Gowns", slug: "girls-party-dresses", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { name: "Frocks", slug: "girls-frocks", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { name: "Cotton Wear (0–5 Years)", slug: "girls-cotton-wear", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { name: "Casual & Daily Wear", slug: "girls-casual", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { name: "Night Dresses (Printed) (1–12 Years)", slug: "girls-night-dresses", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { name: "ETHNIC WEAR", slug: "ethnic-wear", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300" },
  { name: "Boys (6–14 Years)", slug: "boys-ethnic", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 11 },
  { name: "Girls (6–14 Years)", slug: "girls-ethnic", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 11 },
  { name: "WESTERN WEAR", slug: "western-wear", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },
  { name: "BEST SELLER", slug: "best-seller", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },
  { name: "SALE", slug: "sale", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },
  { name: "FESTIVE COLLECTION", slug: "festive", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" }
];

async function seed() {
  for (const cat of categoriesData) {
    await storage.createCategory(cat);
  }
}

seed().catch(console.error);
