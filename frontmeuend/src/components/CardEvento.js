import React from "react";
import { useFontSize } from '@/context/FontsizeContext.js';


export default function Card({title, text, nextEvent, date}){

	const { scale } = useFontSize();
	
	let backgroundColor = ''
	if(nextEvent == true){
		backgroundColor = '#89cff0'
	}
	else{
		backgroundColor = '#F6F3A4'
	}
	return(
		<div className="col col-md-6 mb-4" style={{ padding: '4em' }}>
			<div className="row g-0 embed-responsive">
				<div className="card mb-4" style={{ maxWidth: '540px', backgroundColor: backgroundColor }}>
					<div className="col-md-8">
						<div className="card-body">
								<h3 className="card-title"style={{fontSize: `calc(2rem * ${scale})`}}>{title}</h3>
								<p className="card-text text-muted"style={{fontSize: `calc(1.2rem * ${scale})`}}>{date}</p>
								<p className="card-text"style={{fontSize: `calc(1rem * ${scale})`}}>{text}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}