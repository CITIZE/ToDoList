import React, {useState, useRef, useEffect, useMemo} from 'react';
import { Button } from '../../shared/Button/Button';
import Styles from './UI/styles.module.css';
import { minTimeFunction } from './minTime';
import { minDateFunction } from './minDate';

export type MinTimeProps = string;
export type GetTimeProps = HTMLInputElement;
type FormChoiceDateProps = {
	callback: (isChoiceDateActionProp: boolean, dateCompletedProp:Date, isChoiceDateProp:boolean, getTimeProp?: string) => void,
	closeFormDate: (isOpen: boolean) => void
};

export function FormChoiceDate({callback, closeFormDate}: FormChoiceDateProps) {
	const [dateInput, setDateInput] = useState<string>('');
	const [isDisabledInputDay, setIsDisabledInputDay] = useState<boolean>(true);

	const timeInputRef = useRef<HTMLInputElement>(null);

	const minTime:string = useMemo(() => {
		return minTimeFunction(dateInput)
	}, [dateInput]);

	const minDate:string = useMemo(() => {
		return minDateFunction();
	}, [])

	useEffect(() => {
		if (dateInput) {
			const dateString:string = dateInput;
			const date:number[] = dateString.split('-').map(item => parseInt(item));
			let month:number = date[1] - 1;
			let year:number = date[0];
			let day:number = date[2];

			const today:Date = new Date();
			if (today.getFullYear() > year || (today.getFullYear() === year && today.getMonth() > month) ||(today.getFullYear() === year && today.getMonth() === month && today.getDate() > day) || year >= 2200){
				setIsDisabledInputDay(true);
			} else {
				setIsDisabledInputDay(false);
			}
		} else {
			setIsDisabledInputDay(true);
		}
	}, [dateInput])

	function handlerFormDateSubmit(e: React.FormEvent<HTMLFormElement>):void {
		e.preventDefault();
		if (dateInput) {
			const dateString:string = dateInput;
			const dateNumberArray:number[] = dateString.split('-').map(item => parseInt(item));
			const year:number = dateNumberArray[0];
			const month:number = dateNumberArray[1] - 1;
			const day:number = dateNumberArray[2];
			if (timeInputRef.current && timeInputRef.current.value) {
				const timeString:string = timeInputRef.current.value;
				const timeNumberArray:number[] = timeString.split(':').map(item => parseInt(item));
				const hours:number = timeNumberArray[0];
				const minutes:number = timeNumberArray[1];

				const date:Date = new Date(year, month, day, hours, minutes);
				callback(true, date, false, timeInputRef.current.value);
			} else {
				const date:Date = new Date(year, month, day, 0,0);
				callback(true, date, false);
			}
		}
	}

	return(
		<div  className={Styles.formDateContainer}>
			<form  className={Styles.formDate} onSubmit={handlerFormDateSubmit}>
			<svg onClick={() => closeFormDate(false)} role="button" aria-label="Кнопка закрыть форму авторизации" className={Styles.closeDateChoiceForm} viewBox="0 0 12 12">
				<line x1="1" y1="11" x2="11" y2="1" stroke="#FF4D00" strokeWidth="1" />
				<line x1="1" y1="1" x2="11" y2="11" stroke="#FF4D00" strokeWidth="1" />
			</svg>
			<div className={Styles.inputContainer}>
				<label htmlFor="input3">Выберите дату: </label>
				<input min={minDate} id="input3" type="date" className={Styles.formAddToDoInput} value={dateInput} onChange={(e) => setDateInput(e.target.value)} max={"2199-12-31"}/>
			</div>
			<div className={Styles.inputContainer}>
				<label htmlFor="input4">Выберите время (необязатеьное поле): </label>
				<input min={minTime} id="input4" type="time" className={Styles.formAddToDoInput} disabled={isDisabledInputDay} ref={timeInputRef}/>
			</div>
				<Button type={1}>Ок</Button>
			</form>
		</div>);
}