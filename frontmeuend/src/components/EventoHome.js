import React from "react";

export default function EventoHome({title, text, date}){
	return(
			<div className="row">
				<div className="col-md-5" style={{ textAlign: 'center' }}>
					<img loading="lazy" src='/evento.svg' className="img-home img-fluid" />
				</div>
				<div className="col-md-5" style={{ verticalAlign: 'top', height: '395.25px' }}>
					<h1 className="mx-auto h1-section pb-2" style={{ textAlign: 'left' }}>{title}</h1>
                    <h4 className="mx-auto h4-section text-muted pb-2" style={{ textAlign: 'left' }}>{date}</h4>
					<div className="text" id="text-evento-descricao" style={{ color: 'black'}}>
						{text}
					</div>
				</div>
			</div>
	)
}