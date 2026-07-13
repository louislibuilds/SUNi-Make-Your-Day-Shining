export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  joinDate: string;
  orders: string[];
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  nickname?: string;
}

export interface UserPreferences {
  emailMarketing: boolean;
  smsMarketing: boolean;
  newsletter: boolean;
  orderUpdates: boolean;
}

export interface Order {
  id: string;
  userId?: string; // undefined for guest orders
  guestEmail?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  inStock: boolean;
}

// Mock data
export const mockUser: User = {
  id: 'user-123',
  email: 'john.doe@email.com',
  firstName: 'John',
  lastName: 'Doe',
  isAdmin: false,
  joinDate: '2023-06-15',
  orders: ['order-1', 'order-2'],
  addresses: [
    {
      id: 'addr-1',
      type: 'shipping',
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'US',
      phone: '(555) 123-4567',
      isDefault: true
    }
  ],
  paymentMethods: [
    {
      id: 'pm-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      nickname: 'Personal Card'
    }
  ],
  preferences: {
    emailMarketing: true,
    smsMarketing: false,
    newsletter: true,
    orderUpdates: true
  }
};

export const mockAdmin: User = {
  id: 'admin-123',
  email: 'admin@suni.com',
  firstName: 'Admin',
  lastName: 'User',
  isAdmin: true,
  joinDate: '2020-01-01',
  orders: [],
  addresses: [],
  paymentMethods: [],
  preferences: {
    emailMarketing: false,
    smsMarketing: false, 
    newsletter: false,
    orderUpdates: true
  }
};

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-123',
    status: 'delivered',
    items: [
      {
        productId: 1,
        name: 'Luminous Home Diffuser',
        price: 89.99,
        quantity: 1,
        image: ''
      }
    ],
    subtotal: 89.99,
    tax: 7.20,
    shipping: 9.99,
    total: 107.18,
    shippingAddress: mockUser.addresses[0],
    billingAddress: mockUser.addresses[0],
    paymentMethod: mockUser.paymentMethods[0],
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-20',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'order-2',
    guestEmail: 'guest@email.com',
    status: 'processing',
    items: [
      {
        productId: 2,
        name: 'Minimalist Ceramic Vase Set',
        price: 45.99,
        quantity: 2,
        image: ''
      }
    ],
    subtotal: 91.98,
    tax: 7.36,
    shipping: 9.99,
    total: 109.33,
    shippingAddress: {
      id: 'guest-addr',
      type: 'shipping',
      firstName: 'Jane',
      lastName: 'Smith',
      address1: '456 Oak Ave',
      city: 'Los Angeles', 
      state: 'CA',
      zipCode: '90210',
      country: 'US',
      isDefault: false
    },
    billingAddress: {
      id: 'guest-billing',
      type: 'billing',
      firstName: 'Jane',
      lastName: 'Smith',
      address1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA', 
      zipCode: '90210',
      country: 'US',
      isDefault: false
    },
    paymentMethod: {
      id: 'guest-pm',
      type: 'card',
      last4: '1234',
      brand: 'Mastercard',
      isDefault: false
    },
    orderDate: '2024-01-20',
    estimatedDelivery: '2024-01-25'
  }
];