import { Button } from './ui/button';
import { ImageWithFallback } from './ui/image-with-fallback';
import { PRODUCT_PLACEHOLDER_IMAGE } from '../lib/media';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Makes Everyday{' '}
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Shining
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover products that brighten your daily life. From innovative home solutions to wellness essentials, 
                we curate items that add sparkle to your everyday moments.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3"
                onClick={() => onNavigate('products')}
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-orange-200 text-orange-700 hover:bg-orange-50 px-8 py-3"
                onClick={() => onNavigate('about')}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-orange-600">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">4.9</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-black/10">
              <ImageWithFallback
                src={PRODUCT_PLACEHOLDER_IMAGE}
                alt="SUNi storefront preview"
                className="w-full h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}