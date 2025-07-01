import React, { useState } from "react";
import Styles from "./UI/styles.module.css";
import { ToDoProps } from "../../widgets/ToDoList/ToDoList";
import { ToDoDateComplete, ToDoId } from "../../app/store";

export function ToDoComponent(props:ToDoProps) {
	const [isMore, setIsMore] = useState<boolean>(false);
	const id:ToDoId = props.id;
	const dateComplete:ToDoDateComplete = `${props.dateComplete}`;

	function moreHandlerClick() {
		isMore ? setIsMore(false) : setIsMore(true);
	}

	return (
		<div className={Styles.container} title = {`${!isMore ? 'Раскрыть' : 'Скрыть'}`} onClick={moreHandlerClick}>
			<div>
				<div className={Styles.toDoTitleContainer}>
					<label htmlFor="ToDoTitle" className={Styles.toDoIdLabel}>{`${props.idInList}.`}&nbsp;</label>
					<h3 id="ToDoTitle" className={`${Styles.toDoH3} ${isMore ? Styles.more : ''}`}>{props.title}</h3>
				</div>
				<p className={`${Styles.toDoP} ${isMore ? Styles.more : ''}`}>{props.description}</p>
			</div>
			<button title="Удалить" onClick={():void => props.funcDelete(id, dateComplete)} className={Styles.deleteToDoButton}>Удалить</button>
		</div>
	);
}