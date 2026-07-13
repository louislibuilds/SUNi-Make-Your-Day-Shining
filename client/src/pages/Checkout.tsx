import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/ui/image-with-fallback';
import { useCartStore } from '../store/cartStore';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userEmail?: string;
}

export default function Checkout({ onNavigate, isLoggedIn, userEmail }: CheckoutPageProps) {
  const cartItems = useCartStore((state) => state.items);
  const placeOrder = useCartStore((state) => state.placeOrder);
  const [currentStep, setCurrentStep] = useState<'info' | 'shipping' | 'payment' | 'review'>('info');
  const [checkoutAs, setCheckoutAs] = useState<'guest' | 'member'>(isLoggedIn ? 'member' : 'guest');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [formData, setFormData] = useState({
    email: userEmail || '',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    sameAsBilling: true,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    createAccount: false,
    subscribeNewsletter: false
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shippingCost = shippingMethod === 'express' ? 19.99 : 9.99;
  const total = subtotal + tax + shippingCost;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[
          { step: 'info', label: 'Contact Info', icon: '1' },
          { step: 'shipping', label: 'Shipping', icon: '2' },
          { step: 'payment', label: 'Payment', icon: '3' },
          { step: 'review', label: 'Review', icon: '4' }
        ].map((item, index) => (
          <div key={item.step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              currentStep === item.step 
                ? 'bg-orange-500 text-white' 
                : index < ['info', 'shipping', 'payment', 'review'].indexOf(currentStep)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {index < ['info', 'shipping', 'payment', 'review'].indexOf(currentStep) ? 
                <Check className="h-4 w-4" /> : item.icon
              }
            </div>
            <span className="ml-2 text-sm hidden sm:inline">{item.label}</span>
            {index < 3 && <div className="w-8 h-px bg-gray-200 mx-4 hidden sm:block" />}
          </div>
        ))}
      </div>
    </div>
  );

  const ContactInfoStep = () => (
    <div className="space-y-6">
      {!isLoggedIn && (
        <Card>
          <CardHeader>
            <CardTitle>Checkout Options</CardTitle>
            <CardDescription>Choose how you'd like to complete your order</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={checkoutAs} onValueChange={(value: string) => setCheckoutAs(value as 'guest' | 'member')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="guest">Guest Checkout</TabsTrigger>
                <TabsTrigger value="member">Create Account</TabsTrigger>
              </TabsList>
              <TabsContent value="guest" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Continue as a guest. You can create an account after your purchase.
                </p>
              </TabsContent>
              <TabsContent value="member" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Create an account to track your orders and earn rewards.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isLoggedIn}
              placeholder="your@email.com"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          {checkoutAs === 'member' && !isLoggedIn && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="createAccount"
                  checked={formData.createAccount}
                  onCheckedChange={(checked: boolean) => handleInputChange('createAccount', !!checked)}
                />
                <Label htmlFor="createAccount" className="text-sm">
                  Create an account for faster checkout next time
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked: boolean) => handleInputChange('subscribeNewsletter', !!checked)}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for exclusive offers
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const ShippingStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Company name"
            />
          </div>
          <div>
            <Label htmlFor="address1">Address</Label>
            <Input
              id="address1"
              value={formData.address1}
              onChange={(e) => handleInputChange('address1', e.target.value)}
              placeholder="123 Main Street"
            />
          </div>
          <div>
            <Label htmlFor="address2">Apartment, suite, etc. (Optional)</Label>
            <Input
              id="address2"
              value={formData.address2}
              onChange={(e) => handleInputChange('address2', e.target.value)}
              placeholder="Apt 4B"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="San Francisco"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value: string) => handleInputChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="94102"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="standard" id="standard" />
                <div>
                  <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                  <p className="text-sm text-muted-foreground">5-7 business days</p>
                </div>
              </div>
              <span className="font-medium">$9.99</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="express" id="express" />
                <div>
                  <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                  <p className="text-sm text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              <span className="font-medium">$19.99</span>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <CreditCard className="h-5 w-5" />
              <Label htmlFor="card">Credit/Debit Card</Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="paypal" id="paypal" />
              <div className="h-5 w-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="apple" id="apple" />
              <div className="h-5 w-5 bg-black rounded flex items-center justify-center text-white text-xs">??</div>
              <Label htmlFor="apple">Apple Pay</Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'card' && (
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                  />
                </div>
                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsBilling"
              checked={formData.sameAsBilling}
              onCheckedChange={(checked: boolean) => handleInputChange('sameAsBilling', !!checked)}
            />
            <Label htmlFor="sameAsBilling">Same as shipping address</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ReviewStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
              <p className="text-sm text-muted-foreground">{formData.firstName} {formData.lastName}</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <p className="text-sm text-muted-foreground">
                {formData.address1}<br />
                {formData.city}, {formData.state} {formData.zipCode}
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Payment Method</h4>
              <p className="text-sm text-muted-foreground">
                {paymentMethod === 'card'
                  ? `Card ending in ${formData.cardNumber.slice(-4) || '••••'}`
                  : paymentMethod === 'paypal'
                  ? 'PayPal'
                  : 'Apple Pay'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Shield className="h-5 w-5 text-green-600" />
        <span className="text-sm text-green-700">Your payment information is secure and encrypted</span>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'info': return <ContactInfoStep />;
      case 'shipping': return <ShippingStep />;
      case 'payment': return <PaymentStep />;
      case 'review': return <ReviewStep />;
      default: return <ContactInfoStep />;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'info': return formData.email && formData.firstName && formData.lastName;
      case 'shipping': return formData.address1 && formData.city && formData.state && formData.zipCode;
      case 'payment': return paymentMethod === 'card' ? 
        (formData.cardNumber && formData.expiryDate && formData.cvv && formData.nameOnCard) : true;
      case 'review': return true;
      default: return false;
    }
  };

  const handleNext = () => {
    const steps = ['info', 'shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1] as any);
    } else {
      placeOrder({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
        shippingMethod,
        paymentMethod,
        subtotal,
        tax,
        shipping: shippingCost,
        total,
      });
      onNavigate('order-confirmation');
    }
  };

  const handleBack = () => {
    const steps = ['info', 'shipping', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1] as any);
    } else {
      onNavigate('cart');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-3">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add a few products before heading to checkout.
          </p>
          <Button
            onClick={() => onNavigate('products')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={handleBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          <StepIndicator />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack}>
                  {currentStep === 'info' ? 'Back to Cart' : 'Back'}
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  {currentStep === 'review' ? 'Place Order' : 'Continue'}
                </Button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div key={item.key} className="flex items-center space-x-3">
                      <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={item.image}
                          seed={item.id}
                          label={item.name}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                          {item.variant ? ` · ${item.variant}` : ''}
                        </p>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  {/* Order Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-700">Secure 256-bit SSL encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}