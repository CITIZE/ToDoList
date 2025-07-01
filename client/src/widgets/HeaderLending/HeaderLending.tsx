import React, { useRef, useState } from "react";
import Styles from "./UI/styles.module.css";
import { Button } from "../../shared/Button/Button";
import { AuthWindow } from "../../entities/AuthWindow/AuthWindow";

export function HeaderLending() {
	const [isOpenAuthWindow, setIsOpenAuthWindow] = useState<boolean>(false)
	const isRegRef = useRef<boolean>(false);

	function startAuthorization() {
		if (!isOpenAuthWindow) {
			setIsOpenAuthWindow(true);
			isRegRef.current = false;
		} else {
			setIsOpenAuthWindow(false);
			isRegRef.current = false;
		}
	}

	function startRegistration() {
		if (!isOpenAuthWindow) {
			setIsOpenAuthWindow(true);
			isRegRef.current = true;
		} else {
			setIsOpenAuthWindow(false);
			isRegRef.current = false;
		}
	}

	return (
		<div className={Styles.headerLendingContainer}>
			{/* <svg className={Styles.headerLendingSVG} viewBox="0 0 20 33">
				<g><path style={{opacity:1}} fill="#eb0510" d="M -0.5,-0.5 C 6.16667,-0.5 12.8333,-0.5 19.5,-0.5C 19.5,5.5 19.5,11.5 19.5,17.5C 16.6654,21.1638 14.332,25.1638 12.5,29.5C 11.8902,30.391 11.5569,31.391 11.5,32.5C 10.1667,32.5 8.83333,32.5 7.5,32.5C 7.44312,31.391 7.10978,30.391 6.5,29.5C 4.66796,25.1638 2.33463,21.1638 -0.5,17.5C -0.5,11.5 -0.5,5.5 -0.5,-0.5 Z"/></g>
				<g><path style={{opacity:1}} fill="#b40008" d="M -0.5,17.5 C 2.33463,21.1638 4.66796,25.1638 6.5,29.5C 4.16667,27.5 1.83333,25.5 -0.5,23.5C -0.5,21.5 -0.5,19.5 -0.5,17.5 Z"/></g>
				<g><path style={{opacity:1}} fill="#b40008" d="M 19.5,17.5 C 19.5,19.5 19.5,21.5 19.5,23.5C 17.1667,25.5 14.8333,27.5 12.5,29.5C 14.332,25.1638 16.6654,21.1638 19.5,17.5 Z"/></g>
			</svg>
			<h1 className={Styles.headerH1}>Мои задачи.ru</h1> */}
			<div className={Styles.buttonContainer}>
				<Button type={0} functionClick={startRegistration}>Регистрация</Button>
				<Button type={1} functionClick={startAuthorization}>Войти</Button>
			</div>
			{isOpenAuthWindow ? <AuthWindow isRegRef={isRegRef.current} functionClick={startAuthorization}/> : <></>}
		</div>
	);
}
