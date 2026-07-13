import api from './api';
import type { Payment, PaymentMethod } from '../store/paymentStore';

export interface CreatePaymentRequest {
  orderId: string;
  amount: number;
  paymentMethodId: string;
}

export interface CreatePaymentMethodRequest {
  type: 'card' | 'paypal' | 'bank_transfer';
  cardNumber?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cvv?: string;
  cardholderName?: string;
  isDefault?: boolean;
}

export interface PaymentResponse {
  payment: Payment;
  clientSecret?: string; // For Stripe
}

export const paymentService = {
  createPayment: async (data: CreatePaymentRequest): Promise<PaymentResponse> => {
    const response = await api.post('/payments', data);
    return response.data;
  },

  confirmPayment: async (paymentId: string): Promise<Payment> => {
    const response = await api.post(`/payments/${paymentId}/confirm`);
    return response.data;
  },

  getPayments: async (): Promise<Payment[]> => {
    const response = await api.get('/payments');
    return response.data;
  },

  getPaymentById: async (id: string): Promise<Payment> => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  // Payment Methods
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const response = await api.get('/payments/methods');
    return response.data;
  },

  createPaymentMethod: async (data: CreatePaymentMethodRequest): Promise<PaymentMethod> => {
    const response = await api.post('/payments/methods', data);
    return response.data;
  },

  updatePaymentMethod: async (id: string, data: Partial<PaymentMethod>): Promise<PaymentMethod> => {
    const response = await api.put(`/payments/methods/${id}`, data);
    return response.data;
  },

  deletePaymentMethod: async (id: string): Promise<void> => {
    await api.delete(`/payments/methods/${id}`);
  },

  setDefaultPaymentMethod: async (id: string): Promise<PaymentMethod> => {
    const response = await api.put(`/payments/methods/${id}/default`);
    return response.data;
  },

  // Refunds
  createRefund: async (paymentId: string, amount?: number): Promise<Payment> => {
    const response = await api.post(`/payments/${paymentId}/refund`, { amount });
    return response.data;
  }
};
