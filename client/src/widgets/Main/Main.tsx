import React, { useContext } from "react";
import Styles from "./UI/styles.module.css";
import { MainContext } from "../../pages/HomePage/HomePage";
import { ToDoList } from "../ToDoList/ToDoList";
import { store } from "../../app/store";
import { TMainContext } from "../../pages/HomePage/HomePage";

export function Main() {
	const mainContext = useContext(MainContext) as TMainContext;
	return (
		<main className={Styles.container}>
			{mainContext.isAuth ? 
				<>
					{store.getState().toDos.length !== 0 ? <h2 className={Styles.tasksH2}>Задачи</h2> : ''}
					<ToDoList/> 
				</>
				:
				<div className={Styles.mainLendingContainer}>
					<h2 className={Styles.mainLendingText}>планируй</h2>
					<h2 className={Styles.mainLendingText}>действуй</h2>
					<h2 className={Styles.mainLendingText}>побеждай</h2>
				</div>
			}
		</main>
	);
}