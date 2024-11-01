import Link from "next/link"
import React from "react"
import { useFontSize } from '@/context/FontsizeContext.js';


export default function DescriptionCard({text}){
	const { scale } = useFontSize();
	return(
		<div className="col-md-5 mb-5">
			<div className="h-100">
				<div className="col p-4 text border rounded-4 flex-md-row shadow-sm position-relative h-100" style={{backgroundColor:"white"}}>
				<p style={{color: 'black', fontSize: `calc(1.2rem * ${scale})`}}>{text}</p>
				</div>
			</div>
		</div>
	)
	
}




