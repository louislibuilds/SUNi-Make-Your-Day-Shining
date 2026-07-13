import { useState } from 'react';
import { Star, Heart, Minus, Plus, ShoppingCart, ArrowLeft, Check, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/ui/image-with-fallback';
import { useProductDetailStore } from '../store/productDetailStore';
import { useCartStore } from '../store/cartStore';

interface ProductDetailProps {
  onNavigate: (page: string) => void;
}

export default function ProductDetail({ onNavigate }: ProductDetailProps) {
  const product = useProductDetailStore((state) => state.selectedProduct);
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0],
  );
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold mb-3">No product selected</h1>
          <p className="text-muted-foreground mb-6">
            Pick an item from the catalog to see its details.
          </p>
          <Button
            onClick={() => onNavigate('products')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.min(10, Math.max(1, prev + change)));
  };

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white/70 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-1 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </button>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <ImageWithFallback
                src={product.image}
                seed={product.id}
                label={product.name}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/70 p-3">
                <Truck className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Free shipping</p>
              </div>
              <div className="rounded-xl bg-white/70 p-3">
                <ShieldCheck className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">2-year warranty</p>
              </div>
              <div className="rounded-xl bg-white/70 p-3">
                <RotateCcw className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">30-day returns</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {product.isBestSeller && (
                  <Badge className="bg-orange-500 text-white">Best Seller</Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-green-500 text-white">New</Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  {product.brand} · {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-bold text-orange-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {savings > 0 && (
                  <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                    Save ${savings.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="font-medium">Color: </span>
                <span className="text-muted-foreground">{selectedColor}</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                        selectedColor === color
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Quantity + Add to cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="h-10 w-10"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white h-12"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-orange-200 text-orange-700 hover:bg-orange-50"
                  onClick={() => onNavigate('cart')}
                >
                  View Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-orange-200 text-orange-700 hover:bg-orange-50"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
