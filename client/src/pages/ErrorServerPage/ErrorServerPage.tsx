import React from "react";
import Styles from "./UI/styles.module.css";

export function ErrorServerPage() {

	return(
	<div className={Styles.error}>
		<h1 className={Styles.errorH1}>Ошибка 500</h1>
		<h2 className={Styles.errorH2}>Сервер не отвечает</h2>
	</div>
	);
}