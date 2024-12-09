import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useTableChange } from '@/lib/TableContext';
import { getDates } from '@/lib/utils';
import { Guest } from '@/types/Guest';
import { useEffect, useState } from 'react';

export default function MealSchedule() {
	const [dateArray, setDateArray] = useState({})
	const { isChanging } = useTableChange();

	useEffect(() => {
		const getDateArray = async () => {
			const resArray = await getDates();
			setDateArray(resArray)
		}

		if (!isChanging) {
			getDateArray()
		}
		
	}, [isChanging])

	const guestList = (guestArray: Array<Guest>) => {
		return guestArray.map((guest: Guest) => {
			return <li key={guest.id}>{guest.name}</li>
		})
	}
	
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
									{guestList(guestArray)}
									</ul>
								</TableCell>
								<TableCell>
									<ul data-test-id="lunch-list">
									{guestList(guestArray)}
									</ul>
								</TableCell>
								<TableCell>
									<ul data-test-id="dinner-list">
									{guestList(guestArray)}
									</ul>
								</TableCell>
					</TableRow>
					})}
				</TableBody>
			</Table>
		</div>
	);
}
