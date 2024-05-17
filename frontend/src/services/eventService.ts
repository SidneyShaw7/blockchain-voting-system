import api from '../api/api';
import { VotingEventFormValues } from '../types';

const eventService = {
  createEvent: (eventData: VotingEventFormValues) => {
    return api.post('/api/events/create', eventData);
  },
  updateEvent: (eventId: string, eventData: VotingEventFormValues) => {
    return api.put(`/api/events/${eventId}`, eventData);
  },
  deleteEvent: (eventId: string) => {
    return api.delete(`/api/events/${eventId}`);
  },
  getEvent: (eventId: string) => {
    return api.get(`/api/events/${eventId}`);
  },
  voteOnEvent: (eventId: string, optionId: string) => {
    return api.post(`/api/events/${eventId}/vote/${optionId}`);
  },
  getAllEvents: () => {
    return api.get('/api/events/');
  },
};

export default eventService;
