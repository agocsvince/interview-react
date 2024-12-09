import { TableChangeProvider } from './lib/TableContext';
import GuestForm from './sections/guest-form';
import MealSchedule from './sections/meal-schedule';


function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto max-w-5xl px-4 py-12">
				<TableChangeProvider>
					<GuestForm />
					<MealSchedule />
				</TableChangeProvider>
			</div>
		</div>
	);
}

export default App;
