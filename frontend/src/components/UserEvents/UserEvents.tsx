import { useEffect, } from 'react';
import { useDispatch, useSelector, RootState } from '../../app/store';
import { getAllEvents } from '../../features/manageEvent';
import { useNavigate } from 'react-router-dom';


const UserEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: events, isProcessing, isError, errorMessage } = useSelector((state: RootState) => state.userEvents);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  if (isProcessing) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!events || events.length === 0) {
    return <div>No events found.</div>;
  }

  const handleViewEvent = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Events</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border border-gray-300 rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700 mb-2">{event.description}</p>
            <p className="text-gray-500 mb-1">Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
            <p className="text-gray-500 mb-1">End Date: {new Date(event.endDate).toLocaleDateString()}</p>
            <p className="text-gray-500 mb-1">Type: {event.eventType}</p>
            <p className="text-gray-500 mb-1">Storage: {event.storageType}</p>
            <p className="text-gray-500">Votes: {event.options.reduce((sum, option) => sum + option.votes, 0)}</p>
            <button
              onClick={() => handleViewEvent(event.id)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              View Event
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEvents;
