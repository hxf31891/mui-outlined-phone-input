import Input from './Input';
import { isValidPhoneNumber } from './utils';

// Input for international phone numbers
// Digests phone numbers and formats them based on the selected country code
// While the input displays a formatted version of the users number, behind the scenes we work with and save the international, unformatted version

// **** IMPORTANT ****
// Before saving the phone number, make sure that is valid using the isValidPhoneNumber function exported below
// if not, you can use the error and helperText props to display an error message to the user

// example formatted (504) 301-7369
// example international +15043017369

// props:
// - onChange (value: string) => void
// - value

// - label (optional) defaults to 'Phone number'
// - placeholder (optional)

// - error (optional) boolean that is true if the phone number is invalid
// - helperText (optional) string that is the helper text for the phone number
// - disabled (optional) boolean that is true if the phone number input is disabled

export default Input;
export { isValidPhoneNumber };
