import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, User, Menu, ChevronRight, X, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCategories } from "@/hooks/use-shop";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeParentId, setActiveParentId] = useState<number | null>(null);
  const [activeSubId, setActiveSubId] = useState<number | null>(null);
  const { data: categories } = useCategories();

  // Categories Hierarchy
  const mainCategories = useMemo(() => categories?.filter(c => !c.parentId) || [], [categories]);
  
  const getSubcategories = (parentId: number) => {
    return categories?.filter(c => c.parentId === parentId) || [];
  };

  const navLinks: any[] = [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40">
      <div className="bg-[#002b5c] px-4 py-2 text-center text-[10px] font-bold text-white uppercase tracking-widest md:text-xs">
        NEW! SPANKO x BABY COMFORT® 🧸
      </div>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                  <span className="font-display text-2xl font-bold">Menu</span>
                </div>
                <nav className="flex-1 p-4 space-y-6">
                  {mainCategories.filter(cat => ["BOYS", "GIRLS"].includes(cat.name)).map((cat) => (
                    <div key={cat.id} className="space-y-4">
                      <Link href={`/category/${cat.slug}`} className="text-xl font-bold block text-[#002b5c] border-b-2 border-[#00a9e0] pb-1 w-fit">
                        {cat.name}
                      </Link>
                      <div className="pl-4 flex flex-col gap-4">
                        {getSubcategories(cat.id).map(sub => (
                          <div key={sub.id} className="space-y-2">
                            <Link href={`/category/${sub.slug}`} className="text-lg font-bold text-slate-800">
                              {sub.name}
                            </Link>
                            <div className="pl-4 flex flex-col gap-2">
                              {getSubcategories(sub.id).map(type => (
                                <Link key={type.id} href={`/category/${type.slug}`} className="text-sm font-medium text-slate-600 hover:text-[#00a9e0]">
                                  {type.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <div className="flex flex-col leading-none">
            <span className="font-display text-4xl font-black tracking-tighter text-[#002b5c] group-hover:text-primary transition-colors">
              spanko
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary ml-1">
              Nice One
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {mainCategories.filter(cat => ["BOYS", "GIRLS"].includes(cat.name)).map((cat) => {
              const subcategories = getSubcategories(cat.id);
              return (
                <NavigationMenuItem key={cat.id}>
                  <NavigationMenuTrigger 
                    className="text-[13px] font-bold uppercase tracking-tight h-16 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent rounded-none border-b-2 border-transparent data-[state=open]:border-[#00a9e0] transition-all"
                    onMouseEnter={() => {
                      setActiveParentId(cat.id);
                      const firstSub = subcategories[0];
                      if (firstSub) setActiveSubId(firstSub.id);
                    }}
                  >
                    {cat.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex w-[900px] min-h-[400px] max-h-[600px] bg-white shadow-2xl overflow-hidden">
                      {/* Left Column: Subcategories */}
                      <div className="w-[250px] border-r bg-slate-50 p-4 space-y-1 overflow-y-auto">
                        {subcategories.map(sub => (
                          <button
                            key={sub.id}
                            className={`w-full text-left px-4 py-3 rounded-md text-[13px] font-bold flex items-center justify-between transition-colors ${
                              activeSubId === sub.id ? "bg-white text-[#00a9e0] shadow-sm" : "hover:bg-white/50 text-slate-700"
                            }`}
                            onMouseEnter={() => setActiveSubId(sub.id)}
                            onClick={() => window.location.href = `/category/${sub.slug}`}
                          >
                            <span className="max-w-[180px] leading-tight">{sub.name}</span>
                            {getSubcategories(sub.id).length > 0 && activeSubId === sub.id && <ChevronRight className="h-4 w-4 shrink-0" />}
                          </button>
                        ))}
                      </div>

                      {/* Right Column: Types & Promo */}
                      <div className="flex-1 p-8 grid grid-cols-2 gap-10 overflow-y-auto">
                        {activeSubId && (
                          <>
                            <div className="space-y-6">
                              <h4 className="text-xl font-display text-[#002b5c] border-b-2 border-[#00a9e0] pb-2 w-fit">
                                {categories?.find(c => c.id === activeSubId)?.name}
                              </h4>
                              <div className="flex flex-col gap-3">
                                {getSubcategories(activeSubId).map(type => (
                                  <Link
                                    key={type.id}
                                    href={`/category/${type.slug}`}
                                    className="text-[14px] font-medium text-slate-600 hover:text-[#00a9e0] hover:translate-x-1 transition-transform inline-flex items-center"
                                  >
                                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100" />
                                    {type.name}
                                  </Link>
                                ))}
                                <Link
                                  href={`/category/${categories?.find(c => c.id === activeSubId)?.slug}`}
                                  className="text-[14px] font-black text-[#00a9e0] hover:underline mt-4 flex items-center gap-2"
                                >
                                  View Collection <ArrowRight className="h-4 w-4" />
                                </Link>
                              </div>
                            </div>
                            
                            <div className="relative rounded-2xl overflow-hidden bg-slate-100 h-full min-h-[300px] group">
                              <img 
                                src={categories?.find(c => c.id === activeSubId)?.image || "https://images.unsplash.com/photo-1596464716127-f9a0859b4bce?w=500&h=500&fit=crop"}
                                alt="Category promo"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h5 className="text-white font-display text-2xl mb-2 drop-shadow-lg">New Season Arrivals</h5>
                                <p className="text-white/90 text-sm mb-6 max-w-[200px] leading-relaxed">Shop our latest premium quality collection.</p>
                                <Button size="sm" variant="secondary" className="w-fit font-black uppercase tracking-widest text-[10px] h-10 px-6 shadow-xl hover:scale-105 active:scale-95 transition-all">Shop Now</Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center relative w-64">
            <input 
              placeholder="Find your product" 
              className="w-full pl-4 pr-10 py-2 text-sm rounded-md border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#00a9e0]/20 focus:bg-white transition-all"
            />
            <Search className="absolute right-3 h-4 w-4 text-slate-400" />
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-slate-700 hover:text-[#00a9e0]">
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative group text-slate-700 hover:text-[#00a9e0]">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e31837] text-[9px] font-bold text-white shadow-sm">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
