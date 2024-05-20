import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent, voteOnEvent } from '../../features/manageEvent';
import { OptionDB } from '../../types';
import { useDispatch, RootState, useSelector } from '../../store';
import { error as showError } from '../../features/alert/alertSlice';

const VotingEventInterface = () => {
  console.log('VotingEventInterface component re-render');

  const { eventId } = useParams<{ eventId?: string }>();
  const dispatch = useDispatch();
  const { data: event, isProcessing } = useSelector((state: RootState) => state.votingEvent);
  const userId = useSelector((state: RootState) => state.login.data?.user.id);
  console.log('userId from selector:', userId);

  useEffect(() => {
    if (eventId) {
      dispatch(getEvent(eventId));
    }
  }, [dispatch, eventId]);

  const handleVote = async (optionId: string) => {
    if (eventId) {
      try {
        await dispatch(voteOnEvent({ eventId, optionId })).unwrap();
        dispatch(getEvent(eventId));
      } catch (error) {
        console.error('Failed to vote on event:', error);
        dispatch(showError({ message: 'Failed to vote on event.' }));
      }
    } else {
      console.error('Event ID is undefined.');
      dispatch(showError({ message: 'Event ID is undefined.' }));
    }
  };

  if (isProcessing) {
    return <div>Loading event details...</div>;
  }

  if (!event) {
    return console.log(event), (<div>No event found.</div>);
  }

  console.log('User ID:', userId);
  console.log('Event options:', event.options);
  const hasUserVoted = userId && event.options.some((option) => option.voters.includes(userId));
  console.log('Has User Voted:', hasUserVoted);

  return (
    <div className="event-container max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">{event.title}</h1>
      <p className="text-lg mb-4">{event.description}</p>
      <ul className="space-y-4">
        {event.options.map((option: OptionDB) => (
          <li key={option.id} className="my-2 bg-gray-100 p-4 rounded-lg shadow">
            <div className="option-details flex justify-between items-center">
              <p className="option-text text-lg">{option.name || option.option}</p>
              {!hasUserVoted && (
                <button onClick={() => handleVote(option.id)} className="vote-button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                  Vote
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {hasUserVoted && <div className="text-center mt-4 text-green-600">You have already voted</div>}
    </div>
  );
};

export default VotingEventInterface;
