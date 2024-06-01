import { useDispatch, useSelector, RootState } from '../../store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login, resetLoginState } from '../../features/login';
import { error as showError, success as showSuccess } from '../../features/alert/alertSlice';
import { LoginSchema, LoginFormValues } from './LoginSchema';
import { InputField } from '../helpers/helperFieldComponents';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.login);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  useEffect(() => {
    dispatch(resetLoginState());

    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
    }
    if (isSuccess) {
      dispatch(showSuccess({ message: 'Login successful! Redirecting...' }));
      setTimeout(() => navigate('/home'), 1500);
    }
  }, [dispatch, isError, isSuccess, errorMessage, navigate]);

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const loginData = {
      username: data.usernameOrEmail.includes('@') ? undefined : data.usernameOrEmail,
      email: data.usernameOrEmail.includes('@') ? data.usernameOrEmail : undefined,
      password: data.password,
    };
    dispatch(login(loginData));
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
              </a>

              <h1 className="mt-2 text-1xl font-bold text-gray-900 sm:text-2xl md:text-3xl">Login to Secure Voting System</h1>
              <p className="mt-4 leading-relaxed text-gray-500">Access your voting dashboard.</p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                <InputField label="Username or Email" name="usernameOrEmail" />
                <InputField label="Password" name="password" type="password" />
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
            </FormProvider>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginForm;
