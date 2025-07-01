import React from "react";
import Styles from "./UI/styles.module.css"

export function FormFilter() {
	return (
		<form className={Styles.formFilter}>
			<label htmlFor="menu__filter" style = {{marginRight: "10px"}}>Фильтр по</label>
			<select id="menu__filter">
				<option value="1">По дате ↑</option>
				<option value="2">По дате ↓</option>
				<option value="5"selected>Без фильтра</option>
				<option value="3">Выполнено</option>
				<option value="4">Не выполнено</option>
			</select>
		</form>
	);
}