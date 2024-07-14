/**
 * Format phone number to 1234 567 890
 */
export const formatPhoneNumber = (input: { phoneNumber?: string; phoneCountryCode?: string }) => {
  if (!input.phoneNumber) return '';

  const formattedNumber = input.phoneNumber?.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');

  return `+ ${input.phoneCountryCode} ${formattedNumber}`;
};

/**
 * Format dates to Aug 21 at 9:32 am
 */
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

/**
 * Convert formatted price to number
 *
 * @example
 * getFormattedPrice('$1,234.56') // 123456
 */
export const parseFormattedPrice = (price: string) => {
  const parsedPrice = price;

  const decimals = Number(price.split('.')[1]);

  if (!decimals) {
    // if decimals are zero, remove them and remove all non-numeric characters (, . $)
    return price.split('.')[0].replace(/[^0-9]/g, '');
  } else {
    // if decimals are present, remove all non-numeric characters (, and $)
    return parsedPrice.replace(/[^0-9.]/g, '');
  }
};

export const getFullName = (input: { firstName?: string; lastName: string }) => {
  if (!input.firstName) {
    return input.lastName;
  }

  return `${input.firstName} ${input.lastName}`;
};

/**
 * Add 3 dots to the end of the string if it's longer than the limit
 *
 * @example
 * add3dots('Hello World', 5) // Hello...
 * add3dots('Hello World', 20) // Hello World
 */
export const add3dots = (str: string, limit: number) => {
  return str.length > limit ? str.substring(0, limit) + '...' : str;
};
