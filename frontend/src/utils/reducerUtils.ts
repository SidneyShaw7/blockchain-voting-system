export const createAsyncReducers = () => ({
  pending: (state) => {
    state.isSubmitting = true;
    state.isSuccess = false;
    state.isError = false;
    state.errorMessage = undefined;
    state.user = null;
  },
  fulfilled: (state, action) => {
    state.isSubmitting = false;
    state.isSuccess = true;
    state.isError = false;
    state.errorMessage = undefined;
    state.user = action.payload;
  },
  rejected: (state, action) => {
    state.isSubmitting = false;
    state.isSuccess = false;
    state.isError = true;
    state.errorMessage = action.error || 'An error occurred';
    state.user = null;
  },
});
