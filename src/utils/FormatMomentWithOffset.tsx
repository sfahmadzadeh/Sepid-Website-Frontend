/**
 * Converts a moment object to a formatted string with a specific timezone offset.
 * @param {moment.Moment} momentObject - The moment object to format.
 * @param {string} offset - The timezone offset in the format "+HH:mm" or "-HH:mm".
 * @returns {string} - The formatted date string.
 */
function formatMomentWithOffset(momentObject, offset = '+03:30') {
  // Parse the offset string and convert to minutes
  const [sign, hours, minutes] = offset.match(/([+-])(\d{2}):(\d{2})/).slice(1);
  const offsetInMinutes = (parseInt(hours, 10) * 60 + parseInt(minutes, 10)) * (sign === '+' ? 1 : -1);

  // Set the moment object to the specified offset
  momentObject.utcOffset(offsetInMinutes);

  // Format the moment object to the desired string format
  return momentObject.format('YYYY-MM-DDTHH:mm:ssZ');
}

export default formatMomentWithOffset;