export const required = value => value ? undefined : 'Required';
export const email = domain => value => new RegExp(`^[A-Za-z0-9._%+-]+@${domain}$`, 'i').test(value) ? undefined : 'Invalid email address';
export const password = value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(value) ? undefined : 'Password must contain one number, one lower case, one upper case, and be at least 6 characters';

export const number = value => value && isNaN(value) ? 'Must be a number' : undefined;
export const maxChars = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const minChars = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const maxAmount = max => value => value && value > max ? `Must be ${max} or less` : undefined;
export const minAmount = min => value => value && value < min ? `Must be ${min} or more` : undefined;
export const maxDate = max => value => value && value > max ? `Must be on or before ${max}` : undefined;
export const minDate = min => value => value && value < min ? `Must be on or after ${min}` : undefined;
export const maxSelection = max => value => value && value.length > max ? `Must select ${max} items or less` : undefined;
export const minSelection = min => value => value && value.length < min ? `Must select ${min} items or more` : undefined;
export const customVal = (validation, msg) => validation() ? undefined : msg;

export const inmarEmail = email('inmar.com');
export const maxNameLength = maxChars(15);
export const minNameLength = minChars(3);

export const maxAge = maxAmount(150);
export const minAge = minAmount(18);
export const maxPasswordLength = maxChars(15);
export const minPasswordLength = minChars(3);
export const todayOrAfter = minDate(new Date());