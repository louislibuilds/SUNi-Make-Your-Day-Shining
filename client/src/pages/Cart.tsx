import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/ui/image-with-fallback';
import { useCartStore } from '../store/cartStore';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const TAX_RATE = 0.08;

export default function Cart({ onNavigate }: CartPageProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const estimatedTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => onNavigate('products')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Discover products that make everyday shining.
              </p>
              <Button
                onClick={() => onNavigate('products')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.key}>
                    <CardContent className="flex flex-wrap items-center gap-4 p-4">
                      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={item.image}
                          seed={item.id}
                          label={item.name}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-[8rem]">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground">{item.variant}</p>
                        )}
                        <p className="text-orange-600 font-semibold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right w-24 shrink-0">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 mt-1"
                          onClick={() => removeItem(item.key)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Shipping calculated at checkout.
                    </p>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Estimated total</span>
                      <span>${estimatedTotal.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      onClick={() => onNavigate('checkout')}
                    >
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
