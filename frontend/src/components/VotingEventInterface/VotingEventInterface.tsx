import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEvent, voteOnEvent } from '../../features/manageEvent';
import { Option } from '../../types';
import { useDispatch, RootState } from '../../app/store';
import { error as showError} from '../../features/alert/alertSlice';

const VotingEventInterface = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const dispatch = useDispatch();
  const event = useSelector((state: RootState) => state.votingEvent.data);
  const isLoading = useSelector((state: RootState) => state.votingEvent.isProcessing);

  useEffect(() => {
    if (eventId) {
      dispatch(getEvent(eventId));
    }
  }, [dispatch, eventId]);

//   if (eventId) {
//     dispatch(voteOnEvent({ eventId, optionId: 'someOptionId' }));
//   } else {
//     console.error('Event ID is undefined.');
//     dispatch(showError({ message: 'Event ID is undefined.' }));
//   }

  const handleVote = (optionId: string) => {
    if (eventId) {
      dispatch(voteOnEvent({ eventId, optionId }));
    } else {
      console.error('Event ID is undefined.');
      dispatch(showError({ message: 'Event ID is undefined.' }));
    }
  };

  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  return (
    <div className="event-container">
      <h1 className="text-2xl font-bold text-center">{event.title}</h1>
      <p className="text-lg">{event.description}</p>
      <ul>
        {event.options.map((option: Option, index: number) => (
          <li key={index} className="my-2">
            <div className="option-details">
              <p className="option-text">{option.name || option.option}</p>
              <button
                onClick={() => handleVote(option.id)}
                className="vote-button bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
              >
                Vote
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingEventInterface;
