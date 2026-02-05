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
        <section className="relative h-[600px] w-full overflow-hidden bg-[#f8f9fb]">
          <div className="container mx-auto px-4 h-full relative flex items-center">
            {/* Background Image / Promo Content */}
            <div className="absolute right-0 top-0 h-full w-full md:w-1/2 overflow-hidden">
               <img 
                src="/src/assets/hero-right.jpg"
                alt="Spanko Collection"
                className="h-full w-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fb] via-[#f8f9fb]/20 to-transparent md:block hidden" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-8 md:text-left text-center">
              <div className="space-y-[-1rem]">
                <h1 className="text-8xl md:text-[11rem] font-display text-[#002b5c] leading-[0.7] tracking-tighter drop-shadow-xl animate-in fade-in slide-in-from-left-8 duration-700">
                  spanko
                </h1>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-[0.2em] text-[#ec4899] leading-none ml-2 drop-shadow-md animate-in fade-in slide-in-from-left-12 duration-1000">
                  Nice One
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-slate-700 font-medium max-w-md leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                Experience the ultimate comfort and style with our newest collection. Designed for the little explorers of today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <Link href="/shop">
                  <Button size="lg" className="rounded-full px-12 text-lg font-black h-14 bg-[#002b5c] text-white hover:bg-[#001a3d] shadow-[0_10px_30px_rgba(0,43,92,0.3)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-display mb-4">Shop by Category</h2>
            <p className="text-slate-500 mb-16 max-w-lg mx-auto">Find the perfect fit for your little ones with our curated selections</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-y-12 gap-x-8">
              {isCategoriesLoading ? (
                Array(7).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))
              ) : categories?.length ? (
                categories.map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.slug}`} className="group flex flex-col items-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="mt-4 font-bold text-slate-800 group-hover:text-primary transition-colors">{cat.name}</span>
                  </Link>
                ))
              ) : (
                <>
                  {[
                    { name: "Baby", slug: "baby", img: "/src/assets/categories/baby.jpg" },
                    { name: "Toddler", slug: "toddler", img: "/src/assets/categories/toddler.jpg" },
                    { name: "Kids", slug: "kids", img: "/src/assets/categories/kids.jpg" },
                    { name: "Baby Girl", slug: "baby-girl", img: "/src/assets/categories/baby-girl.jpg" },
                    { name: "Baby Boy", slug: "baby-boy", img: "/src/assets/categories/baby-boy.jpg" },
                    { name: "Baby Neutral", slug: "baby-neutral", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500" },
                    { name: "Pajamas", slug: "pajamas", img: "/src/assets/categories/pajamas.jpg" }
                  ].map((cat) => (
                    <Link key={cat.slug} href={`/category/${cat.slug}`} className="group flex flex-col items-center">
                      <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                        <img src={cat.img} alt={cat.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="mt-4 font-bold text-slate-800 group-hover:text-primary transition-colors">{cat.name}</span>
                    </Link>
                  ))}
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
        <section className="py-24 bg-[#3b82f6] text-white overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2563eb]/30 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-display mb-8 tracking-tighter drop-shadow-md">Join the Spanko Family!</h2>
            <p className="text-blue-50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
              Sign up for our newsletter and get <span className="font-bold text-white underline decoration-[#ec4899] decoration-4 underline-offset-8">15% off</span> your first order. 
              Be the first to know about new drops!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto p-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-8 py-5 rounded-full bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#ec4899]/50 transition-all text-lg placeholder:text-slate-400"
              />
              <Button size="lg" className="rounded-full px-10 py-8 text-xl bg-[#ec4899] hover:bg-[#db2777] text-white font-black shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
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
