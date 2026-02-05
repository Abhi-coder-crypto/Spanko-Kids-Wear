import { useRoute, Link } from "wouter";
import { useProduct } from "@/hooks/use-shop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, ShoppingBag, ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.originalPrice && Number(product.originalPrice) > Number(product.price);
  const discountPercentage = hasDiscount 
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-border/50 shadow-sm relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-accent text-white font-bold px-3 py-1.5 rounded-full text-sm shadow-md">
                  -{discountPercentage}% OFF
                </div>
              )}
            </div>
            {/* Thumbnails (Mockup) */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border/50 cursor-pointer hover:border-primary transition-colors">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Kids Wear
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display text-slate-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <span className="text-muted-foreground text-sm">(124 reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through mb-1">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <Separator className="mb-8" />

            <div className="space-y-6">
              {/* Size Selector Mockup */}
              <div>
                <span className="font-semibold block mb-3">Select Size</span>
                <div className="flex flex-wrap gap-3">
                  {['2T', '3T', '4T', '5', '6'].map((size) => (
                    <button 
                      key={size}
                      className="h-12 w-12 rounded-full border border-input flex items-center justify-center font-medium hover:border-primary hover:text-primary focus:border-primary focus:bg-primary/5 transition-all"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector Mockup */}
              <div>
                <span className="font-semibold block mb-3">Color</span>
                <div className="flex gap-3">
                  {['bg-blue-500', 'bg-pink-500', 'bg-yellow-400'].map((color, i) => (
                    <button 
                      key={i}
                      className={`h-8 w-8 rounded-full ${color} ring-2 ring-offset-2 ring-transparent hover:ring-gray-300 focus:ring-primary transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <div className="flex items-center border border-input rounded-full h-14 w-fit px-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button size="lg" className="flex-1 h-14 rounded-full text-lg shadow-xl shadow-primary/20">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-2 gap-4 text-sm text-muted-foreground bg-gray-50 p-6 rounded-2xl border border-border/50">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" /> Free Shipping over ₹500
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" /> 30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" /> Secure Checkout
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" /> Official Retailer
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
