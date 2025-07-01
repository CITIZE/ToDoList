import { MinTimeProps } from "./FormChoiceDate";

export const minTimeFunction = (dateInput:MinTimeProps):string => {
	if (dateInput) {
		const dateString:string = dateInput;
		const date:number[] = dateString.split('-').map(item => parseInt(item));
		let month:number = date[1] - 1;
		let year:number = date[0];
		let day:number = date[2];

		const today:Date = new Date();
		let minutes:string = today.getMinutes() + 1 +'';
		let hours:string = today.getHours() + '';
		if (minutes.length < 2) {
			minutes = '0' + minutes;
		}
		if(hours.length < 2) {
			hours = '0' + hours;
		}
		if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
			return `${hours}:${minutes}`;
		}
	}
	return '00:00'
}