import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import {}

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = (e) => {
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const reEnterPassword = e.target.password.value;

    e.target.firstName.value = '';
    e.target.lastName.value = '';
    e.target.email.value = '';
    e.target.username.value = '';
    e.target.password.value = '';
    e.target.password.value = '';

    // dispatch()
  };
};
