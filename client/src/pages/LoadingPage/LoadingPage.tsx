import React from "react";
import Styles from "./UI/styles.module.css";

export function LoadingPage(){
	return (
		<div className={Styles.preloader}>
			<svg className={Styles.svg}>
				<circle className={Styles.animatedCircle} cx="50%" cy="50%" r="10vw" strokeWidth="1vw" stroke="#000" fill="transparent" strokeDasharray="calc(10vw*3.14*2)" strokeDashoffset="0"/>
			</svg>
		</div>
	);
}