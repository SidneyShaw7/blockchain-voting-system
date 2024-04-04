import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = (e) => {
    
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const reEnterPassword = e.target.password.value;
  };
};
