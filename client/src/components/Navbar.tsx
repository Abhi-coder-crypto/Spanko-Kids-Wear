import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "New & Trending", href: "/shop?filter=trending" },
    { name: "Baby", href: "/shop?category=baby" },
    { name: "Toddler", href: "/shop?category=toddler" },
    { name: "Kids", href: "/shop?category=kids" },
    { name: "Deals", href: "/shop?filter=deals" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border/40">
      {/* Top promotional bar */}
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
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

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
