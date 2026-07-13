import api from './api';
import type { Order, OrderItem, ShippingAddress } from '../store/orderStore';

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface UpdateOrderRequest {
  status?: Order['status'];
  trackingNumber?: string;
}

export interface OrderFilters {
  status?: Order['status'];
  page?: number;
  limit?: number;
}

export interface OrderResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

export const orderService = {
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getOrders: async (filters?: OrderFilters): Promise<OrderResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrder: async (id: string, data: UpdateOrderRequest): Promise<Order> => {
    const response = await api.put(`/orders/${id}`, data);
    return response.data;
  },

  cancelOrder: async (id: string): Promise<Order> => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },

  // Admin functions
  getAllOrders: async (filters?: OrderFilters): Promise<OrderResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/admin/orders?${params.toString()}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await api.put(`/admin/orders/${id}/status`, { status });
    return response.data;
  }
};
