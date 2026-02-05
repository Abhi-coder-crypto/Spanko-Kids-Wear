import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.products.list.path, async (req, res) => {
    const filters = {
      isNew: req.query.isNew === 'true',
      isTrending: req.query.isTrending === 'true',
      hasDeal: req.query.hasDeal === 'true',
      category: req.query.category as string,
    };
    const products = await storage.getProducts(filters);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.get(api.categories.list.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const categories = await storage.getCategories();
  if (categories.length === 0) {
    // Top Level
    const baby = await storage.createCategory({ name: "Baby", slug: "baby", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&h=300&fit=crop" });
    const toddler = await storage.createCategory({ name: "Toddler", slug: "toddler", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300&h=300&fit=crop" });
    const kids = await storage.createCategory({ name: "Kids", slug: "kids", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300&h=300&fit=crop" });

    // Subcategories for Baby
    const babyGirl = await storage.createCategory({ name: "Baby Girl", slug: "baby-girl", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&h=500&fit=crop", parentId: baby.id });
    const babyBoy = await storage.createCategory({ name: "Baby Boy", slug: "baby-boy", image: "https://images.unsplash.com/photo-1522771753035-4a504711a13d?w=500&h=500&fit=crop", parentId: baby.id });
    const babyNeutral = await storage.createCategory({ name: "Baby Neutral", slug: "baby-neutral", image: "https://images.unsplash.com/photo-1596464716127-f9a0859b4bce?w=500&h=500&fit=crop", parentId: baby.id });

    // Types for Baby Girl
    const pajamas = await storage.createCategory({ name: "Pajamas", slug: "pajamas", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=500&h=500&fit=crop", parentId: babyGirl.id });
    const outfits = await storage.createCategory({ name: "Outfit Sets", slug: "outfits", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=500&h=500&fit=crop", parentId: babyGirl.id });
    const bodysuits = await storage.createCategory({ name: "Bodysuits", slug: "bodysuits", image: "https://images.unsplash.com/photo-1522771753035-4a504711a13d?w=500&h=500&fit=crop", parentId: babyGirl.id });

    await storage.createProduct({ 
      name: "Floral Pajama Set", 
      description: "Soft cotton pajamas.", 
      price: "24.00", 
      originalPrice: "32.00", 
      categoryId: pajamas.id, 
      image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=500&h=500&fit=crop",
      isNew: true 
    });
    
    await storage.createProduct({ 
      name: "Denim Overall Set", 
      description: "Playful denim overalls.", 
      price: "34.00", 
      originalPrice: "45.00", 
      categoryId: outfits.id, 
      image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=500&h=500&fit=crop",
      isTrending: true 
    });
  }
}
