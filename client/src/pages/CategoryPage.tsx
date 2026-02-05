import { useRoute } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/use-shop";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const slug = params?.slug;

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts({ category: slug });

  const currentCategory = categories?.find(c => c.slug === slug);
  const subcategories = categories?.filter(c => c.parentId === currentCategory?.id) || [];

  if (isCategoriesLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <Link href="/shop" className="text-primary hover:underline">Back to Shop</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-primary/5 py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display mb-4 text-center">
              {currentCategory.name}
            </h1>
            {subcategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {subcategories.map(sub => (
                  <Link key={sub.id} href={`/category/${sub.slug}`}>
                    <div className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
                        <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium">{sub.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {isProductsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="aspect-[3/4] rounded-2xl" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <h3 className="text-lg font-bold mb-2">No products found in this category</h3>
                  <p className="text-muted-foreground">Check back later for new arrivals.</p>
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
