import React from "react";
import { FontSizeProvider, useFontSize } from '@/context/FontsizeContext.js';

export default function CardLink({title, text, link}){

	const { scale } = useFontSize();

	return(
		<div className="col col-md-6 mb-4" style={{ padding: '4em' }}>
			<a href={link} style={{textDecoration:"none"}}>
				<div className="card mb-4" style={{ maxWidth: '540px', backgroundColor: "#F6F3A4" }}>
						<div className="col-md-8">
							<div className="card-body">
								<h5 className="card-title"  style={{fontSize: `calc(1rem * ${scale})`}}>{title}</h5>
								<p className="card-text"  style={{fontSize: `calc(1rem * ${scale})`}}>{text}</p>
							</div>
					</div>
				</div>
			</a>
		</div>
	)
}