import React, { useEffect, useRef, useState } from "react";
import Styles from "./UI/styles.module.css";
import { Button } from "../../shared/Button/Button";
import { FetchDataToken } from "../../App";
type TAuthWindow = {
	functionClick: () => void,
	isRegRef: boolean
}

async function getTokenRegAuth(emailInput: string, passwordInput: string, nameInput:string | null, isReg: boolean) {
	try {
		const res = await fetch(`http://localhost:6001/api/user/${isReg ? "registration" : "login"}`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: nameInput,
				email: emailInput,
				password: passwordInput
			}),
		});
		if (res.ok) {
			const data: FetchDataToken = await res.json();
			localStorage.setItem("token", data.token);
			localStorage.setItem("userName", data.name);
			return true;
		}
		return `${isReg ? "Пользователь с таким email уже существует" : "Неверный email или пароль"}`
	} catch (error) {
		console.log(error);
		return "Ошибка со стороны сервера. Приносим свои извинения за неудобства"
	}
}

export function AuthWindow(props: TAuthWindow) {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null);

	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [errorAuth, setErrorAuth] = useState<string>('');
	const [isReg, setIsReg] = useState<boolean>(props.isRegRef);

	function handlerLinkRegOrAuth() {
		isReg === true ? setIsReg(false) : setIsReg(true);
		setErrorAuth('');
	}

	function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (isReg && nameInputRef.current) {
			const name = nameInputRef.current.value;
			if (name.trim().split(/\s+/).length > 5) {
				setErrorAuth("Имя должно иметь не больше 5-ти слов");
				return;
			}
		}
		if (isReg && nameInputRef.current && nameInputRef.current.value.length < 3) {
			setErrorAuth("Имя должно содержать 3 и более символов");
			return;
		}
		if (isReg && passwordInputRef.current && passwordInputRef.current.value.length > 63) {
			setErrorAuth("Имя слишком длинное");
			return;
		}
		if (isReg && passwordInputRef.current && passwordInputRef.current.value.length < 8) {
			setErrorAuth("Пароль должен содержать 8 и более символов")
			return;
		}
		async function fetchRegAuth() {
			const nameData = isReg && nameInputRef.current ? nameInputRef.current.value : null;
			if (emailInputRef.current && passwordInputRef.current) {
				const result = await getTokenRegAuth(emailInputRef.current.value, passwordInputRef.current.value, nameData, isReg);
				if (result === true) {
					setErrorAuth('');
					setIsAuth(true);
				} else if (typeof result === "string") {
					setErrorAuth(result)
				}}
		}
		fetchRegAuth(); 
	}

	useEffect(() => {
		if (isAuth === true) {
			window.location.reload()
		}
	}, [isAuth]);

	return (
		<div className={Styles.container}>
			<form onSubmit={handlerSubmit} id="formAuth" className={isReg ? `${Styles.form} ${Styles.formReg}` : `${Styles.form} ${Styles.formAuth}`} >
				<svg onClick={() => props.functionClick()} role="button" aria-label="Кнопка закрыть форму авторизации" className={Styles.closeAuthForm} viewBox="0 0 12 12">
					<line x1="1" y1="11" x2="11" y2="1" stroke="#FF4D00" strokeWidth="1" />
					<line x1="1" y1="1" x2="11" y2="11" stroke="#FF4D00" strokeWidth="1" />
				</svg>
				<h2 className={Styles.formAuthWindowH2}>{isReg ? "Регистрация" : "Войдите в аккаунт"}</h2>
				{isReg ? 
				<div className={Styles.inputContainer}>
					<label>Как Вас называть?</label>
					<input autoComplete="false" placeholder="Ваше имя" type="name" className={Styles.formAuthInput} ref={nameInputRef} />
				</div> : null
				}
				<div className={Styles.inputContainer}>
					<label>Введите email: </label>
					<input placeholder="Ваш email" autoComplete="false" type="email" className={Styles.formAuthInput} ref={emailInputRef} />
				</div>
				<div className={Styles.inputContainer}>
					<label>Введите пароль: </label>
					<input autoComplete="false" placeholder="Ваш пароль" type="password" className={Styles.formAuthInput} ref={passwordInputRef} />
				</div>
				<Button type={1}>{isReg ? "Зарегистрироваться" : "Войти"}</Button>
				<div className={Styles.containerNoAccount}>
					<label htmlFor="buttonNoAccount">{isReg ? "Есть учётная запись? " :"Нет аккаунта? "}</label>
					<a className={Styles.linkReg} id="buttonNoAccount" onClick={handlerLinkRegOrAuth} href="#a">{isReg ? "Войдите" : "Зарегистрируйтесь"}</a>
					<p className={Styles.errorText}>{errorAuth}</p>
				</div>
			</form>
		</div>
	);
}