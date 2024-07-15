import { useState, useEffect, useRef } from 'react';
import pollingStation from '../../images/polling_station_last.jpg';
import { HomeButton, AddButton, InfoButton } from '../Buttons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WelcomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -74;
      const yPosition = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });

      setTimeout(() => {
        AOS.refresh();
      }, 500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-[#74BDCB] text-white py-4 fixed top-0 left-0 w-full z-10 shadow-lg border-b-2 border-[#EFE7BC]">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Secure Voting</h1>
          <div>
            <AddButton>Sign In</AddButton>
          </div>
        </div>
      </header>

      <section className="pt-18 h-screen flex">
        <div className="w-2/5 bg-[#E7F2F8] flex flex-col justify-center items-start pl-12">
          <div className="ml-10">
            <h2 className="text-5xl font-bold mb-5 text-left acme-regular">Vote Here!</h2>
            <p className="text-xl mb-5 text-left">Unforgettable online election experience! Voting system built for your needs.</p>
            <p className="mb-6 text-gray-600">Saves your time, secures your ballots.</p>
            <div className="flex space-x-4">
              <HomeButton>Try Now</HomeButton>
              <InfoButton onClick={() => scrollToSection('how-it-works')}>Learn More</InfoButton>
            </div>
          </div>
        </div>
        <div className="w-4/6 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#E7F2F8]"></div>
          <img src={pollingStation} alt="Vote" className="object-cover h-full w-full" />
        </div>
      </section>

      <section id="how-it-works" ref={howItWorksRef} className="py-24 px-14 bg-gradient-to-b from-[#E7F2F8] to-white" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8 acme-regular">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-2xl font-bold mb-2">Create Unions</h4>
            <p className="text-lg mb-4">
              Easily set up and manage unions or groups within the platform. Define the union's structure, roles, and permissions to ensure smooth
              operations.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Invite Members</h3>
            <p className="text-lg mb-4">
              Seamlessly invite members to join your union. Send invitations via email or share a unique link. Members can quickly sign up and become
              part of the voting process.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Vote with One Click</h3>
            <p className="text-lg mb-4">
              Simplify the voting process with a single-click voting system. Members can cast their votes effortlessly, making the experience quick
              and user-friendly.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Manage Everything from Your Dashboard</h3>
            <p className="text-lg mb-4">
              Use a comprehensive dashboard to oversee all activities. Track voter participation, monitor election progress, and manage results in
              real-time. The dashboard provides insights and analytics to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      <section id="voting-needs" className="py-16 px-10 bg-gradient-to-b from-white to-[#E7F2F8]" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8 acme-regular">Voting Needs For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            'Interest Clubs',
            'Unions',
            'Professional Associations',
            'Political Parties',
            'Non-Profit Organizations',
            'Religious Groups',
            'Cooperatives',
            'Colleges and Universities',
            'Local Groups',
            'Industry Associations',
            'Governments',
            'Other Organizations',
          ].map((useCase, index) => (
            <div
              key={index}
              className="bg-white border-[#EFE7BC] border-4 p-6 rounded-lg shadow-md hover:bg-[#ff6747] hover:text-white transition duration-300"
            >
              <p className="text-center text-lg font-semibold">{useCase}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="advantages" className="py-24 px-14 bg-gradient-to-b from-[#E7F2F8] to-white" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8 acme-regular">Advantages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Conduct Votes Anytime</h3>
            <p className="text-lg mb-4">
              Conduct votes at your convenience, regardless of time zones. The platform operates 24/7, allowing members to participate whenever it
              suits them best.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Vote Anywhere</h3>
            <p className="text-lg mb-4">
              Enable remote voting, allowing members to vote from any location. Whether they are at home, at work, or traveling, they can easily
              access the voting system.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Using Any Device</h3>
            <p className="text-lg mb-4">
              Ensure accessibility by supporting various devices, including desktops, laptops, tablets, and smartphones. The platform is responsive
              and adapts to different screen sizes and operating systems, providing a consistent experience across all devices.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">User-Friendly and Accessible</h3>
            <p className="text-lg mb-4">
              The platform is designed with the user in mind, featuring an intuitive interface that simplifies the voting process. Accessibility
              features are integrated to accommodate users with disabilities, ensuring everyone can participate without barriers.
            </p>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="py-16 px-10 bg-gradient-to-b from-white to-[#E7F2F8]" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8 acme-regular">Why Choose Us Over Others</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'Easy', description: 'Simple and intuitive interface for all users.' },
            { title: 'Fast', description: 'Quick setup and real-time results.' },
            { title: 'Reliable', description: 'Dependable performance with 99.99% uptime.' },
            { title: 'Flexible', description: 'Customizable to meet your unique needs.' },
            { title: 'Secure', description: 'State-of-the-art encryption and security protocols.' },
          ].map((point, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
              <h3 className="text-xl font-semibold text-[#ff6747]">{point.title}</h3>
              <p className="text-gray-700">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 bg-[#ff6747] text-white px-5 py-4 rounded-full shadow-lg hover:bg-[#F54D3D] transition duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default WelcomePage;
