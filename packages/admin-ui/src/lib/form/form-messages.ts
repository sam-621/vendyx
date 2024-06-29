export const FormMessages = {
  required: 'required field',
  minChars: (min: number) => `Should be at least ${min} chars`,
  maxChars: (max: number) => `Could not exceed ${max} chars`,
  minValue: (min: number) => `Should be at least ${min}`,
  maxValue: (max: number) => `Could not exceed ${max}`,
  invalidEmail: 'Invalid email',
  invalidPhoneNumber: 'Invalid phone number'
};
