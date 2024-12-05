import { GUESTS_URL } from '@/constants/constants';
import { DateGroupType } from '@/types/DateGroup';
import { Guest } from '@/types/Guest';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

async function getAllGuests() {
	try {
		const response = await fetch(GUESTS_URL)
		const text = await response.text()
		const json = JSON.parse(text)

		return json
	} catch (error) {
		console.error(error)
	}
}


export async function getDates() {
	const dateGroups = {} as DateGroupType
	const guests = await getAllGuests()

	guests.map((guest: Guest) => {
		const startDate = new Date(guest.startDate);
    const endDate = new Date(guest.endDate);
    const currentDate = startDate;

		while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      if (!dateGroups[dateStr]) {
        dateGroups[dateStr] = [];
      }
      dateGroups[dateStr].push({id: guest.id, name: guest.name}); // Add guest to the date group
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }
	});

	return dateGroups
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
