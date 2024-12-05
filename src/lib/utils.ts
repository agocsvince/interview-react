import { GUESTS_URL } from '@/constants/constants';
import { Guest } from '@/types/Guest';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function addGuest(guest: Guest) {
	const options = { 
		'method': 'POST', 
		headers: { 
			'Content-Type': 'application/json'
		 }, 
		body: JSON.stringify(guest)
	};
	try {
		const response = await fetch(GUESTS_URL, options)
		const text = await response.text()
		const json = JSON.parse(text)

		return json
	} catch (error) {
		console.error(error)
	}
}
