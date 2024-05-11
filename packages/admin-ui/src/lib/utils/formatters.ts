/**
 * Format phone number to 1234 567 890
 */
export const getFormattedPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};

/**
 * Format dates to Aug 21 at 9:32 am
 */
export const getFormattedDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};
