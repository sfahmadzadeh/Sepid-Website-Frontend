import { toast } from 'react-toastify';
import { persianMessages } from 'redux/apis/messages';

type HandleErrorPropsType = {
  error: any;
  dispatch: any;
  errorMessage?: any;
}

const handleError = ({
  error,
  dispatch,
  errorMessage = 'خطا',
}): HandleErrorPropsType => {

  if (!error) {
    toast.error('ارتباط با سرور دچار مشکل شده است.');
    return;
  }

  if (error.data?.code) {
    if (['user_not_found', 'token_not_valid'].includes(error.data.code)) {
      dispatch({ type: 'account/logout' });
      toast.error('نشست شما به پایان رسیده. لطفاً دوباره وارد سامانه شوید.');
      return;
    }

    const message = persianMessages[error.data.code] || persianMessages[error.data.detail] || error.data.detail || errorMessage;
    toast.error(message);
    return;
  }

  switch (error.status) {
    case 500:
      toast.error('ایراد سروری پیش آمده! لطفاً ما را در جریان بگذارید.');
      return;
  }

  if (errorMessage) {
    toast.error(errorMessage);
    return;
  }
};


export default handleError;