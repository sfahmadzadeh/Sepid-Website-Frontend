const isNumber = (input: string | number) => {
  var regex = new RegExp(`\\d{${input.toString().length}}`);
  if (regex.test(input.toString())) {
    return true;
  } else {
    return false;
  }
};

export default isNumber;