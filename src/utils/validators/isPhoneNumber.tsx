const isPhoneNumber = (phoneNumber: string | number) => {
  var regex = new RegExp('09\\d{9}$');
  if (regex.test(phoneNumber.toString())) {
    return true;
  } else {
    return false;
  }
};

export default isPhoneNumber;