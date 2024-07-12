import votePic from '../../images/vote.jpg';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-blue-600 text-white py-4 fixed top-0 left-0 w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">Secure Voting</h1>
          <div>
            <button className="bg-white text-blue-600 py-2 px-4 rounded mr-4 hover:bg-gray-200 transition duration-300">Sign In</button>
            <button className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 transition duration-300">Register</button>
          </div>
        </div>
      </header>

      <section className="pt-19 h-screen flex">
        <div className="w-3/5 bg-white flex flex-col justify-center items-start pl-12">
          <div className="ml-20">
            <h2 className="text-4xl font-bold mb-4 text-left">Vote Here!</h2>
            <p className="text-xl mb-4 text-left">
              Amazing online election experience! Voting system built for your needs, saves your time, secures your ballots.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300">Try Now</button>
          </div>
        </div>
        <div className="w-4/5 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
          <img src={votePic} alt="Vote" className="object-cover h-full w-full" />
        </div>
      </section>

      <section className="py-16 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">What This App is About</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Our application offers secure voting in real-time, ensuring transparency and trust in your election processes.
        </p>
      </section>

      <section className="py-16 px-4 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">Where to Use and Who Should Use It</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            'Unions',
            'Professional Associations',
            'Political Parties',
            'Non-Profit Organizations',
            'Religious Groups',
            'Cooperatives',
            'Colleges and Universities',
            'Other Organizations',
          ].map((useCase, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              <p className="text-lg font-semibold">{useCase}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us Over Others</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'Easy', description: 'Simple and intuitive interface for all users.' },
            { title: 'Fast', description: 'Quick setup and real-time results.' },
            { title: 'Reliable', description: 'Dependable performance with 99.99% uptime.' },
            { title: 'Flexible', description: 'Customizable to meet your unique needs.' },
            { title: 'Secure', description: 'State-of-the-art encryption and security protocols.' },
          ].map((point, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
              <h3 className="text-xl font-semibold text-blue-600">{point.title}</h3>
              <p className="text-gray-700">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <p className="text-lg max-w-2xl mx-auto text-center">
          Create unions, invite members, and vote with one click. Manage everything from your dashboard with ease.
        </p>
      </section>

      <section className="py-16 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">Advantages</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Conduct votes anytime, anywhere, using any device. Our platform is built to be user-friendly and highly accessible.
        </p>
      </section>
    </div>
  );
};

export default WelcomePage;
