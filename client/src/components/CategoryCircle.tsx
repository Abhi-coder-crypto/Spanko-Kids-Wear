import { Link } from "wouter";
import { motion } from "framer-motion";

interface CategoryCircleProps {
  name: string;
  image: string;
  slug: string;
  color?: string;
}

export function CategoryCircle({ name, image, slug, color = "bg-blue-100" }: CategoryCircleProps) {
  return (
    <Link href={`/shop?category=${slug}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-3 cursor-pointer group"
      >
        <div className={`relative h-28 w-28 md:h-36 md:w-36 rounded-full overflow-hidden ${color} p-1 shadow-md group-hover:shadow-xl transition-shadow border-4 border-white`}>
          <img 
            src={image} 
            alt={name}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
      </motion.div>
    </Link>
  );
}
