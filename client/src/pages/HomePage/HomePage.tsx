import React, {createContext} from "react";
import Header from "../../widgets/Header/Header";
import { Main } from "../../widgets/Main/Main";

type THome = {
	isChecked: boolean
}

export type TMainContext = {
	isAuth: boolean
}

export const MainContext = createContext({});

export function HomePage(props:THome){
	const valueContext:TMainContext = {
		isAuth: props.isChecked
	};
	return (
		<div className="Home">
			<MainContext.Provider value={valueContext}>
				<Header/>
				<Main/>
			</MainContext.Provider>
		</div>
	);
}