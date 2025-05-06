import { InputProps } from './types';
import { countries } from './countries';
import PhoneInputCountryDrawer from './Drawer';
import React, { useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
}: InputProps) => {
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
      <ThemeProvider theme={datePickerTheme(error)}>
        <TextField
          error={error}
          label={label}
          ref={inputRef}
          variant="outlined"
          disabled={disabled}
          onChange={handleChange}
          value={localValue ?? ""}
          onKeyDown={handleKeyDown}
          className={`w-full ${className}`}
          helperText={error ? helperText ?? "Phone number is invalid" : ""}
          slotProps={{
            input: {
              placeholder: placeholder || "(504) 555-5555",
              startAdornment: (
                <InputAdornment position="start" onClick={handleOpen}>
                  <div className="flex items-center gap-6 cursor-pointer group pr-1">
                    <img
                      className="w-[30px] h-[20px] object-cover group-hover:scale-110 transition-all duration-300 shrink-0 shadow-md"
                      src={`https://flagcdn.com/${selectedCountry.toLowerCase()}.svg`}
                      alt={selectedCountry}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={{ width: '14px', height: '14px' }}>
                      <polygon points="195 52.54 100.42 147.46 5 52.54 195 52.54"/>
                    </svg>
                  </div>
                </InputAdornment>
              ),
            }
          }}
        />
      </ThemeProvider>
      <PhoneInputCountryDrawer
        status={status}
        setStatus={setStatus}
        countryData={countryData}
        handleChange={handleChange}
        setSelectedCountry={setSelectedCountry}
		    inputRef={inputRef as React.RefObject<HTMLInputElement>}
      />
    </div>
  );
};

export default PhoneInput;

export const datePickerTheme = (error?: boolean) => {
	const borderColor = '#05321E';
	return createTheme({
		components: {
			MuiInputLabel: {
				styleOverrides: {
					root: {
						fontSize: '13.2px',
						fontFamily: 'Poppins !important',
						'&.Mui-focused': { color: borderColor },
						'&.MuiInputLabel-outlined': { marginTop: '1px !important' }
					}
				}
			},
			MuiInputBase: { styleOverrides: { input: { fontSize: '13.2px', fontFamily: 'Poppins !important' } } },
			MuiOutlinedInput: {
				styleOverrides: {
					notchedOutline: { legend: { fontSize: '11px' } },
					root: {
						'&.Mui-focused fieldset': {
							borderColor: `${borderColor} !important`
						}
					},
          input: {
            padding: '16.74px 14px 16.74px 0px',
          }
				}
			},
			MuiIconButton: { styleOverrides: { edgeEnd: { marginRight: '0px' } } },
			MuiButtonBase: { styleOverrides: { root: { color: error ? '#B63300 !important' : '' } } },
			MuiFormHelperText: { styleOverrides: { root: { fontSize: '11px', fontFamily: 'Poppins' } } },
			MuiFilledInput: {
				styleOverrides: {
					root: {
						borderBottomLeftRadius: '4px',
						borderBottomRightRadius: '4px',
						'&:after': { borderBottom: 'none !important' },
						'&:before': { borderBottom: 'none !important' }
					}
				}
			}
		}
	});
};
