import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getDates } from '@/lib/utils';
import { Guest } from '@/types/Guest';
import { useEffect, useState } from 'react';

export default function MealSchedule() {
	const [dateArray, setDateArray] = useState({})

	useEffect(() => {
		const getDateArray= async () => {
			const resArray = await getDates();
			setDateArray(resArray)
		}

		getDateArray()
		
	}, [])
	
	return (
		<div className="mx-auto mt-10 w-full overflow-hidden rounded-lg border border-gray-200 shadow-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold">Date</TableHead>
						<TableHead className="font-bold">Breakfast</TableHead>
						<TableHead className="font-bold">Lunch</TableHead>
						<TableHead className="font-bold">Dinner</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.keys(dateArray).map((date: string) => {
						const guestArray = dateArray[date as keyof typeof dateArray] as Array<Guest>
						return <TableRow key={date}>
						<TableCell data-test-id="date">{date}</TableCell>
						<TableCell>
									<ul data-test-id="breakfast-list">
									{guestArray.map((guest: Guest) => {
										return <li key={guest.id}>{guest.name}</li>
									})}
									</ul>
								</TableCell>
								<TableCell>
									<ul data-test-id="lunch-list">
									{guestArray.map((guest: Guest) => {
										return <li key={guest.id}>{guest.name}</li>
									})}
									</ul>
								</TableCell>
								<TableCell>
									<ul data-test-id="dinner-list">
									{guestArray.map((guest: Guest) => {
										return <li key={guest.id}>{guest.name}</li>
									})}
									</ul>
								</TableCell>
					</TableRow>
					})}
				</TableBody>
			</Table>
		</div>
	);
}
