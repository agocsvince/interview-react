export type Guest = {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
};

export type RequestGuest= Pick<Guest, 'name' | 'startDate' | 'endDate'>