import {
  products,
  categories,
  type Product,
  type Category,
  type InsertProduct,
  type InsertCategory
} from "@shared/schema";

export interface IStorage {
  getProducts(filters?: { category?: string; isNew?: boolean; isTrending?: boolean; hasDeal?: boolean }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private productIdCounter: number;
  private categoryIdCounter: number;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.productIdCounter = 1;
    this.categoryIdCounter = 1;
  }

  async getProducts(filters?: { category?: string; isNew?: boolean; isTrending?: boolean; hasDeal?: boolean }): Promise<Product[]> {
    let allProducts = Array.from(this.products.values());

    if (filters) {
      if (filters.category) {
        // Simple filtering by category ID if passed as string number, or could implementation slug lookup if needed.
        // For now, assuming standard filtering logic or just returning all if complexity is high for MemStorage without specific requirements.
        // Let's implement basics:
        const catId = parseInt(filters.category);
        if (!isNaN(catId)) {
          allProducts = allProducts.filter(p => p.categoryId === catId);
        }
      }
      if (filters.isNew) {
        allProducts = allProducts.filter(p => p.isNew);
      }
      if (filters.isTrending) {
        allProducts = allProducts.filter(p => p.isTrending);
      }
      if (filters.hasDeal) {
        allProducts = allProducts.filter(p => p.originalPrice !== null);
      }
    }

    return allProducts.sort((a, b) => {
      // Sort by ID descending as a proxy for created at
      return b.id - a.id;
    });
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { ...category, id, parentId: category.parentId ?? null };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const newProduct: Product = { 
      ...product, 
      id, 
      createdAt: new Date(),
      isNew: product.isNew ?? false,
      isTrending: product.isTrending ?? false,
      originalPrice: product.originalPrice ?? null
    };
    this.products.set(id, newProduct);
    return newProduct;
  }
}

export const storage = new MemStorage();
