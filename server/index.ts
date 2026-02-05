import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { storage } from "./storage";

const categoriesData = [
  { name: "INFANT", slug: "infant", image: "https://images.unsplash.com/photo-1522771753035-4a504711a13d?w=300" },
  { name: "BOYS", slug: "boys", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300" },
  { name: "Shirts", slug: "boys-shirts", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 2 },
  { name: "Sets & Suits", slug: "boys-sets-suits", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 2 },
  { name: "Night Dresses (1–12 Years)", slug: "boys-night-dresses", image: "https://images.unsplash.com/photo-1519238263496-4143d207f289?w=300", parentId: 2 },
  { name: "GIRLS", slug: "girls", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300" },
  { name: "Party Dresses / Gowns", slug: "girls-party-dresses", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "Frocks", slug: "girls-frocks", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "Cotton Wear (0–5 Years)", slug: "girls-cotton-wear", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "Casual & Daily Wear", slug: "girls-casual", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "Night Dresses (Printed) (1–12 Years)", slug: "girls-night-dresses", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "Full Sleeves / Half Sleeves", slug: "girls-sleeves", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "Full Pant / Half Pant", slug: "girls-pants", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "Sets & Suits", slug: "girls-sets-suits", image: "https://images.unsplash.com/photo-1512423164964-b86a8368ba89?w=300", parentId: 6 },
  { name: "ETHNIC WEAR", slug: "ethnic-wear", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300" },
  { name: "Boys (6–14 Years)", slug: "boys-ethnic", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 15 },
  { name: "Girls (6–14 Years)", slug: "girls-ethnic", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=300", parentId: 15 },
  { name: "WESTERN WEAR", slug: "western-wear", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },
  { name: "Boys", slug: "western-boys", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 18 },
  { name: "Jacket", slug: "boys-jacket", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 19 },
  { name: "T-Shirt", slug: "boys-tshirt", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 19 },
  { name: "Girls", slug: "western-girls", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 18 },
  { name: "Top", slug: "girls-top", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300", parentId: 22 },
  { name: "BEST SELLER", slug: "best-seller", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },
  { name: "SALE", slug: "sale", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" },
  { name: "FESTIVE COLLECTION", slug: "festive", image: "https://images.unsplash.com/photo-1514039825316-c95a04e38ce7?w=300" }
];

const app = express();
const httpServer = createServer(app);

(async () => {
  const existing = await storage.getCategories();
  // Always re-seed to ensure correct structure
  await storage.clearCategories(); 
  for (const cat of categoriesData) {
    await storage.createCategory(cat);
  }
})();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
