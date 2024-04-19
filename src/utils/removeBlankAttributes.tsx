function removeBlankAttributes(obj: any): any {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      result[key] = obj[key];
    }
  }
  return result;
}

export default removeBlankAttributes;