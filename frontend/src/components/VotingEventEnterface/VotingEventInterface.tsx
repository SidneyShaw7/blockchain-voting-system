import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, voteOnEvent } from '../../features/manageEvent';
import { OptionDB } from '../../types';
import { useDispatch, RootState, useSelector } from '../../store';
import { error as showError } from '../../features/alert/alertSlice';
import DoneIcon from '@mui/icons-material/Done';
import { CancelButton, ViewButton, GreenButton, DisabledButton } from '../Buttons';
import InviteUserModal from './InviteUserModal';
import ViewUsersModal from './ViewUsersModal';
import ConfirmVoteModal from './ConfirmVoteModal';
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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isVotingPeriodOver, setIsVotingPeriodOver] = useState(false);

  useEffect(() => {
    if (eventId) {
      dispatch(getEvent(eventId));
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    if (event) {
      const now = new Date();
      const endDate = new Date(event.endDate);
      setIsVotingPeriodOver(now > endDate);
    }
  }, [event]);

  const handleVote = async () => {
    if (eventId && selectedOption) {
      try {
        await dispatch(voteOnEvent({ eventId, optionId: selectedOption })).unwrap();
        dispatch(getEvent(eventId));
        setIsConfirmModalOpen(false);
      } catch (error) {
        console.error('Failed to vote on event:', error);
        dispatch(showError({ message: 'Failed to vote on event.' }));
      }
    } else {
      console.error('Event ID or selected option is undefined.');
      dispatch(showError({ message: 'Event ID or selected option is undefined.' }));
    }
  };

  const handleConfirmVote = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCancelVote = () => {
    setIsConfirmModalOpen(false);
  };

  const handleNavigateBack = () => {
    navigate(`/events`);
  };

  const handleUserInvited = () => {
    dispatch(getEvent(eventId!)); // Refresh event details
  };

  if (isProcessing) {
    return <div className="flex justify-center items-center h-screen">Loading event details...</div>;
  }

  if (!event) {
    return <div className="text-center text-gray-500 mt-4">No event found.</div>;
  }

  const hasUserVoted = userId && event.options.some((option) => option.voters.includes(userId));
  const isAdmin = userId && event.createdBy === userId;

  return (
    <div className="event-container max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-900">{event.title}</h1>
      <p className="text-lg mb-4 text-gray-700">{event.description}</p>
      {hasUserVoted && <div className="text-green-600 mb-3 text-center font-semibold">You have already voted</div>}
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {event.options.map((option: OptionDB) => {
            const isVotedOption = option.voters.includes(userId || '');

            return (
              <div key={option.id} className="p-1 mb-1 flex items-center justify-between">
                {!hasUserVoted && !isVotingPeriodOver ? (
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
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
      {!hasUserVoted && selectedOption && !isVotingPeriodOver && (
        <div className="flex justify-center mt-6">
          <GreenButton onClick={handleConfirmVote} className="ml-4">
            Vote
          </GreenButton>
        </div>
      )}
      {isAdmin && (
        <>
          <div className="flex space-x-4 mt-6">
            <ViewButton onClick={() => setIsViewUsersModalOpen(true)}>Users</ViewButton>
            <DisabledButton onClick={() => setIsInviteModalOpen(true)} disabled={isVotingPeriodOver}>
              + Add Users
            </DisabledButton>
          </div>
          <InviteUserModal
            eventId={event.id}
            isOpen={isInviteModalOpen}
            onClose={() => setIsInviteModalOpen(false)}
            onUserInvited={handleUserInvited}
          />
          <ViewUsersModal
            eventId={event.id}
            userIds={event.invitedPersons}
            isOpen={isViewUsersModalOpen}
            onClose={() => setIsViewUsersModalOpen(false)}
            canDelete={!isVotingPeriodOver}
            voters={event.options.flatMap((option) => option.voters)}
          />
        </>
      )}
      <div className="flex items-center justify-between mt-6">
        <CancelButton onClick={handleNavigateBack}>Back</CancelButton>
      </div>

      <ConfirmVoteModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelVote}
        onConfirm={handleVote}
        selectedOption={event.options.find((option) => option.id === selectedOption)?.option || ''}
      />
    </div>
  );
};

export default VotingEventInterface;
