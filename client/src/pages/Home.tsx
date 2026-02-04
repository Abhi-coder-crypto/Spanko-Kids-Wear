import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCircle } from "@/components/CategoryCircle";
import { Button } from "@/components/ui/button";
import { useProducts, useCategories } from "@/hooks/use-shop";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: trendingProducts, isLoading: isTrendingLoading } = useProducts({ isTrending: true });
  const { data: dealProducts, isLoading: isDealsLoading } = useProducts({ hasDeal: true });
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative h-[600px] w-full overflow-hidden bg-slate-100">
          {/* Unsplash placeholder: Kids jumping/playing joyfully */}
          <img 
            src="https://images.unsplash.com/photo-1596464716127-f9a0859b4bce?q=80&w=2070&auto=format&fit=crop"
            alt="Happy kids jumping"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-bold tracking-wider text-sm">
                  NEW COLLECTION 2024
                </span>
                <h1 className="text-5xl md:text-7xl font-display text-slate-900 leading-tight">
                  Play All Day <br />
                  <span className="text-primary">In Style</span>
                </h1>
                <p className="text-lg text-slate-700 font-medium">
                  Comfortable, durable, and adorable styles for every adventure.
                </p>
                <div className="flex gap-4 pt-4">
                  <Link href="/shop">
                    <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/shop?filter=deals">
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 bg-white/80 backdrop-blur hover:bg-white border-2">
                      View Deals
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display mb-4">Shop by Category</h2>
              <p className="text-muted-foreground">Find the perfect fit for your little ones</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {isCategoriesLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <Skeleton className="h-36 w-36 rounded-full" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                ))
              ) : categories?.length ? (
                categories.map((cat, i) => (
                  <CategoryCircle 
                    key={cat.id}
                    name={cat.name}
                    slug={cat.slug}
                    image={cat.image}
                    color={i % 2 === 0 ? "bg-blue-100" : "bg-pink-100"}
                  />
                ))
              ) : (
                // Fallback hardcoded categories if DB is empty
                <>
                  <CategoryCircle 
                    name="Baby Girl" 
                    slug="baby-girl" 
                    image="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop" 
                    color="bg-pink-100"
                  />
                  <CategoryCircle 
                    name="Baby Boy" 
                    slug="baby-boy" 
                    image="https://images.unsplash.com/photo-1522771753035-4a504711a13d?w=500&auto=format&fit=crop" 
                    color="bg-blue-100"
                  />
                  <CategoryCircle 
                    name="Toddler" 
                    slug="toddler" 
                    image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&auto=format&fit=crop" 
                    color="bg-yellow-100"
                  />
                  <CategoryCircle 
                    name="Kids" 
                    slug="kids" 
                    image="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=500&auto=format&fit=crop" 
                    color="bg-green-100"
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* DEALS SECTION */}
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display mb-2 flex items-center gap-3">
                  Sweet Deals <Sparkles className="text-secondary" />
                </h2>
                <p className="text-muted-foreground">Grab these favorites before they're gone!</p>
              </div>
              <Link href="/shop?filter=deals">
                <Button variant="ghost" className="hidden md:flex gap-2 text-primary">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {isDealsLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[3/4] rounded-2xl" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                ))
              ) : dealProducts && dealProducts.length > 0 ? (
                dealProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-4 text-center py-12 text-muted-foreground">
                  No active deals right now. Check back soon!
                </div>
              )}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link href="/shop?filter=deals">
                <Button variant="outline" className="w-full">
                  View All Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* TRENDING SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display mb-4">New & Trending</h2>
              <p className="text-muted-foreground">The most loved styles of the season</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Large Card */}
              <div className="md:col-span-2 lg:col-span-1 relative h-[500px] rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1972&auto=format&fit=crop"
                  alt="Feature trending"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                  <span className="text-white/90 font-bold tracking-wider text-sm mb-2">SEASON FAVORITE</span>
                  <h3 className="text-3xl font-display text-white mb-4">Summer Adventures</h3>
                  <Button className="w-fit bg-white text-black hover:bg-white/90">Shop the Look</Button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="md:col-span-2 lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
                {isTrendingLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="aspect-[3/4] rounded-2xl" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))
                ) : trendingProducts && trendingProducts.length > 0 ? (
                  trendingProducts.slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-3 flex items-center justify-center h-full text-muted-foreground">
                    New items coming soon!
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER BANNER */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display mb-6">Join the Spanko Family!</h2>
            <p className="text-blue-100 text-lg mb-8">
              Sign up for our newsletter and get 15% off your first order. 
              Plus, be the first to know about new drops!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-full text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Button size="lg" className="rounded-full px-8 py-7 text-lg bg-accent hover:bg-accent/90 text-white font-bold shadow-lg shadow-black/10">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
