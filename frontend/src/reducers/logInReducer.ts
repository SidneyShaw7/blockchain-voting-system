import { createSlice } from '@reduxjs/toolkit';
import { LoginCredentials } from '../types';
import loginService from '../services/login';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
    setStoredUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return (action.payload = null);
    },
  },
});

export const login = ({ username, password }: LoginCredentials) => {
  const credentials = { username, password };
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(loginUser(user));
      //USE COOCKIE ON THE BACKEND TO REMEMBER THE USER!!!!
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutUser());
      window.localStorage.removeItem('loggedBlogappUser');
    } catch (error) {
      console.error(error);
    }
  };
};

export const { loginUser, setStoredUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
