import { toast } from 'react-toastify';
import { persianMessages } from 'redux/apis/messages';

type HandleErrorPropsType = {
  error: any;
  dispatch: any;
  errorMessage?: any;
  showHttpErro?: any;
}

const handleError = ({
  error,
  dispatch,
  errorMessage = 'خطا',
  showHttpError = false,
}): HandleErrorPropsType => {

  if (!error) {
    toast.error('ارتباط با سرور دچار مشکل شده است.');
    return;
  }

  if (persianMessages?.[error.data?.code]) {
    toast.error(persianMessages[error.data.code]);
    return;
  }

  if (error.detail) {
    toast.error(error.detail);
    return;
  }

  switch (error.status) {
    case 401: {
      if (error.config.url === 'auth/token/obtain/') {
        break;
      }
      try {
        dispatch('account/logout');
        toast.error('نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.');
        return;
      }
      catch (error) {
        dispatch({ type: 'account/logout' });
        toast.error('نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.');
        return;
      }
    }
    case 500:
      toast.error('ایراد سروری پیش آمده! لطفاً ما را در جریان بگذارید.');
  }

  if (errorMessage) {
    toast.error(errorMessage);
    return;
  }

  if (showHttpError && error.data?.error) {
    toast.error(error.data.error);
    return;
  }
};


export default handleError;