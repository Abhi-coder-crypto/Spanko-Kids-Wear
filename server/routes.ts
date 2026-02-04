import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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

  // Seed Data Function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const categories = await storage.getCategories();
  if (categories.length === 0) {
    const cats = [
      { name: "Baby Girl", slug: "baby-girl", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&h=300&fit=crop" },
      { name: "Toddler Girl", slug: "toddler-girl", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300&h=300&fit=crop" },
      { name: "Boys", slug: "boys", image: "https://images.unsplash.com/photo-1471286174890-9c808743a753?w=300&h=300&fit=crop" },
      { name: "Outerwear", slug: "outerwear", image: "https://images.unsplash.com/photo-1545620958-c917ee72365d?w=300&h=300&fit=crop" },
      { name: "Shoes", slug: "shoes", image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=300&h=300&fit=crop" },
    ];

    const createdCats = [];
    for (const cat of cats) {
      createdCats.push(await storage.createCategory(cat));
    }

    const products = [
      { name: "Denim Jacket", description: "Classic denim jacket for cool days.", price: "37.00", originalPrice: "49.00", categoryId: createdCats[0].id, image: "https://images.unsplash.com/photo-1576483582498-8096b79c3d4e?w=500&h=500&fit=crop", isTrending: true },
      { name: "Floral Dress", description: "Soft cotton dress with floral print.", price: "36.00", originalPrice: "47.00", categoryId: createdCats[1].id, image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=500&h=500&fit=crop", isNew: true },
      { name: "Overall Shorts", description: "Durable denim overalls.", price: "30.00", originalPrice: "40.00", categoryId: createdCats[2].id, image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=500&h=500&fit=crop", isTrending: true },
      { name: "Teddy Bear Hoodie", description: "Warm and cozy hoodie.", price: "16.00", originalPrice: null, categoryId: createdCats[3].id, image: "https://images.unsplash.com/photo-1556905055-8f358a18a479?w=500&h=500&fit=crop", isNew: true },
      { name: "Canvas Sneakers", description: "Comfortable everyday shoes.", price: "29.00", originalPrice: "38.00", categoryId: createdCats[4].id, image: "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?w=500&h=500&fit=crop" },
      { name: "Plaid Shirt", description: "Classic plaid button down.", price: "22.00", originalPrice: "30.00", categoryId: createdCats[2].id, image: "https://images.unsplash.com/photo-1610444583167-7b8783424683?w=500&h=500&fit=crop", isTrending: true },
      { name: "Winter Coat", description: "Puffer coat for winter.", price: "45.00", originalPrice: "60.00", categoryId: createdCats[3].id, image: "https://images.unsplash.com/photo-1576483606675-7e50259b0d23?w=500&h=500&fit=crop", isNew: true },
    ];

    for (const prod of products) {
      await storage.createProduct(prod);
    }
  }
}
