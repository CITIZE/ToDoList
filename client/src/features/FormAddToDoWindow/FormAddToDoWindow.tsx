import React, { useRef, useState, useEffect, useReducer} from "react";
import Styles from "./UI/styles.module.css";
import { Button } from "../../shared/Button/Button";
import { store, ToDoDescription, ToDoTitle, AddToDoAction, ToDoDateComplete } from "../../app/store";
import { getMonth } from "../FormChoiceDate/getMonth";
import { FormChoiceDate } from "../FormChoiceDate/FormChoiceDate";

type FormAddToDo = {
	funcExitWindow: () => void
}

async function fetchCreateToDo(title:ToDoTitle, dateCompleted: ToDoDateComplete, description:ToDoDescription) {
	try {
		const token = localStorage.getItem('token');
		const res = await fetch("http://localhost:6001/api/user/to-do-list/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"authorization": "Bearer " + token
			},
			body: JSON.stringify({
				title,
				description,
				dateComplete: dateCompleted,
			})
		})
		if (res.ok) {
			const data = await res.json().then(data => data.idToDo);
			localStorage.setItem('idToDo', data)
		}
	} catch(error) {
		console.log(error);
	}
}



export function FormAddToDoWindow(props:FormAddToDo) {
	const [,forceUpdate] = useReducer(x => x + 1, 0);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
				forceUpdate();
		});
		return unsubscribe;
	}, [])

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const [errorText, setErrorText] = useState<string>('');
	const [dateCompleted, setDateCompleted] = useState<Date>(() => {
		const today = new Date()
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow.setHours(0,0,0,0);
		return tomorrow;
	});
	const [isChoiceDate, setIsChoiceDate] = useState<boolean>(false);
	const [isChoiceDateAction, setIsChoiceDateAction] = useState<boolean>(false);
	const [timeCompleted, setTimeCompleted] = useState<string>('00:00');
	
	function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		async function addToDo() {
			const title = titleRef.current?.value;
			const desc = descriptionRef.current?.value;
			const description = desc ? desc : ' ';
			if (dateCompleted.getDate() === new Date().getDate() && timeCompleted === '00:00') {
				const dateForReload = dateCompleted;
				dateForReload.setDate(dateCompleted.getDate() + 1)
				setDateCompleted(dateForReload);
			}
			const dateComplete:number = dateCompleted.getTime();
			if (title && description && dateComplete) {	
				props.funcExitWindow();
				await fetchCreateToDo(title, dateComplete, description); 
				store.dispatch({type: 'addToDo', payload: {title, description, dateComplete, id: Number(localStorage.getItem('idToDo')), todoListId: Number(localStorage.getItem('toDoListId')), isDone: false}} satisfies AddToDoAction)
			} else {
				setErrorText("Введите заголовок")
			}
		}
		addToDo();
	}
	function handlerChoiceDate(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setIsChoiceDate(true);
	}

	function handlerFormDateSubmit(isChoiceDateActionProp: boolean, dateCompletedProp:Date, isChoiceDateProp:boolean, getTimeProp: string = '00:00'):void {
		setIsChoiceDateAction(isChoiceDateActionProp);
		setDateCompleted(dateCompletedProp);
		setIsChoiceDate(isChoiceDateProp);
		setTimeCompleted(getTimeProp);
	}

	function closeFromDate(isOpen: boolean):void {
		setIsChoiceDate(isOpen);
	}

	return (
		<div className={Styles.container}>
			<form onSubmit={handlerSubmit} className={Styles.form} >
				<h2 className={Styles.formAddToDoWindowH2}>Новая задача</h2>
				<svg onClick={() => props.funcExitWindow()} role="button" aria-label="Кнопка закрыть форму авторизации" className={Styles.closeAddToDoForm} viewBox="0 0 12 12">
					<line x1="1" y1="11" x2="11" y2="1" stroke="#FF4D00" strokeWidth="1" />
					<line x1="1" y1="1" x2="11" y2="11" stroke="#FF4D00" strokeWidth="1" />
				</svg>
				<div className={Styles.inputContainer}>
					<label>Введите заголовок: </label>
					<input onClick={errorText === "Введите заголовок" ? () => {setErrorText('')} : ()=>{}} ref={titleRef} placeholder="Заголовок" autoComplete="false" type="text" className={errorText === "Введите заголовок" ? `${Styles.formAddToDoInput} ${Styles.errorTitle}` : `${Styles.formAddToDoInput}`}/>
				</div>
				<div className={Styles.inputContainer}>
					<label>Введите примечание: </label>
					<textarea ref={descriptionRef} autoComplete="false" placeholder="Примечание (необязательное поле)" className={Styles.formAddToDoInput} />
				</div>
				<div className={Styles.buttonsContainer}>
					<button className={Styles.buttonChoiceDate} type="button" onClick={handlerChoiceDate}>Укажите дату выполнения ({isChoiceDateAction ? `до ${timeCompleted === '00:00' && dateCompleted.getDate() === new Date().getDate() ? dateCompleted.getDate() + 1 : dateCompleted.getDate()} ${getMonth(dateCompleted.getMonth())} ${dateCompleted.getFullYear()}г. ${timeCompleted}` :"по умолчанию – до конца дня"})</button>
					<Button type={1}>Создать</Button>
				</div>
				<p className={Styles.errorText}>{errorText}</p>
			</form>
			{isChoiceDate ? <FormChoiceDate callback={handlerFormDateSubmit} closeFormDate={closeFromDate}/>: null}
		</div>
	);
}