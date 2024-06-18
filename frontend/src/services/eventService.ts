import api from '../api/api';
import { VotingEventFormValues } from '../types';

const eventService = {
  createEvent: (eventData: VotingEventFormValues) => api.post('/api/events/create', eventData),
  updateEvent: (eventId: string, eventData: VotingEventFormValues) => api.put(`/api/events/${eventId}`, eventData),
  deleteEvent: (eventId: string) => api.delete(`/api/events/${eventId}`),
  getEvent: (eventId: string) => api.get(`/api/events/${eventId}`),
  voteOnEvent: (eventId: string, optionId: string) => api.post(`/api/events/${eventId}/vote/${optionId}`),
  getAllEvents: () => api.get('/api/events/'),
  inviteUser: (eventId: string, email: string) => api.post(`/api/events/${eventId}/invite`, { email }),
  deleteUserFromEvent: (eventId: string, userId: string) => api.delete(`/api/events/${eventId}/users/${userId}`),
};

export default eventService;
