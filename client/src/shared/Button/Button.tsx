import React from "react";
import Styles from './UI/styles.module.css';

type TButton = {
	type: number,
	functionClick?: () => void,
	id?: string,
	children?: string
}

export function Button(props:TButton) {
	function handlerClick() {
		props.functionClick?.();
	}

	return(
		<button onClick={handlerClick} className={props.type === 0 ? `${Styles.typicalButton} ${Styles.button}` : props.type === 1 ? `${Styles.greenButton} ${Styles.button}` : props.type === 2 ? `${Styles.redButton} ${Styles.button}` : `${Styles.typicalButton} ${Styles.button}`}>
			{props.children ? props.children : ''}
		</button>
	);
}