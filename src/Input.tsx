import { countries } from './countries';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInputCountryDrawer from './Drawer';
import { MdArrowDropDown } from 'react-icons/md';
import { TextField, InputAdornment } from '@material-ui/core';
import { parsePhoneNumberFromString, AsYouType, CountryCode } from 'libphonenumber-js';

const PhoneInput = ({
	onChange,
	value = '',
	error = false,
	className = '',
	helperText = '',
	placeholder = '',
	disabled = false,
	wrapperClassName = '',
	label = 'Phone number'
}: {
	value: string;
	label?: string;
	error?: boolean;
	className?: string;
	disabled?: boolean;
	helperText?: string;
	placeholder?: string;
	wrapperClassName?: string;
	onChange: (value: string) => void;
}) => {
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);
	const [status, setStatus] = useState<'hidden' | 'opening' | 'open' | 'closing'>('hidden');

	const parsed = parsePhoneNumberFromString(value, 'US');
	const [localValue, setLocalValue] = useState<string>(parsed?.nationalNumber ?? '');
	const [selectedCountry, setSelectedCountry] = useState<CountryCode>(parsed?.country ?? 'US');

	const countryData = countries.find(country => country.code === selectedCountry);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = new AsYouType(selectedCountry).input(e.target.value);
		const phone = parsePhoneNumberFromString(formatted, selectedCountry);
		onChange(phone?.number ?? '');
		setLocalValue(formatted);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (localValue?.length > 0 && localValue[localValue.length - 1] === ')' && e.key === 'Backspace') {
			e.preventDefault();
			setLocalValue(localValue.slice(1, -2));
			onChange(`${countryData?.dial_code} ${localValue.slice(1, -2)}`);
		}
	};

	const handleOpen = () => {
		setStatus('opening');
		setTimeout(() => setStatus('open'), 100);
	};

	return (
		<div className={`relative w-full ${wrapperClassName}`}>
			<TextField
				error={error}
				ref={inputRef}
				label={t(label)}
				variant="outlined"
				disabled={disabled}
				onChange={handleChange}
				value={localValue ?? ''}
				onKeyDown={handleKeyDown}
				className={`w-full ${className}`}
				helperText={error ? helperText ?? 'Phone number is invalid' : ''}
				InputProps={{
					placeholder: placeholder || '(504) 555-5555',
					startAdornment: (
						<InputAdornment position="start" onClick={handleOpen}>
							<div className="flex items-center gap-6 cursor-pointer group pr-1">
								<img
									className="w-[30px] h-[20px] object-cover group-hover:scale-110 transition-all duration-300 shrink-0 shadow-md"
									src={`https://flagcdn.com/${selectedCountry.toLowerCase()}.svg`}
									alt={selectedCountry}
								/>
								<MdArrowDropDown className="text-14 text-gray-700 shrink-0" />
							</div>
						</InputAdornment>
					)
				}}
			/>
			<PhoneInputCountryDrawer
				status={status}
				inputRef={inputRef}
				setStatus={setStatus}
				countryData={countryData}
				handleChange={handleChange}
				setSelectedCountry={setSelectedCountry}
			/>
		</div>
	);
};

export default PhoneInput;
