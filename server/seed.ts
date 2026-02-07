import { storage } from "./storage";

const categoriesData = [
  // 1. BOYS
  { id: 1, name: "BOYS", slug: "boys", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300" },
  { id: 2, name: "SHIRTS", slug: "boys-shirts", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },
  { id: 3, name: "SETS AND SUITS", slug: "boys-sets-suits", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },
  { id: 4, name: "NIGHT DRESSES(1YR -12YR)", slug: "boys-night-dresses", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },

  // 2. GIRLS
  { id: 5, name: "GIRLS", slug: "girls", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300" },
  { id: 6, name: "PARTY DRESSES-GOWN", slug: "girls-party-gown", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { id: 7, name: "6 MONTH - 2 YRS", slug: "girls-gown-baby", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { id: 8, name: "6 MONTH - 14 YRS", slug: "girls-gown-kids", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { id: 9, name: "FROCK", slug: "girls-frock", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { id: 10, name: "COTTON WEAR(0-5 YEARS)", slug: "girls-cotton-wear", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 9 },
  { id: 11, name: "CASUAL AND DAILY WEAR", slug: "girls-casual", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 9 },
  { id: 12, name: "NIGHT DRESSES (PRINTED)(1-12 YRS)", slug: "girls-night-dresses", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { id: 13, name: "FULL SLEEVES", slug: "girls-night-full-sleeves", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 12 },
  { id: 14, name: "HALF SLEEVES", slug: "girls-night-half-sleeves", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 12 },
  { id: 15, name: "FULL PANT", slug: "girls-night-full-pant", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 12 },
  { id: 16, name: "HALF PANT", slug: "girls-night-half-pant", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 12 },
  { id: 17, name: "SETS AND SUITS", slug: "girls-sets-suits", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
];

async function seed() {
  // Clear existing to avoid duplicates if re-seeded
  // Note: MemStorage clear implementation depends on storage.ts, let's just use storage.createCategory
  // Since we're restarting the server, MemStorage will be fresh anyway.
  for (const cat of categoriesData) {
    await storage.createCategory(cat);
  }
}

seed().catch(console.error);
