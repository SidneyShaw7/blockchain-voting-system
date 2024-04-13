import { useDispatch } from '../../app/store';
import React, { useState } from 'react';
import { register } from '../../features/registration/registrationThunks';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      alert('Passwords do not match.');
      return;
    }
    dispatch(register(formData));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-5">
          <img
            alt=""
            src="/src/images/technology-in-digital-transformation.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img src="/src/images/brand_white.png" alt="" className="h-16 sm:h-18" />
              {/* <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="/src/images/DALL·E 2024-04-08 14.30.37 - Logo design featuring the letters SWS arranged to form a circle shape, without any additional graphic elements like explicit circles or borders. Eac.svg" fill="currentColor" />
              </svg> */}
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to Secure Voting System</h2>

            <p className="mt-4 leading-relaxed text-white/90">
              A secure, transparent, and anonymous online voting system utilizing blockchain technology to ensure the integrity of
              votes suitable for elections and surveys.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-7">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img src="/src/images/brand_ing.png" alt="" />
                {/* <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="" fill="currentColor" />
                </svg> */}
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Secure Voting System</h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                A secure, transparent, and anonymous online voting system utilizing blockchain technology to ensure the integrity
                of votes suitable for elections and surveys.
              </p>
            </div>

            <form onSubmit={handleSubmit} action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>

                <input
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  id="FirstName"
                  name="firstName"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <input
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  id="LastName"
                  name="lastName"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                  Username
                </label>

                <input
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  id="Username"
                  name="username"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>

                <input
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  type="password"
                  id="PasswordConfirmation"
                  name="passwordConfirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {' '}
                    terms and conditions{' '}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    {' '}
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="/log-in" className="text-gray-700 underline">
                    {' '}
                    Log in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default RegistrationForm;
