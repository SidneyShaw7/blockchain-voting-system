import { useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../store';
import { getAllEvents } from '../../features/manageEvent';
import { useNavigate } from 'react-router-dom';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Tooltip from '@mui/material/Tooltip';

const UserEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: events, isProcessing, isError, errorMessage } = useSelector((state: RootState) => state.userEvents);
  const userId = useSelector((state: RootState) => state.login.data?.user.id);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  if (isProcessing) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center mt-4">Error: {errorMessage}</div>;
  }

  if (!events || events.length === 0) {
    return <div className="text-gray-500 text-center mt-4">No events found.</div>;
  }

  const handleViewEvent = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Events</h1>
      <ul className="space-y-6">
        {events.map((event) => {
          const hasUserVoted = userId && event.options.some((option) => option.voters.includes(userId));
          const isAdmin = event.createdBy === userId;

          return (
            <li key={event.id} className="relative border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-2 right-2">
                {isAdmin && (
                  <Tooltip title="Admin">
                    <SupervisorAccountIcon className="text-blue-500" />
                  </Tooltip>
                )}
                {hasUserVoted ? (
                  <Tooltip title="Voted">
                    <TaskAltIcon className="text-green-500" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Awaiting vote">
                    <NewReleasesIcon className="text-yellow-500" />
                  </Tooltip>
                )}
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{event.title}</h2>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <div className="flex justify-between text-gray-500 mb-2">
                <span>Start Date: {new Date(event.startDate).toLocaleDateString()}</span>
                <span>End Date: {new Date(event.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 mb-2">
                <span>Type: {event.eventType}</span>
                <span>Storage: {event.storageType}</span>
              </div>
              <p className="text-gray-500 mb-4">Votes: {event.options.reduce((sum, option) => sum + option.votes, 0)}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleViewEvent(event.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  View Event
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserEvents;
