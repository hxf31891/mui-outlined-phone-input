import { Body2 } from 'app/shared-components/Typography';
import { countries, preferred } from './countries';
import { CountryCode } from 'libphonenumber-js';
import { Portal } from '@material-ui/core';
import { useState } from 'react';

const PhoneInputCountryDrawer = ({
	status,
	inputRef,
	setStatus,
	countryData,
	handleChange,
	setSelectedCountry
}: {
	inputRef: React.RefObject<HTMLInputElement>;
	status: 'hidden' | 'opening' | 'open' | 'closing';
	setSelectedCountry: (country: CountryCode) => void;
	countryData?: { code: string; name: string; dial_code: string };
	handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
	setStatus: (status: 'hidden' | 'opening' | 'open' | 'closing') => void;
}) => {
	const position = inputRef && inputRef?.current ? inputRef?.current?.getBoundingClientRect() : null;
	const [search, setSearch] = useState('');

	if (status === 'hidden') return null;

	const handleClose = () => {
		setStatus('closing');
		setTimeout(() => setStatus('hidden'), 200);
	};

	const filtered =
		search?.length > 0
			? countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
			: countries;

	return (
		<Portal>
			<div
				style={{ backgroundColor: status === 'open' ? 'rgba(0, 0, 0, 0.18)' : 'transparent' }}
				className="fixed left-0 top-0 w-[100vw] h-[100vh] z-[30] transition-all duration-200"
				onClick={() => {
					setSearch('');
					handleClose();
				}}
			/>
			<div
				className="absolute z-[40] bg-white rounded-[4px] shadow-md"
				style={{
					left: position?.left,
					width: position?.width,
					transition: 'all 0.2s ease-in-out',
					opacity: status === 'open' ? 1 : 0,
					top: (position?.top ?? 0) + (position?.height ?? 0),
					transform: status === 'open' ? 'translateY(0px)' : 'translateY(15px)'
				}}
			>
				<div className="px-12 w-full mt-12 mb-8">
					<input
						type="text"
						value={search}
						placeholder="Search"
						onChange={e => setSearch(e.target.value)}
						className="w-full h-[36px] border-none outline-none rounded-[3px] shadow-inner shadow-inner-mid pl-10 bg-gray-100"
					/>
				</div>
				<div className="max-h-[340px] overflow-y-auto no-scrollbar pb-8">
					{!search && (
						<>
							{countryData && (
								<CountryItem
									country={countryData}
									setSearch={setSearch}
									handleClose={handleClose}
									handleChange={handleChange}
									setSelectedCountry={setSelectedCountry}
								/>
							)}
							{preferred?.map(country => {
								if (country.code === countryData?.code) return null;
								return (
									<CountryItem
										key={country.code}
										country={country}
										setSearch={setSearch}
										handleClose={handleClose}
										handleChange={handleChange}
										setSelectedCountry={setSelectedCountry}
									/>
								);
							})}
							<div className="mt-5 mb-5 border-b-1" />
						</>
					)}
					{filtered?.map(country => (
						<CountryItem
							key={country.code}
							country={country}
							setSearch={setSearch}
							handleClose={handleClose}
							handleChange={handleChange}
							setSelectedCountry={setSelectedCountry}
						/>
					))}
				</div>
			</div>
		</Portal>
	);
};

export default PhoneInputCountryDrawer;

const CountryItem = ({
	country,
	setSearch,
	countryData,
	handleClose,
	handleChange,
	setSelectedCountry
}: {
	handleClose: () => void;
	setSearch: (search: string) => void;
	setSelectedCountry: (country: CountryCode) => void;
	country: { code: string; name: string; dial_code: string };
	countryData?: { code: string; name: string; dial_code: string };
	handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	const { code, name, dial_code } = country;
	return (
		<div
			onClick={() => {
				setSearch('');
				handleClose();
				setSelectedCountry(code as CountryCode);
				if (code !== countryData?.code)
					handleChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
			}}
			className="flex items-center gap-10 cursor-pointer px-14 py-7 hover:bg-gray-100"
		>
			<img
				className="w-[36px] h-[24px] object-cover shadow-md mr-4"
				src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
				alt={code}
			/>
			<Body2 color="black">{name}</Body2>
			<Body2 color="caption">{dial_code}</Body2>
		</div>
	);
};
