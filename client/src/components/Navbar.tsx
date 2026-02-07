import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, User, Menu, ChevronRight, X } from "lucide-react";
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
        {/* Mobile Menu - Hidden for now */}
        <div className="md:hidden invisible">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group mx-auto md:mx-0">
          <div className="flex flex-col leading-none items-center md:items-start">
            <span className="font-display text-4xl font-black tracking-tighter text-[#002b5c] group-hover:text-primary transition-colors">
              spanko
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary ml-1">
              Nice One
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Empty for now */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
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
