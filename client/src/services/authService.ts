import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUser(raw: any): AuthUser {
  const role = raw.role === 'admin' ? 'admin' : 'user';
  return {
    id: raw._id ?? raw.id ?? '',
    name: raw.name ?? '',
    email: raw.email ?? '',
    role,
  };
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    const payload = response.data?.data;
    return {
      user: mapUser(payload.user),
      token: payload.tokens.accessToken,
    };
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    const payload = response.data?.data;
    return {
      user: mapUser(payload.user),
      token: payload.tokens.accessToken,
    };
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getProfile: async (): Promise<AuthUser> => {
    const response = await api.get('/auth/profile');
    return mapUser(response.data?.data?.user ?? response.data?.user);
  },

  updateProfile: async (data: Partial<RegisterRequest>): Promise<AuthUser> => {
    const response = await api.put('/auth/profile', data);
    return mapUser(response.data?.data?.user ?? response.data?.user);
  },
};
