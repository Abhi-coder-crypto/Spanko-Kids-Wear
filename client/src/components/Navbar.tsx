import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, User, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
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
  const { data: categories } = useCategories();

  // Filter top-level categories (Baby, Toddler, Kids)
  const mainCategories = categories?.filter(c => !c.parentId) || [];
  
  // Get subcategories for a parent category
  const getSubcategories = (parentId: number) => {
    return categories?.filter(c => c.parentId === parentId) || [];
  };

  const navLinks = [
    { name: "New & Trending", href: "/shop?filter=trending" },
    { name: "Deals", href: "/shop?filter=deals" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border/40">
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground md:text-sm">
        🎉 Free Shipping on Orders Over $50 | Shop Now & Save! 🚀
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
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {mainCategories.map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <Link href={`/category/${cat.slug}`} className="text-lg font-bold">
                      {cat.name}
                    </Link>
                    <div className="pl-4 flex flex-col gap-2">
                      {getSubcategories(cat.id).map(sub => (
                        <Link key={sub.id} href={`/category/${sub.slug}`} className="text-md text-muted-foreground">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-display text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent cursor-pointer">
            Spanko
          </span>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {mainCategories.map((cat) => {
              const subs = getSubcategories(cat.id);
              if (subs.length === 0) {
                return (
                  <NavigationMenuItem key={cat.id}>
                    <NavigationMenuLink asChild>
                      <Link href={`/category/${cat.slug}`} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                        {cat.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={cat.id}>
                  <NavigationMenuTrigger className="text-sm font-medium h-9 px-4 py-2">
                    {cat.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {subs.map((sub) => (
                        <li key={sub.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/category/${sub.slug}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-bold leading-none">{sub.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Explore {sub.name} collection
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
            
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink asChild>
                  <Link href={link.href} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-auto'}`}>
            {isSearchOpen ? (
              <div className="relative w-full flex items-center">
                <input 
                  autoFocus
                  placeholder="Search products..." 
                  className="w-full pl-3 pr-10 py-1.5 text-sm rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Search className="absolute right-3 h-4 w-4 text-muted-foreground" />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <User className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative group">
            <ShoppingBag className="h-5 w-5 group-hover:text-primary transition-colors" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
