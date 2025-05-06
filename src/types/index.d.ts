export interface InputProps {
	value: string;
	label?: string;
	error?: boolean;
	className?: string;
	disabled?: boolean;
	helperText?: string;
	placeholder?: string;
	wrapperClassName?: string;
	onChange: (value: string) => void;
}

export interface DrawerProps {
  inputRef: React.RefObject<HTMLInputElement>;
  status: "hidden" | "opening" | "open" | "closing";
  setSelectedCountry: (country: CountryCode) => void;
  countryData?: { code: string; name: string; dial_code: string };
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setStatus: (status: "hidden" | "opening" | "open" | "closing") => void;
}

export interface Country {
  code: string;
  name: string;
  dial_code: string;
}

