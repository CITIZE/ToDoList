export const minDateFunction = () => {
	const date = new Date();
	let month = `${date.getMonth() + 1}`;
	let day = `${date.getDate()}`;
	let year = `${date.getFullYear()}`

	if (date.getMonth() < 10) {
		month = '0' + month;
	}
	if (date.getDate() < 10) {
		day = '0' + day;
	}
	return `${year}-${month}-${day}`
}