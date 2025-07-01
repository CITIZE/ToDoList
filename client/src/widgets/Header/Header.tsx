import React, {useContext} from "react";
import Styles from "./UI/header.module.css"
import { MainContext } from "../../pages/HomePage/HomePage";
import { HeaderLending } from "../HeaderLending/HeaderLending";
import { HeaderUser } from "../HeaderUser/HeaderUser";
import { TMainContext } from "../../pages/HomePage/HomePage";

export default function Header() {
	const mainContext = useContext(MainContext) as TMainContext;
	return (
		<header className={Styles.header}>
			{mainContext.isAuth ? 
				<HeaderUser/>
			: 
				<HeaderLending/>}
		</header>
	)
}