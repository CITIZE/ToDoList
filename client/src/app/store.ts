import { configureStore } from "@reduxjs/toolkit";

export type ToDoId = number;
export type ToDoTitle = string;
export type ToDoDescription = string;
export type ToDoDateComplete = number | string;

export type ToDo = {
	id: ToDoId,
	dateComplete: ToDoDateComplete,
	title: ToDoTitle,
	description: ToDoDescription,
	isDone: boolean,
	todoListId: number,
	createdAt?: string,
	updatedAt?: string
}

export type ToDoState = [ToDoDateComplete, ToDo[]][];;

export type AppState = {
	toDos: ToDoState
}

export type LoadToDosAction = {
	type: 'loadToDos',
	payload: ToDo[]
}

export type AddToDoAction = {
	type: 'addToDo',
	payload: ToDo
}

export type DeleteToDoAction = {
	type: 'deleteToDo',
	payload: {
		id: ToDoId,
		taskDateComplete: ToDoDateComplete
	}
}

type Action = LoadToDosAction | DeleteToDoAction | AddToDoAction;

const initialState: AppState = {
	toDos: []
}


const reducer = (state: AppState = initialState, action: Action) => {
	switch (action.type) {
		case "loadToDos":
			const dataMap = new Map<ToDoDateComplete, ToDo[]>(state.toDos);
			for (const item of action.payload) {
				const date:ToDoDateComplete = item.dateComplete;

				if(dataMap.has(date)) {
					const existingToDos = dataMap.get(date)!;
					dataMap.set(date, [...existingToDos ,item]);
				} else {
					dataMap.set(date, [item]);
				}
			}

			return {
				...state,
				toDos: Array.from(dataMap)
			};
		case "addToDo": {
			const date = `${action.payload.dateComplete}`;
			const dataMap = new Map<ToDoDateComplete, ToDo[]>(state.toDos);
			if (dataMap.has(date)) {
				const existingToDos = dataMap.get(date)!;
				dataMap.set(date, [...existingToDos, action.payload])
			} else {
				dataMap.set(date, [action.payload]);
			}
			return {
				...state,
				toDos: Array.from(dataMap)
			}
		};
		case "deleteToDo": {
			const dataMap = new Map<ToDoDateComplete, ToDo[]>(state.toDos);
			const tasks:ToDo[] = dataMap.get(action.payload.taskDateComplete)!;
			const filteredTasks:ToDo[] | [] = tasks.filter(item => item.id !== action.payload.id);
			if (filteredTasks.length !== 0) {
				dataMap.set(action.payload.taskDateComplete, [...filteredTasks])
			} else {
				dataMap.delete(action.payload.taskDateComplete);
			}
			return {
				...state,
				toDos: Array.from(dataMap)
			}
		};
		default: 
			return state;
	}
}

export const store = configureStore({
	reducer: reducer,
})