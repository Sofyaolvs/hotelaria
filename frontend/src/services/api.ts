import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const hotelService = {
  getAll: () => api.get('/hotel').then(res => res.data),
  getById: (id: string) => api.get(`/hotel/${id}`).then(res => res.data),
  create: (data: { name: string; city: string; rooms: number }) =>
    api.post('/hotel', data).then(res => res.data),
  delete: (id: string) => api.delete(`/hotel/${id}`),
};

export const guestService = {
  getAll: () => api.get('/guest').then(res => res.data),
  getById: (id: string) => api.get(`/guest/${id}`).then(res => res.data),
  create: (data: { name: string; document: string; phone: string; email: string; bookingIds?: string[] }) =>
    api.post('/guest', data).then(res => res.data),
  update: (id: string, data: { name?: string; document?: string; phone?: string; email?: string; bookingIds?: string[] }) =>
    api.patch(`/guest/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/guest/${id}`),
};

export const bookingService = {
  getAll: () => api.get('/bookings').then(res => res.data),
  getById: (id: number) => api.get(`/bookings/${id}`).then(res => res.data),
  getGuests: (id: number) => api.get(`/bookings/${id}/guests`).then(res => res.data),
  getRoomTypes: () => api.get('/bookings/room-types').then(res => res.data),
  create: (data: { hotelId: string; checkInDate: string; checkOutDate: string; responsibleName: string; roomType: string }) =>
    api.post('/bookings', data).then(res => res.data),
  delete: (id: number) => api.delete(`/bookings/${id}`),
};

export default api;
