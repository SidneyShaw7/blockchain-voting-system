import { useDispatch, useSelector, RootState } from '../../app/store';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/login/loginThunks';
import { error as showError, success as showSuccess } from '../../features/alert/alertSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
    }
    if (isSuccess) {
      dispatch(showSuccess({ message: 'Login successful! Redirecting...' }));
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  }, [dispatch, isError, isSuccess, errorMessage, navigate]);

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

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Login to Secure Voting System</h2>

            <p className="mt-4 leading-relaxed text-white/90">Access your voting dashboard.</p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-7">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20" href="#">
                <span className="sr-only">Home</span>
                <img src="/src/images/brand_ing.png" alt="" />
                {/* <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="" fill="currentColor" />
            </svg> */}
              </a>

              {/* <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Welcome back!</p> */}
              <h1 className="mt-2 text-1xl font-bold text-gray-900 sm:text-2xl md:text-3xl">Login to Secure Voting System</h1>

              <p className="mt-4 leading-relaxed text-gray-500">Access your voting dashboard.</p>
            </div>

            {/* <div className="hidden lg:relative lg:block lg:p-12">
              <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl block m:hidden">Welcome back!</p>
            </div> */}
            <form onSubmit={handleSubmit} action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
                  Username or email
                </label>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  id="Username"
                  name="username"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-[#00478F]"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-[#00478F]"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
                >
                  Log in
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don't have an account?
                  <a href="/" className="text-gray-700 underline">
                    {' '}
                    Sign up
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

export default LoginForm;
