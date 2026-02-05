import { useLocation, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/use-shop";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  
  const category = searchParams.get('category') || undefined;
  const isNew = searchParams.get('filter') === 'new';
  const isTrending = searchParams.get('filter') === 'trending';
  const hasDeal = searchParams.get('filter') === 'deals';

  const { data: products, isLoading } = useProducts({ 
    category,
    isNew,
    isTrending,
    hasDeal
  });

  const { data: categories } = useCategories();

  const getPageTitle = () => {
    if (category) return category.charAt(0).toUpperCase() + category.slice(1);
    if (isNew) return "New Arrivals";
    if (isTrending) return "Trending Now";
    if (hasDeal) return "Clearance Deals";
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-primary/5 py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display mb-4 text-center">
              {getPageTitle()}
            </h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of high-quality, comfortable, and stylish kids wear. 
              Designed for play, made to last.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
              <div>
                <h3 className="font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li><a href="/shop" className="text-sm hover:text-primary">All Products</a></li>
                  {categories?.map(cat => (
                    <li key={cat.id}>
                      <a 
                        href={`/shop?category=${cat.slug}`} 
                        className={`text-sm hover:text-primary ${category === cat.slug ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                      >
                        {cat.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Price Range</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" /> Under ₹200
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" /> ₹200 - ₹500
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" /> ₹500+
                  </label>
                </div>
              </div>
            </aside>

            {/* Mobile Filters */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="py-4">
                    <h3 className="font-bold mb-4">Categories</h3>
                    <ul className="space-y-3">
                      <li><a href="/shop" className="block py-1">All Products</a></li>
                      {categories?.map(cat => (
                        <li key={cat.id}>
                          <a href={`/shop?category=${cat.slug}`} className="block py-1 text-muted-foreground">{cat.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="aspect-[3/4] rounded-2xl" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <h3 className="text-lg font-bold mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try clearing your filters or checking back later.</p>
                  <Link href="/shop">
                    <Button variant="ghost" className="mt-4">Clear Filters</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
