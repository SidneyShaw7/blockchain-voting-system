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
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const UserEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: events, isProcessing, isError, errorMessage } = useSelector((state: RootState) => state.userEvents);
  const userId = useSelector((state: RootState) => state.login.data?.user.id);

  // const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  // const [showVoted, setShowVoted] = useState<boolean | null>(null);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  // const [showAnchorEl, setShowAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
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
    return <div className="text-gray-500 text-center mt-4">No events found.</div>;
  }

  const handleViewEvent = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter(
    (event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ThemeProvider theme={theme}>
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            {/* <div className="relative inline-block"> */}
            <Button
              size="small"
              variant="contained"
              onClick={handleSortClick}
              sx={{ fontSize: '1em', textTransform: 'none', backgroundColor: '#00478F' }}
              endIcon={<ExpandMoreIcon />}
            >
              Sort by
            </Button>
            <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortClose}>
              <MenuItem onClick={handleSortClose}>Newest</MenuItem>
              <MenuItem onClick={handleSortClose}>Oldest</MenuItem>
            </Menu>
            <Button
              size="small"
              variant="contained"
              onClick={handleFilterClick}
              sx={{ fontSize: '1em', textTransform: 'none', backgroundColor: '#00478F', marginLeft: 2 }}
              endIcon={<ExpandMoreIcon />}
            >
              Show
            </Button>
            <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
              <MenuItem onClick={handleFilterClose}>All</MenuItem>
              <MenuItem onClick={handleFilterClose}>Voted</MenuItem>
              <MenuItem onClick={handleFilterClose}>Not Voted</MenuItem>
            </Menu>
          </div>
          <TextField
            className="textField"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            placeholder="Search events"
            sx={{
              '& .MuiOutlinedInput-root': {
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
              style: {
                outline: 'none',
              },
            }}
            inputProps={{
              style: {
                outline: 'none',
              },
            }}
          />
          {/* </div> */}
        </div>
      </ThemeProvider>
      <ul className="space-y-6">
        {filteredEvents.map((event) => {
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
                  className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
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
