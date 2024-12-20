import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { addGuest } from '@/lib/utils';
import { RequestGuest } from '@/types/Guest';
import { format } from 'date-fns';
import { useTableChange } from '@/lib/TableContext';

export default function GuestForm() {
	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState<Date | undefined>();
	const [endDate, setEndDate] = useState<Date | undefined>();
	const { setIsChanging } = useTableChange();

	const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		// add guest to form
		const quest: RequestGuest = {
			name: name,
			startDate: format(startDate as Date, 'yyyy-MM-dd'),
			endDate: format(endDate as Date, 'yyyy-MM-dd')
		}
		addGuest(quest, setIsChanging)
		
		// reset input fields
		setName('')
		setStartDate(undefined)
		setEndDate(undefined)
	}

	return (
		<div className="mx-auto mt-8 w-full">
			<form className="space-y-6">
				<div className="flex flex-wrap gap-4">
					<Input
						type="text"
						placeholder="Guest Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						data-test-id="name-input"
						required
						className="flex-1"
					/>
					<DatePicker
						date={startDate}
						onDateChange={setStartDate}
						placeholder="Start Date"
						className="flex-1"
					/>
					<DatePicker
						date={endDate}
						onDateChange={setEndDate}
						placeholder="End Date"
						className="flex-1"
					/>
				</div>
				<div className="flex w-full justify-center">
					<Button data-test-id="submit-button" className="w-1/2"
					 onClick={handleButtonClick}
					 >
						Add to Menu
					</Button>
				</div>
			</form>
		</div>
	);
}
