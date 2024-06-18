import { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootState } from '../../store';
import { getAllEvents } from '../../features/manageEvent';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { ViewButton, FilterButton, SortButton } from '../Buttons';

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
    <div className="max-w-6xl mx-auto p-4">
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
      <ul className="space-y-6">
        {filteredEvents.map((event) => {
          const hasUserVoted = userId && event.options.some((option) => option.voters.includes(userId));
          const isAdmin = event.createdBy === userId;

          return (
            <li
              key={event.id}
              className="relative bg-[#EAEFF2] border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
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
                <ViewButton onClick={() => handleViewEvent(event.id)}>View Ballot</ViewButton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserEvents;
