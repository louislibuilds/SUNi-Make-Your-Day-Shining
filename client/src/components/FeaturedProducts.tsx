import { Star, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './ui/image-with-fallback';
import { useCatalogProducts } from '../hooks/useCatalogProducts';

interface FeaturedProductsProps {
  onNavigate: (page: string) => void;
}

export function FeaturedProducts({ onNavigate }: FeaturedProductsProps) {
  const { products, loading } = useCatalogProducts({ featured: true, limit: 4 });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="text-orange-500">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked items that bring joy and functionality to your daily routine
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading products…</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    seed={product.id}
                    label={product.name}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.isBestSeller && (
                    <Badge
                      variant="secondary"
                      className="absolute top-3 left-3 bg-white/90 text-orange-600 border-orange-200"
                    >
                      Featured
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white h-8 w-8"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
            onClick={() => onNavigate('products')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
