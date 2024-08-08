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

  // form field errors
  let isAnyErrorShowed = false;
  for (let field in error.data) {
    const fieldError = error.data[field]
    if (fieldError.code) {
      const message = persianMessages[fieldError.code] || persianMessages[fieldError.detail] || fieldError.detail;
      toast.error(`فیلد ${Fields[field]}: ${message}`);
      isAnyErrorShowed = true;
    }
  }
  if (isAnyErrorShowed) return;

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


const Fields = {
  'price': 'قیمت',
  'discounted_price': 'قیمت تخفیف‌خورده',
}