import { Link } from "wouter";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && Number(product.originalPrice) > Number(product.price);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col gap-3"
    >
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-blue-500 rounded-md shadow-sm">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-accent rounded-md shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Image */}
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Quick Add Overlay */}
        <button 
          className="absolute bottom-3 right-3 h-10 w-10 flex items-center justify-center rounded-full bg-white text-foreground shadow-lg opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to cart logic
          }}
        >
          <Plus className="h-5 w-5" />
        </button>
      </Link>

      <div className="space-y-1">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-primary">
            ${product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
