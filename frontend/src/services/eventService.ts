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
};

export default eventService;

// async function fetchApi(endpoint: string, options: RequestInit) {
//   const response = await fetch(`${apiUrl}${endpoint}`, options);
//   const data = await handleResponse(response);
//   if (!response.ok) {
//     throw new Error(data.error);
//   }
//   return data;
// }

// async function handleResponse(response: Response) {
//   const text = await response.text();
//   return text ? JSON.parse(text) : {};
// }

// const createEvent = async (eventData: VotingEventFormValues) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(eventData),
//   };
//   return fetchApi('/api/events/create', requestOptions);
// };

// const updateEvent = async (eventId: string, eventData: VotingEventFormValues) => {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(eventData),
//   };
//   return fetchApi(`/api/events/${eventId}/update`, requestOptions);
// };

// const deleteEvent = async (eventId: string) => {
//   const requestOptions = {
//     method: 'DELETE',
//   };
//   return fetchApi(`/api/events/${eventId}/delete`, requestOptions);
// };

// const getEvent = async (eventId: string) => {
//   const requestOptions = {
//     method: 'GET',
//   };
//   return fetchApi(`/api/events/${eventId}`, requestOptions);
// };

// export const eventService = {
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   getEvent,
// };
