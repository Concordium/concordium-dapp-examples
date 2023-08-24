export function addDays(date: Date, days: number) {
	const futureDate = date.getDate() + days;
	date.setDate(futureDate);
	date.setHours(date.getHours() + 1);
	date.setMinutes(0);
	date.setSeconds(0);
	return date.toISOString().slice(0, -8);
}
