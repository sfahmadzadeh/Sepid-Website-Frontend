import { toast } from 'react-toastify';
import { persianMessages } from './messages';

const errorHandler = async (
  error,
  dispatch,
  rejectWithValue,
  errorMessage,
  showHttpError
) => {

  if (!error.response) {
    toast.error('ارتباط با سرور دچار مشکل شده است.');
    return rejectWithValue();
  }

  if (persianMessages?.[error.response.data?.code]) {
    toast.error(persianMessages[error.response.data.code]);
    return rejectWithValue();
  }

  if (error.response.data.detail) {
    toast.error(error.response.data.detail);
    return rejectWithValue();
  }

  switch (error.response.status) {
    case 401: {
      if (error.config.url === 'auth/token/obtain/') {
        break;
      }
      try {
        dispatch({ type: 'account/logout' });
        toast.error('نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.');
        return rejectWithValue();
      }
      catch (error) {
        dispatch({ type: 'account/logout' });
        toast.error('نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.');
        return rejectWithValue();
      }
    }
    case 500:
      toast.error('ایراد سروری پیش آمده! لطفاً ما را در جریان بگذارید.');
      return rejectWithValue();
  }

  if (errorMessage) {
    toast.error(errorMessage);
    return rejectWithValue();
  }

  if (showHttpError && error.response.data?.error) {
    toast.error(error.response.data.error);
    return rejectWithValue();
  }

  return rejectWithValue();
};


export default errorHandler;