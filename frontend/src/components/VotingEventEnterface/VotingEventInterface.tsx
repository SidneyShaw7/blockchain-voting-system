import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, voteOnEvent, deleteUserFromEvent } from '../../features/manageEvent';
import { OptionDB, SimpleUser, VotingEventFormValuesDB } from '../../types';
import { useDispatch, RootState, useSelector } from '../../store';
import { error as showError } from '../../features/alert/alertSlice';
import DoneIcon from '@mui/icons-material/Done';
import { CancelButton, ViewButton, GreenButton } from '../Buttons';
import ViewUsersModal from './ViewUsersModal';
import ConfirmVoteModal from './ConfirmVoteModal';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import userService from '../../services/userService';

const VotingEventInterface = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId?: string }>();
  const dispatch = useDispatch();
  const { data: event, isProcessing } = useSelector((state: RootState) => state.votingEvent);
  const userId = useSelector((state: RootState) => state.login.data?.user.id);
  const [isViewUsersModalOpen, setIsViewUsersModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isVotingPeriodOver, setIsVotingPeriodOver] = useState(false);
  const [users, setUsers] = useState<SimpleUser[]>([]);

  const fetchUsers = useCallback(async (userIds: string[]) => {
    try {
      const response = await userService.getUsers(userIds);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, []);

  useEffect(() => {
    if (eventId) {
      const fetchEventAndUsers = async () => {
        const eventAction = await dispatch(getEvent(eventId));
        const eventDetails = eventAction.payload as VotingEventFormValuesDB;
        if (eventDetails) {
          const allUserIds = [eventDetails.createdBy, ...eventDetails.invitedPersons];
          console.log(allUserIds);
          console.log(eventAction);
          console.log(eventDetails.createdBy);
          fetchUsers(allUserIds);
        }
      };
      fetchEventAndUsers();
    }
  }, [dispatch, eventId, fetchUsers]);

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
    if (eventId) {
      dispatch(getEvent(eventId)).then((action) => {
        const eventDetails = action.payload as VotingEventFormValuesDB;
        if (eventDetails) {
          const allUserIds = [eventDetails.createdBy, ...eventDetails.invitedPersons];
          fetchUsers(allUserIds);
        }
      });
    }
  };

  const handleRemoveUser = async (userIdToRemove: string) => {
    if (eventId) {
      try {
        await dispatch(deleteUserFromEvent({ eventId, userId: userIdToRemove })).unwrap();
        const updatedUserIds = users.filter((user) => user.id !== userIdToRemove).map((user) => user.id);
        fetchUsers(updatedUserIds);
      } catch (error) {
        console.error('Failed to remove user from event:', error);
        dispatch(showError({ message: 'Failed to remove user from event.' }));
      }
    }
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
      {isVotingPeriodOver && <div className="text-red-600 mb-3 text-center font-semibold">This voting is over</div>}
      {!isVotingPeriodOver && hasUserVoted && <div className="text-green-600 mb-3 text-center font-semibold">You have already voted</div>}
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-900">{event.title}</h1>
      <p className="text-lg mb-4 text-gray-700">{event.description}</p>
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {event.options.map((option: OptionDB) => {
            const isVotedOption = option.voters.includes(userId || '');

            return (
              <div key={option.id} className="p-1 mb-1 flex items-center justify-between">
                {!isVotingPeriodOver && !hasUserVoted ? (
                  <>
                    <FormControlLabel
                      value={option.id}
                      control={<Radio color="primary" />}
                      label={
                        <div>
                          <span className="text-lg">{option.name || option.option}</span>
                          {option.bio && <div className="text-sm text-gray-600">{option.bio}</div>}
                        </div>
                      }
                    />
                    {selectedOption === option.id && (
                      <GreenButton onClick={handleConfirmVote} className="ml-4">
                        Vote
                      </GreenButton>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-lg font-medium flex-1">
                      {option.name || option.option}
                      {option.bio && <div className="text-sm text-gray-600">{option.bio}</div>}
                    </div>
                    {isVotedOption && <DoneIcon color="success" className="ml-4" />}
                  </>
                )}
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
      <div className="flex items-center  mt-6">
        <CancelButton onClick={handleNavigateBack}>Back</CancelButton>
        {isAdmin && (
          <>
            <div className="flex space-x-4">
              <ViewButton onClick={() => setIsViewUsersModalOpen(true)}>Users</ViewButton>
            </div>
            <ViewUsersModal
              eventId={event.id}
              users={users}
              isOpen={isViewUsersModalOpen}
              onClose={() => setIsViewUsersModalOpen(false)}
              canDelete={!isVotingPeriodOver}
              voters={event.options.flatMap((option) => option.voters)}
              onRemoveUser={handleRemoveUser}
              onUserInvited={handleUserInvited}
              adminId={event.createdBy}
            />
          </>
        )}
      </div>
      <ConfirmVoteModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelVote}
        onConfirm={handleVote}
        selectedOption={
          event.options.find((option) => option.id === selectedOption)?.name ||
          event.options.find((option) => option.id === selectedOption)?.option ||
          ''
        }
      />
    </div>
  );
};

export default VotingEventInterface;
