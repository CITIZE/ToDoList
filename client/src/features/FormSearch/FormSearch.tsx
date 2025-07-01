import React from "react";
import Styles from "./UI/styles.module.css"

export function FormSearch() {
	return (
		<form className={Styles.formSearch}>
			<input type="search" />
			<button>Поиск</button>
		</form>
	);
}