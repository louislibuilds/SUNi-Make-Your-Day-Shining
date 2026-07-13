import { ProductCatalog } from '../components/ProductCatalog';
import { ImageWithFallback } from '../components/ui/image-with-fallback';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  category: string;
}

const categoryInfo = {
  "Home & Living": {
    title: "Home & Living",
    description: "Transform your space with beautiful, functional pieces that bring comfort and style to every room.",
    image: "",
    highlights: [
      "Handpicked for quality and style",
      "Sustainable and eco-friendly options",
      "Perfect for any home aesthetic",
      "Transform any space instantly"
    ]
  },
  "Kitchen Essentials": {
    title: "Kitchen Essentials",
    description: "Make cooking a joyful, efficient experience with smart storage solutions and beautiful kitchen accessories.",
    image: "",
    highlights: [
      "Smart organization solutions",
      "Premium materials and construction",
      "Space-saving designs",
      "Easy to clean and maintain"
    ]
  },
  "Work & Productivity": {
    title: "Work & Productivity", 
    description: "Create an inspiring workspace that motivates and enhances your daily productivity.",
    image: "",
    highlights: [
      "Ergonomic and functional design",
      "Premium materials for durability",
      "Cable management solutions",
      "Wireless charging compatibility"
    ]
  },
  "Wellness & Self-Care": {
    title: "Wellness & Self-Care",
    description: "Nurture your mind, body, and spirit with carefully curated wellness products for daily self-care rituals.",
    image: "",
    highlights: [
      "Natural and organic ingredients",
      "Aromatherapy and relaxation focused",
      "Sustainable packaging",
      "Complete wellness experience"
    ]
  },
  "Garden & Outdoor": {
    title: "Garden & Outdoor",
    description: "Bring nature into your life with beautiful planters, gardening tools, and outdoor accessories.",
    image: "",
    highlights: [
      "Beginner-friendly tools and guides",
      "Weather-resistant materials",
      "Beautiful and functional designs",
      "Complete plant care solutions"
    ]
  }
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const info = categoryInfo[category as keyof typeof categoryInfo];

  if (!info) {
    return <ProductCatalog selectedCategory={category} />;
  }

  return (
    <div className="min-h-screen">
      {/* Category Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>Home</span>
                  <ArrowRight className="h-4 w-4" />
                  <span>Categories</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-orange-600">{info.title}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  {info.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {info.description}
                </p>
              </div>
              
              {/* Highlights */}
              <div className="space-y-3">
                {info.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3"
              >
                Shop {info.title}
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src={info.image}
                  alt={info.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200 rounded-full opacity-50 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <ProductCatalog selectedCategory={category} />
    </div>
  );
}

