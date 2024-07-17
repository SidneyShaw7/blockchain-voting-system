import { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootState } from '../../store';
import { getAllEvents } from '../../features/manageEvent';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { ViewButton, FilterButton, SortButton } from '../Buttons';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockClockIcon from '@mui/icons-material/LockClock';

const UserEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: events, isProcessing, isError, errorMessage } = useSelector((state: RootState) => state.userEvents);
  const userId = useSelector((state: RootState) => state.login.data?.user.id);

  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showVoted, setShowVoted] = useState<'all' | 'voted' | 'notVoted'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
    return <div className="text-gray-500 text-center mt-4">No ballots found.</div>;
  }

  const handleViewEvent = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const handleSortChange = (order: 'newest' | 'oldest') => {
    setSortOrder(order);
  };

  const handleFilterChange = (filter: 'all' | 'voted' | 'notVoted') => {
    setShowVoted(filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
  });

  const filteredEvents = sortedEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (showVoted === 'all') return matchesSearch;
    const hasUserVoted = userId && event.options.some((option) => option.voters.includes(userId));
    if (showVoted === 'voted') return matchesSearch && hasUserVoted;
    if (showVoted === 'notVoted') return matchesSearch && !hasUserVoted;
    return matchesSearch;
  });

  return (
    <div className="max-w mx-auto p-5">
      <ThemeProvider theme={theme}>
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <div>
              <SortButton
                onClick={() => handleSortChange('newest')}
                isActive={sortOrder === 'newest'}
                className={sortOrder === 'newest' ? 'bg-[#00478F] text-[#ff6747]' : ''}
              >
                Newest
              </SortButton>
              <SortButton
                onClick={() => handleSortChange('oldest')}
                isActive={sortOrder === 'oldest'}
                className={sortOrder === 'oldest' ? 'bg-[#00478F]  text-[#ff6747]' : ''}
              >
                Oldest
              </SortButton>
            </div>
            <div>
              <FilterButton
                onClick={() => handleFilterChange('all')}
                isActive={showVoted === 'all'}
                className={showVoted === 'all' ? 'bg-[#00478F] text-[#ff6747]' : ''}
              >
                All
              </FilterButton>
              <FilterButton
                onClick={() => handleFilterChange('voted')}
                isActive={showVoted === 'voted'}
                className={showVoted === 'voted' ? 'bg-[#00478F]  text-[#ff6747]' : ''}
              >
                Voted
              </FilterButton>
              <FilterButton
                onClick={() => handleFilterChange('notVoted')}
                isActive={showVoted === 'notVoted'}
                className={showVoted === 'notVoted' ? 'bg-[#00478F]  text-[#ff6747]' : ''}
              >
                Not Voted
              </FilterButton>
            </div>
          </div>
          <TextField
            className="textField"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            placeholder="Search events"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0px',
                '& fieldset': {
                  borderColor: '#00478F',
                },
                '&:hover fieldset': {
                  borderColor: '#003366',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#002244',
                },
              },
              '& .MuiOutlinedInput-input': {
                '&:focus': {
                  outline: 'none !important',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00478F',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#002244',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </ThemeProvider>
      <table className="w-full bg-white">
        <thead className="bg-[#00478F] text-white">
          <tr>
            <th className="py-2 px-4 border text-start">Title</th>
            {/* <th className="py-2 px-4 border text-start">Description</th> */}
            <th className="py-2 px-4 border text-start">Start Date</th>
            <th className="py-2 px-4 border text-start">End Date</th>
            <th className="py-2 px-4 border text-start">Votes</th>
            <th className="py-2 px-4 border text-start">Status</th>
            <th className="py-2 px-4 border text-start">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#E7F2F8]">
          {filteredEvents.map((event) => {
            const hasUserVoted = userId && event.options.some((option) => option.voters.includes(userId));
            const isAdmin = event.createdBy === userId;
            const now = new Date();
            const isVotingPeriodOver = new Date(event.endDate) < now;

            return (
              <tr key={event.id}>
                <td className="py-2 px-4 border">{event.title}</td>
                {/* <td className="py-2 px-4 border">{event.description}</td> */}
                <td className="py-2 px-4 border">{new Date(event.startDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{new Date(event.endDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border text-center">{event.options.reduce((sum, option) => sum + option.votes, 0)}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center items-center">
                    {isAdmin && (
                      <Tooltip title="Admin">
                        <SupervisorAccountIcon className="text-blue-500" />
                      </Tooltip>
                    )}
                    {hasUserVoted ? (
                      <Tooltip title="Voted">
                        <TaskAltIcon className="text-green-500" />
                      </Tooltip>
                    ) : isVotingPeriodOver ? (
                      <Tooltip title="Voting period over">
                        <LockClockIcon className="text-black-500" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Awaiting vote">
                        <AccessTimeIcon className="text-yellow-500" />
                      </Tooltip>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border">
                  <ViewButton onClick={() => handleViewEvent(event.id)}>View Ballot</ViewButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserEvents;
