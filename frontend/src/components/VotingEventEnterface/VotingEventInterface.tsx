import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, voteOnEvent } from '../../features/manageEvent';
import { OptionDB } from '../../types';
import { useDispatch, RootState, useSelector } from '../../store';
import { error as showError } from '../../features/alert/alertSlice';
import DoneIcon from '@mui/icons-material/Done';
import { CancelButton, AddButton, ViewButton, GreenButton } from '../Buttons';
import InviteUserModal from './InviteUserModal';
import ViewUsersModal from './ViewUsersModal';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const VotingEventInterface = () => {
  const navigate = useNavigate();

  const { eventId } = useParams<{ eventId?: string }>();
  const dispatch = useDispatch();
  const { data: event, isProcessing } = useSelector((state: RootState) => state.votingEvent);
  const userId = useSelector((state: RootState) => state.login.data?.user.id);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isViewUsersModalOpen, setIsViewUsersModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      dispatch(getEvent(eventId));
    }
  }, [dispatch, eventId]);

  const handleVote = async () => {
    if (eventId && selectedOption) {
      try {
        await dispatch(voteOnEvent({ eventId, optionId: selectedOption })).unwrap();
        dispatch(getEvent(eventId));
      } catch (error) {
        console.error('Failed to vote on event:', error);
        dispatch(showError({ message: 'Failed to vote on event.' }));
      }
    } else {
      console.error('Event ID or selected option is undefined.');
      dispatch(showError({ message: 'Event ID or selected option is undefined.' }));
    }
  };

  if (isProcessing) {
    return <div className="flex justify-center items-center h-screen">Loading event details...</div>;
  }

  if (!event) {
    return <div className="text-center text-gray-500 mt-4">No event found.</div>;
  }

  const hasUserVoted = userId && event.options.some((option) => option.voters.includes(userId));

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
  const isAdmin = userId && event.createdBy === userId;

  const handleNavigateBack = () => {
    navigate(`/events`);
  };

  return (
    <div className="event-container max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-900">{event.title}</h1>
      <p className="text-lg mb-4 text-gray-700">{event.description}</p>
      {hasUserVoted && <div className="text-green-600 mb-3 text-center font-semibold">You have already voted</div>}
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {event.options.map((option: OptionDB) => {
            const optionPercentage = getOptionPercentage(option.votes, totalVotes);
            const isVotedOption = option.voters.includes(userId || '');

            return (
              <div key={option.id} className="p-1 mb-1 flex items-center justify-between">
                {!hasUserVoted ? (
                  <FormControlLabel
                    value={option.id}
                    control={<Radio color="primary" />}
                    label={<span className="text-lg">{option.name || option.option}</span>}
                  />
                ) : (
                  <>
                    <div className="text-lg font-medium flex-1">{option.name || option.option}</div>
                    {isVotedOption && <DoneIcon color="success" className="ml-4" />}
                  </>
                )}
                {event.resultVisibility && (
                  <div className="flex-1 ml-4 relative h-6 rounded-full overflow-hidden">
                    <div className={`absolute top-0 left-0 h-full ${getOptionColor(option.option)}`} style={{ width: `${optionPercentage}%` }}>
                      {optionPercentage > 0 && (
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                          {optionPercentage.toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
      {!hasUserVoted && selectedOption && (
        <div className="flex  mt-6">
          <GreenButton onClick={handleVote}>Vote</GreenButton>
        </div>
      )}
      {isAdmin && (
        <>
          <div className="flex space-x-4 mt-6">
            <ViewButton onClick={() => setIsViewUsersModalOpen(true)}>Users</ViewButton>
            <AddButton onClick={() => setIsInviteModalOpen(true)}>+ Add Users</AddButton>
          </div>
          <InviteUserModal eventId={event.id} isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
          <ViewUsersModal
            eventId={event.id}
            userIds={event.invitedPersons}
            isOpen={isViewUsersModalOpen}
            onClose={() => setIsViewUsersModalOpen(false)}
          />
        </>
      )}
      <div className="flex items-center justify-between mt-6">
        <CancelButton onClick={handleNavigateBack}>Back</CancelButton>
      </div>
    </div>
  );
};

export default VotingEventInterface;
