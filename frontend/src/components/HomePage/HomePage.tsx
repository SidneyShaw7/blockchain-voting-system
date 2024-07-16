import { useNavigate } from 'react-router-dom';
import { AddButton } from '../Buttons';
import ballotImg from '../../images/Ballot.jpg';
import groupPic from '../../images/company.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateOrganization = () => {
    navigate('/organizations');
  };

  const handleCreateEvent = () => {
    navigate('/event/create');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to the Voting System</h1>
        {/* <p className="text-lg text-gray-700">Here, you can manage your organizations and create events for voting seamlessly.</p> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg flex flex-col">
          <img src={groupPic} alt="Group" className="rounded" />
          <div className="p-6 flex-grow">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Finish Your Registration</h2>
            <p className="text-gray-700 mb-4">
              You can complete your registration by creating a new organization (union, club, college group, etc.). This will allow you to invite all
              the people you want to participate in the election with just one click.
            </p>
          </div>
          <div className="p-6 pt-0">
            <AddButton onClick={handleCreateOrganization} className="mt-4">
              Create New Organization
            </AddButton>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg flex flex-col">
          <img src={ballotImg} alt="Writing" className="rounded" />
          <div className="p-6 flex-grow">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Start Creating Events</h2>
            <p className="text-gray-700">
              You can start creating ballots for voting. This allows you to manage elections and gather votes efficiently and securely.
            </p>
          </div>
          <div className="p-6 pt-0">
            <AddButton onClick={handleCreateEvent} className="mt-4">
              Create Voting Event
            </AddButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
