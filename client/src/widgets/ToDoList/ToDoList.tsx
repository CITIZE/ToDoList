import React, { useEffect, useReducer, useRef} from "react";
import Styles from "./UI/styles.module.css";
import { ToDoComponent } from "../../entities/ToDoComponent/ToDoComponent";
import { LoadToDosAction, DeleteToDoAction, ToDo, ToDoId, store, ToDoDateComplete } from "../../app/store";
import { getMonth } from "../../features/FormChoiceDate/getMonth";

export type ToDoProps = ToDo & {
	funcDelete: (id: ToDoId, taskDateComplete: ToDoDateComplete) => void;
	idInList: number;
}

async function fetchToDoList():Promise<ToDo[] | undefined> {
	try {
		const token = localStorage.getItem("token");
		const res = await fetch(`http://localhost:6001/api/user/to-do-list`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"authorization": `Bearer ${token}`
			}
		})
		if (res.ok) {
			const data = await res.json();
			localStorage.setItem('todoListId', data.todoListId);
			return data.toDos as ToDo[];
		}
	} catch(error) {
		console.log(error);
		return [];
	}
}

async function fetchDeleteToDo(id: ToDoId):Promise<void> {
	try {
		const token = localStorage.getItem("token");
		await fetch(`http://localhost:6001/api/user/to-do-list`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				id
			})
		})
	} catch(error) {
		console.log(error);
	}
}



export function ToDoList() {
	const datesTasks = useRef<ToDoDateComplete[]>([]);

	const [,forceUpdate] = useReducer(x => x + 1, 0);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const datesSet = new Set<ToDoDateComplete>(new Map(store.getState().toDos).keys());
			const sortedDates = Array.from(datesSet).map(item => +item).sort((a,b) => a - b);
			datesTasks.current = sortedDates;
			forceUpdate();
		});
		return unsubscribe;
	}, [])

	useEffect(() => {
		async function getToDoList():Promise<void> {
			const data: ToDo[] | undefined = await fetchToDoList();
			
			if (data) {
				store.dispatch({type: 'loadToDos', payload: data} satisfies LoadToDosAction);
			}
		}
		getToDoList();
	}, [])

	function getTimeDateToDo(dateIterator:ToDoDateComplete):string {
		const date: Date = new Date(dateIterator);
		const fullDateString = `${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear() === new Date().getFullYear() ? '' : `${date.getFullYear()}г.`}`;
		const timeString = date.getHours() === 0 && date.getMinutes() === 0 ? '' : getTime(date);

		return `до ${fullDateString} ${timeString}`;
	}
	function getArrayTasks(dateIterator: ToDoDateComplete): ToDo[] {
		const dataMap = new Map<number | string, ToDo[]>(store.getState().toDos);
		return dataMap.get(`${dateIterator}`)!;
	}

	function deleteToDo(id: ToDoId, taskDateComplete: ToDoDateComplete): void {
		fetchDeleteToDo(id);
		store.dispatch({type: 'deleteToDo', payload: {id, taskDateComplete}} satisfies DeleteToDoAction);
	}

	function getTime(date:Date):string {
		let hours:string = `${date.getHours()}`;
		let minutes:string = `${date.getMinutes()}`;

		if(hours.length === 1) {
			hours = '0' + hours;
		}
		if(minutes.length === 1) {
			minutes = '0' + minutes;
		}

		return `${hours}:${minutes}`
	}

	return (
		<div className={Styles.container}>
		 {store.getState().toDos.length === 0 ? <div className={Styles.flexContainer}><h2 className={Styles.noToDoH2}>{"Твой ТуДушка пуст :("}</h2></div> : 
				datesTasks.current.map(dateIterator => (
					<div className={Styles.toDoContainer}>
						<h3 className={Styles.tasksH3} key = {dateIterator}>{Number(dateIterator) > new Date().getTime() ? getTimeDateToDo(dateIterator) : `${getTimeDateToDo(dateIterator)} (Просрочено)`}</h3>
							{getArrayTasks(dateIterator).map((todo: ToDo, index: number) => (
									<ToDoComponent funcDelete={deleteToDo} key={todo.id} {...todo} idInList={index + 1} />
							))}
					</div>
				))
		 }
		</div>
	);
}