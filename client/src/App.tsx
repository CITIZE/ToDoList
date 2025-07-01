import React, { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage/HomePage";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";
import { ErrorServerPage } from "./pages/ErrorServerPage/ErrorServerPage";

type CheckAuthorizationResult = {
	isAuthorized: boolean | null
}

export type FetchDataToken = {
	[key: string]: string
}

async function checkAuthorization():Promise<CheckAuthorizationResult> {

	const controller = new AbortController();
	const timeoutId = setTimeout(():CheckAuthorizationResult => {
		controller.abort();
		return {isAuthorized: null}
	}, 5000);

	try {
		const token = localStorage.getItem('token');
		const res = await fetch("http://localhost:6001/api/user/check", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"authorization": "Bearer " + token
			},
			signal: controller.signal
		})

		clearTimeout(timeoutId);

		if(!res.ok) {
			console.error("Статус ошибки: ", res.status, "\nСообщение ошибки: ", res.statusText);
			return {isAuthorized: false};
		}
		const data:FetchDataToken = await res.json();
		localStorage.setItem("token", data.token);
		return {isAuthorized: true};
	} catch(error: any) {
		console.error("Ошибка с сервером: ", error);
		if (error.name === "AbortError") {
			console.error("Превышено время ожидания ответа от сервера. ", error);
			return {isAuthorized: null};
		}
		return {isAuthorized: null};
	}
}
export default function App() {
	const [isChecked, setIsChecked] = useState<CheckAuthorizationResult | undefined>(undefined);

	useEffect(() => {
		const authorize = async () => {
			const result = await checkAuthorization();
			setIsChecked(result);
		}
		authorize();
	}, []);

  return (
    <div className="App">
      <Routes>
		<Route path = "/" element={isChecked === undefined ? <LoadingPage/> : isChecked?.isAuthorized === null ? <Navigate to="/error/500" replace/> : <Navigate to="/home" replace/>}/>
        <Route path="/home" element={isChecked !== undefined && isChecked?.isAuthorized !== null ? <HomePage isChecked={isChecked.isAuthorized} /> : <Navigate to = "/" replace/>} />
        <Route path="/error/500" element={ isChecked === undefined ? <Navigate to = "/" replace/> : <ErrorServerPage/>} />
      </Routes>
    </div>
  );
}