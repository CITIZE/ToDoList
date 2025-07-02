import React, { useState } from "react";
import Styles from "./UI/styles.module.css";
import { FormSearch } from "../../features/FormSearch/FormSearch";
import { FormFilter } from "../../features/FormFilter/FormFilter";
import { Button } from "../../shared/Button/Button";
import { FormAddToDoWindow } from "../../features/FormAddToDoWindow/FormAddToDoWindow";


export function HeaderUser() {
	const [isAddToDo, setIsAddToDo] = useState<boolean>(false);

	function handlerButtonExit() {
		localStorage.removeItem("token");
		window.location.reload();
	}

	function handlerAddToDoButton() {
		if(isAddToDo) {
			setIsAddToDo(false)
			document.getElementsByTagName("body")[0].removeAttribute("style");
		} else {
			window.scrollTo(0, 0);
			setIsAddToDo(true);
			document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y: hidden");
		}
	}
	function handlerUserName(name: string):string {
		const firstWord = name.split(' ')[0];
		let result = "";
		
		if (firstWord.length > 20) {
			result += firstWord[0] + ". ";
		} else {
			result += firstWord + " ";
		}
		const words = name.split(' ').slice(1);
		words.forEach(word => {
			if (word.length > 0) { 
				result += word[0] + ". ";
			}
		});
		return result;
	}
	const userName = localStorage.getItem('userName');
	return (
		<div className={Styles.container}>
			<div>
				{/* <FormSearch/> */}
				{/* <FormFilter/> */}
			</div>
				<svg onClick={handlerAddToDoButton} className={Styles.buttonAddToDo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
					<rect x="5" y="11" width="14" height="2" rx="1" ry="1"/>
					<rect x="11" y="5" width="2" height="14" rx="1" ry="1"/>
				</svg>
			<div className={Styles.exitNameContainer}>
				<h3 className={Styles.nameH3}>{userName === null ? 'Админ' : handlerUserName(userName)}</h3>
				<Button type = {2} functionClick={handlerButtonExit}>Выйти</Button>
			</div>
			{isAddToDo ? <FormAddToDoWindow funcExitWindow={handlerAddToDoButton}/> : null}
		</div>
	);
}