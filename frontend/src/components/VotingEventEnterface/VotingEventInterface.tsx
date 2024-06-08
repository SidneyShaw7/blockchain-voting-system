import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent, voteOnEvent } from '../../features/manageEvent';
import { OptionDB } from '../../types';
import { useDispatch, RootState, useSelector } from '../../store';
import { error as showError } from '../../features/alert/alertSlice';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';

const VotingEventInterface = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const dispatch = useDispatch();
  const { data: event, isProcessing } = useSelector((state: RootState) => state.votingEvent);
  const userId = useSelector((state: RootState) => state.login.data?.user.id);

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

  const getOptionColor = (optionText: string) => {
    switch (optionText) {
      case 'Yes, I approve':
        return 'bg-green-500';
      case 'No, I reject':
        return 'bg-red-500';
      case 'Abstain':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getOptionPercentage = (optionVotes: number, totalVotes: number) => {
    return totalVotes ? (optionVotes / totalVotes) * 100 : 0;
  };

  const totalVotes = event.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="event-container max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">{event.title}</h1>
      <p className="text-lg mb-6">{event.description}</p>
      <ul className="space-y-4">
        {event.options.map((option: OptionDB) => {
          const optionPercentage = getOptionPercentage(option.votes, totalVotes);
          const isVotedOption = option.voters.includes(userId || '');

          return (
            <li key={option.id} className="p-4 bg-gray-50 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-lg font-medium">{option.name || option.option}</p>
                  {event.resultVisibility && (
                    <div className="relative w-full h-6 mt-2 bg-gray-200 rounded-full">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full ${getOptionColor(option.option)}`}
                        style={{ width: `${optionPercentage}%` }}
                      >
                        {optionPercentage > 0 && (
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                            {optionPercentage.toFixed(2)}%
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {isVotedOption && <WhereToVoteRoundedIcon color="success" className="ml-4" />}
                {!hasUserVoted && !isVotedOption && (
                  <button
                    onClick={() => handleVote(option.id)}
                    className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
                  >
                    Vote
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {hasUserVoted && <div className="text-center mt-4 text-green-600 font-semibold">You have already voted</div>}
    </div>
  );
};

export default VotingEventInterface;
