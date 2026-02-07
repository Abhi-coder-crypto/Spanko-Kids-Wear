import { storage } from "./storage";

const categoriesData = [
  // 1. BOYS
  { id: 1, name: "BOYS", slug: "boys", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300" },
  { id: 2, name: "SHIRTS", slug: "boys-shirts", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },
  { id: 3, name: "SETS AND SUITS", slug: "boys-sets-suits", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },
  { id: 4, name: "NIGHT DRESSES(1YR -12YR)", slug: "boys-night-dresses", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 1 },

  // 2. GIRLS
  { id: 5, name: "GIRLS", slug: "girls", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300" },
  { id: 6, name: "PARTY DRESSES", slug: "girls-party-dresses", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { id: 7, name: "GOWN(6 MONTH - 2 YRS)(6 MONTH-14 YRS)", slug: "girls-gown", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { id: 8, name: "FROCK", slug: "girls-frock", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { id: 9, name: "COTTON WEAR(0-5 YEARS)", slug: "girls-cotton-wear", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 8 },
  { id: 10, name: "CASUAL AND DAILY WEAR", slug: "girls-casual", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 8 },
  { id: 11, name: "NIGHT DRESSES (PRINTED)(1-12 YRS)", slug: "girls-night-dresses", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },
  { id: 12, name: "FULL SLEEVES", slug: "girls-night-full-sleeves", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 11 },
  { id: 13, name: "HALF SLEEVES", slug: "girls-night-half-sleeves", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 11 },
  { id: 14, name: "FULL PANT", slug: "girls-night-full-pant", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 11 },
  { id: 15, name: "HALF PANT", slug: "girls-night-half-pant", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 11 },
  { id: 16, name: "SETS AND SUITS", slug: "girls-sets-suits", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 5 },

  // 3. ETHNIC
  { id: 17, name: "ETHNIC", slug: "ethnic", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300" },
  { id: 18, name: "BOYS(6-14 YRS)", slug: "ethnic-boys", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 17 },
  { id: 19, name: "KURTA PYJAMA SET", slug: "boys-kurta-pyjama", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 18 },
  { id: 20, name: "KURTA DHOTI", slug: "boys-kurta-dhoti", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 18 },
  { id: 21, name: "SHORT KURTA", slug: "boys-short-kurta", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 18 },
  { id: 22, name: "GIRLS(6-14YRS)", slug: "ethnic-girls", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 17 },
  { id: 23, name: "KURTA SET", slug: "girls-kurta-set", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 22 },
  { id: 24, name: "LEHENGA CHOLI", slug: "girls-lehenga", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 22 },
  { id: 25, name: "DUPATTA SET", slug: "girls-dupatta-set", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 22 },
  { id: 26, name: "DHOTI SET", slug: "girls-dhoti-set", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 22 },
  { id: 27, name: "SHARARA SET", slug: "girls-sharara-set", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 22 },

  // 4. BEST SELLER
  { id: 28, name: "BEST SELLER", slug: "best-seller", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },

  // 5. WESTERN WEAR
  { id: 29, name: "WESTERN WEAR", slug: "western-wear", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },
  { id: 30, name: "BOYS", slug: "western-boys", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 29 },
  { id: 31, name: "JACKET", slug: "boys-jacket", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 30 },
  { id: 32, name: "TSHIRT", slug: "boys-tshirt", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 30 },
  { id: 33, name: "GIRLS", slug: "western-girls", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 29 },
  { id: 34, name: "TOP", slug: "girls-top", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 33 },

  // 6. SALE
  { id: 35, name: "SALE", slug: "sale", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },

  // 7. FESTIVE COLLECTION
  { id: 36, name: "FESTIVE COLLECTION", slug: "festive", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" }
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
