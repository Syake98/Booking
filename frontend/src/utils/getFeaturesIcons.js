import { Tv2, Snowflake, AirVent, Wifi, Microwave, Bath } from 'lucide-react';

const data = {
	tv: [Tv2, 'телевизор'],
	fridge: [Snowflake, 'холодильник'],
	conditioner: [AirVent, 'кондиционер'],
	wifi: [Wifi, 'wifi'],
	microwave: [Microwave, 'микроволновка'],
	bath: [Bath, 'ванна'],
};

export const getFeaturesIcons = (className, feature) => {
	const Icon = data[feature][0];
	const sign = data[feature][1];

	return (
		<div className={className}>
			<Icon size={20} />
			<span>{sign}</span>
		</div>
	);
};
