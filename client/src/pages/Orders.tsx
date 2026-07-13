import { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Star,
  MessageCircle,
  Download,
  RotateCcw
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ImageWithFallback } from '../components/ui/image-with-fallback';
import { mockOrders, type Order } from '../data/users';
import { useCartStore } from '../store/cartStore';

interface OrderPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  orderType: 'history' | 'tracking' | 'confirmation';
  orderId?: string;
}

export default function Orders({ onNavigate, isLoggedIn, orderType }: OrderPageProps) {
  const lastOrder = useCartStore((state) => state.lastOrder);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orderType === 'confirmation' ? lastOrder ?? mockOrders[0] : null
  );
  const [trackingEmail, setTrackingEmail] = useState('');
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'processing': return <Package className="h-5 w-5 text-blue-600" />;
      case 'shipped': return <Truck className="h-5 w-5 text-purple-600" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const TrackingProgress = ({ order }: { order: Order }) => {
    const steps = [
      { status: 'pending', label: 'Order Placed', date: order.orderDate },
      { status: 'processing', label: 'Processing', date: '2024-01-16' },
      { status: 'shipped', label: 'Shipped', date: '2024-01-17' },
      { status: 'delivered', label: 'Delivered', date: order.status === 'delivered' ? '2024-01-19' : undefined }
    ];

    const currentStepIndex = steps.findIndex(step => step.status === order.status);

    return (
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.status} className="flex items-start space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              index <= currentStepIndex 
                ? 'bg-orange-500 border-orange-500 text-white' 
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {getStatusIcon(step.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </h4>
                {step.date && (
                  <span className={`text-sm ${index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'}`}>
                    {step.date}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-px h-8 ml-4 mt-2 ${
                  index < currentStepIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const OrderConfirmationContent = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Message */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-700">Order Confirmed!</h1>
        <p className="text-xl text-muted-foreground">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <span>Order #{selectedOrder?.id}</span>
          <span>•</span>
          <span>{selectedOrder?.orderDate}</span>
        </div>
      </div>

      {/* Order Details */}
      {selectedOrder && (
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <ImageWithFallback
                    src={item.image}
                    seed={item.name}
                    label={item.name}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${selectedOrder.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${selectedOrder.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedOrder.shippingAddress.address1}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  </p>
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex items-center space-x-2 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">
                        Estimated delivery: {selectedOrder.estimatedDelivery}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-muted-foreground">
                      We'll prepare your items for shipment within 1-2 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div>
                    <p className="font-medium">Shipping Updates</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive tracking information once your order ships.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-muted-foreground">
                      Questions? Contact us at hello@suni.com or 1-800-SUNI-HELP
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <Button onClick={() => onNavigate('products')} variant="outline">
          Continue Shopping
        </Button>
        <Button 
          onClick={() => onNavigate(isLoggedIn ? 'profile' : 'order-tracking')}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
        >
          {isLoggedIn ? 'View My Orders' : 'Track Order'}
        </Button>
      </div>
    </div>
  );

  const OrderHistoryContent = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order History</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      {mockOrders.map((order) => (
        <Card key={order.id} className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h3 className="font-semibold">Order #{order.id}</h3>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{order.orderDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              {order.items.slice(0, 3).map((item, index) => (
                <ImageWithFallback
                  key={index}
                  src={item.image}
                  seed={item.name}
                  label={item.name}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ))}
              {order.items.length > 3 && (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-muted-foreground">
                  +{order.items.length - 3}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                {order.trackingNumber && ` • Tracking: ${order.trackingNumber}`}
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </Button>
                {order.status === 'delivered' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                        <DialogDescription>
                          Share your experience with this order
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Rating</Label>
                          <div className="flex space-x-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`h-8 w-8 ${
                                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                <Star className="h-6 w-6 fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="review">Your Review</Label>
                          <Textarea
                            id="review"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Tell us about your experience..."
                            className="mt-2"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                            Submit Review
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reorder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const OrderTrackingContent = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
        <p className="text-xl text-muted-foreground">
          Enter your order details to get real-time updates
        </p>
      </div>

      {!selectedOrder ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Enter your order information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orderIdInput">Order ID</Label>
              <Input
                id="orderIdInput"
                value={trackingOrderId}
                onChange={(e) => setTrackingOrderId(e.target.value)}
                placeholder="order-123"
              />
            </div>
            <div>
              <Label htmlFor="emailInput">Email Address</Label>
              <Input
                id="emailInput"
                type="email"
                value={trackingEmail}
                onChange={(e) => setTrackingEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              onClick={() => setSelectedOrder(mockOrders[0])}
              disabled={!trackingOrderId || !trackingEmail}
            >
              Track Order
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(selectedOrder.status)}
                <span>Order #{selectedOrder.id}</span>
              </CardTitle>
              <CardDescription>
                Order placed on {selectedOrder.orderDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrackingProgress order={selectedOrder} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={item.image}
                      seed={item.name}
                      label={item.name}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                      </p>
                      <p className="text-muted-foreground">
                        {selectedOrder.shippingAddress.address1}<br />
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-700">Tracking Number</p>
                        <p className="text-sm text-blue-600">{selectedOrder.trackingNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setSelectedOrder(null)}
              >
                Track Another Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (orderType) {
      case 'confirmation': return <OrderConfirmationContent />;
      case 'history': return <OrderHistoryContent />;
      case 'tracking': return <OrderTrackingContent />;
      default: return <OrderConfirmationContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {orderType !== 'confirmation' && (
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => onNavigate('home')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        )}
        
        {renderContent()}

        {selectedOrder && orderType === 'history' && (
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Order Details - #{selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Order placed on {selectedOrder.orderDate}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Items Ordered</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <ImageWithFallback
                          src={item.image}
                          seed={item.name}
                          label={item.name}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p className="text-muted-foreground">
                      {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}<br />
                      {selectedOrder.shippingAddress.address1}<br />
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Order Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${selectedOrder.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}