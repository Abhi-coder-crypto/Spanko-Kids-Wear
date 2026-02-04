import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/">
              <span className="font-display text-3xl font-bold text-primary cursor-pointer">
                Spanko
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Making kids look cool and feel comfortable since 2024. 
              Quality clothes for your little playmakers.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:text-primary transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:text-pink-500 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:text-blue-400 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/shop?category=baby" className="hover:text-primary transition-colors">Baby (0-24m)</Link></li>
              <li><Link href="/shop?category=toddler" className="hover:text-primary transition-colors">Toddler (2T-5T)</Link></li>
              <li><Link href="/shop?category=kids" className="hover:text-primary transition-colors">Kids (4-14)</Link></li>
              <li><Link href="/shop?filter=deals" className="hover:text-primary transition-colors">Clearance</Link></li>
              <li><Link href="/shop?filter=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Stay in the Loop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive deals and new drops!
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button 
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Spanko Kids Wear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
