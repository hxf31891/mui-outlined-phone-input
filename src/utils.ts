import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const isValidPhoneNumber = (phoneNumber?: string | null) => {
	if (!phoneNumber) return false;
	return parsePhoneNumberFromString(phoneNumber, 'US')?.isValid() ?? false;
};
