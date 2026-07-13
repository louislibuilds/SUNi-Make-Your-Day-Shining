import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './ui/image-with-fallback';

interface CategoriesProps {
  onNavigate: (page: string) => void;
}

const categories = [
  {
    id: 1,
    name: "Home & Living",
    description: "Transform your space with beautiful, functional pieces",
    productCount: 145
  },
  {
    id: 2,
    name: "Kitchen Essentials",
    description: "Make cooking a joyful, efficient experience",
    productCount: 89
  },
  {
    id: 3,
    name: "Wellness & Self-Care",
    description: "Nurture your mind, body, and spirit daily",
    productCount: 67
  },
  {
    id: 4,
    name: "Work & Productivity",
    description: "Create an inspiring workspace that motivates",
    productCount: 123
  }
];

export function Categories({ onNavigate }: CategoriesProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Shop by <span className="text-orange-500">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore curated collections designed to enhance every aspect of your life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
              onClick={() => onNavigate(`category-${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback 
                  seed={`category-${category.id}`}
                  label={category.name}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm opacity-90">{category.productCount} Products</div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {category.description}
                  </p>
                </div>

                <Button 
                  variant="ghost" 
                  className="group/btn w-full justify-between text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(`category-${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`);
                  }}
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Category Banner */}
        <div className="mt-16">
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 space-y-6">
                <h3 className="text-3xl font-bold">
                  New Arrivals Collection
                </h3>
                <p className="text-lg text-muted-foreground">
                  Be the first to discover our latest curated products that bring fresh energy to your daily routine.
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    onClick={() => onNavigate('products')}
                  >
                    Shop New Arrivals
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    onClick={() => onNavigate('about')}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="h-80 lg:h-full">
                <ImageWithFallback
                  seed="new-arrivals"
                  label="New Arrivals"
                  alt="New arrivals"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}