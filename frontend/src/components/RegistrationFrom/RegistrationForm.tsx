import { useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../store';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { register, resetRegistrationState } from '../../features/registration';
import { useNavigate } from 'react-router-dom';
import { error as showError } from '../../features/alert';
import { RegistrationSchema } from './RegistrationSchema';
import { InputField } from './helperFieldComponents';
import { RegistrationFormValues } from '../../types';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, data, isError, errorMessage } = useSelector((state: RootState) => state.registration);

  const methods = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
  });

  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   username: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   email: '',
  // });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.passwordConfirmation) {
  //     dispatch(showError({ message: 'Passwords do not match.' }));
  //     return;
  //   }
  //   dispatch(register(formData));
  // };

  useEffect(() => {
    if (isSuccess && data) {
      navigate('/home');
      dispatch(resetRegistrationState());
    }
    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
    }
  }, [dispatch, navigate, isSuccess, data, isError, errorMessage]);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  // };

  const onSubmit = (data: RegistrationFormValues) => {
    dispatch(register(data));
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-5">
          <img alt="" src="/src/images/technology-in-digital-transformation.jpg" className="absolute inset-0 h-full w-full object-cover opacity-80" />

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
              A secure, transparent, and anonymous online voting system utilizing blockchain technology to ensure the integrity of votes suitable for
              elections and surveys.
            </p>
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

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Secure Voting System</h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                A secure, transparent, and anonymous online voting system utilizing blockchain technology to ensure the integrity of votes suitable
                for elections and surveys.
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                <InputField label="First Name" name="firstName" />
                <InputField label="Last Name" name="lastName" />
                <InputField label="Username" name="username" />
                <InputField label="Email" name="email" type="email" />
                <InputField label="Password" name="password" type="password" />
                <InputField label="Password Confirmation" name="passwordConfirmation" type="password" />

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">I want to receive emails about events, product updates and company announcements.</span>
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
                    className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
                  >
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="/login" className="text-gray-700 underline">
                      {' '}
                      Log in
                    </a>
                  </p>
                </div>
              </form>
            </FormProvider>
          </div>
        </main>
      </div>
    </section>
  );
};

export default RegistrationForm;
