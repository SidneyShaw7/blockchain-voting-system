import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from '../../store';
import { inviteUser, inviteGroupToEvent } from '../../features/manageEvent';
import { Modal, Box, Typography, List, ListItem, TextField, MenuItem, Select, FormControl } from '@mui/material';
import { OrganizationResponse, SimpleUser } from '../../types';
import { CancelButton, AddButton, DeleteButton, DisabledButton } from '../Buttons';
import { modalStyle } from './modalStyle';
import { error as showError, success as showSuccess } from '../../features/alert/alertSlice';
import organizationsService from '../../services/organizationsService';

interface ViewUsersModalProps {
  eventId: string;
  users: SimpleUser[];
  isOpen: boolean;
  onClose: () => void;
  canDelete: boolean;
  voters: string[];
  onRemoveUser: (userId: string) => void;
  onUserInvited: () => void;
  adminId: string;
  isVotingPeriodOver: boolean;
}

const ViewUsersModal = ({
  eventId,
  users,
  isOpen,
  onClose,
  canDelete,
  voters,
  onRemoveUser,
  onUserInvited,
  adminId,
  isVotingPeriodOver,
}: ViewUsersModalProps) => {
  const [isAddingUsers, setIsAddingUsers] = useState(false);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [emails, setEmails] = useState('');
  const [organizations, setOrganizations] = useState<OrganizationResponse[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const dispatch = useDispatch();

  const fetchOrganizations = useCallback(async () => {
    try {
      const response = await organizationsService.getOrganizations();
      setOrganizations(response.data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      dispatch(showError({ message: 'Failed to fetch organizations.' }));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const handleInvite = async () => {
    const emailList = emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email !== '');
    if (emailList.length > 0) {
      try {
        await Promise.all(emailList.map((email) => dispatch(inviteUser({ eventId, email })).unwrap()));
        setEmails('');
        dispatch(showSuccess({ message: 'Users invited successfully!' }));
        onUserInvited();
        setIsAddingUsers(false);
      } catch (error) {
        console.error('Failed to invite users:', error);
        dispatch(showError({ message: 'Failed to invite users.' }));
      }
    }
  };

  const handleInviteGroup = async () => {
    if (selectedOrganization) {
      try {
        await dispatch(inviteGroupToEvent({ eventId, organizationId: selectedOrganization })).unwrap();
        dispatch(showSuccess({ message: 'Group invited successfully!' }));
        onUserInvited();
        setIsAddingGroup(false);
      } catch (error) {
        console.error('Failed to invite group:', error);
        dispatch(showError({ message: 'Failed to invite group.' }));
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        {isAddingUsers ? (
          <>
            <Typography variant="h6" component="h2" className="mb-4 flex justify-center">
              Invite Users
            </Typography>
            <TextField
              placeholder="User Emails (comma separated)"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <div className="flex justify-between mt-3">
              <CancelButton onClick={() => setIsAddingUsers(false)}>Back</CancelButton>
              <AddButton onClick={handleInvite}>+ Add</AddButton>
            </div>
          </>
        ) : isAddingGroup ? (
          <>
            <Typography variant="h6" component="h2" className="mb-4 flex justify-center">
              Invite a Group
            </Typography>
            {organizations.length > 0 ? (
              <FormControl fullWidth margin="normal">
                <Select
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  displayEmpty
                  disabled={isVotingPeriodOver}
                >
                  <MenuItem value="" disabled>
                    Select a group
                  </MenuItem>
                  {organizations.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography variant="body2" color="textSecondary" className="mb-4 flex justify-center">
                No groups to invite
              </Typography>
            )}
            <div className="flex justify-between mt-3">
              <CancelButton onClick={() => setIsAddingGroup(false)}>Back</CancelButton>
              <DisabledButton onClick={handleInviteGroup} disabled={!selectedOrganization || isVotingPeriodOver}>
                + Add
              </DisabledButton>
            </div>
          </>
        ) : (
          <>
            <Typography variant="h6" component="h2" className="mb-4 flex justify-center">
              Users
            </Typography>
            <List>
              {users.map((user) => (
                <ListItem key={user.id} className="flex justify-between items-center">
                  <div>
                    <Typography>
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                  </div>
                  <div className="ml-auto">
                    {user.id === adminId ? (
                      <Typography mr={1} variant="body2" color="textSecondary">
                        Admin
                      </Typography>
                    ) : (
                      canDelete && !voters.includes(user.id) && <DeleteButton onClick={() => onRemoveUser(user.id)}>Remove</DeleteButton>
                    )}
                  </div>
                </ListItem>
              ))}
            </List>
            <div className="flex justify-between mt-3">
              <CancelButton onClick={onClose}>Back</CancelButton>
              <div>
                <DisabledButton onClick={() => setIsAddingUsers(true)} disabled={isVotingPeriodOver}>
                  + Users
                </DisabledButton>{' '}
                <DisabledButton onClick={() => setIsAddingGroup(true)} disabled={isVotingPeriodOver}>
                  + Group
                </DisabledButton>
              </div>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ViewUsersModal;
