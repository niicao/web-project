import CardEvento from "../components/CardEvento.js";
import { useEffect, useState } from "react";
import rotas from '@/services/api';
import { useFontSize } from '@/context/FontsizeContext.js';

export default function Eventos() {
	
	const [ProxEventos, setProxEventos] = useState([]);
	const [UltEventos, setUltEventos] = useState([]);
	const { scale } = useFontSize();
	
	useEffect(() => {
		const fetchProxEventos = async () => {
		  try {
			const response = await rotas.get('/proxEventos'); 
			setProxEventos(response.data);
		  } catch (error) {
			console.error('Erro ao encontrar próximos eventos:', error);
		  }
		};
	
		const fetchUltEventos = async () => {
		  try {
			const response = await rotas.get('/ultEventos'); 
			setUltEventos(response.data);
		  } catch (error) {
			console.error('Erro ao encontrar últimos eventos:', error);
		  }
		};
	
		fetchProxEventos();
		fetchUltEventos();
	  }, []);

	return (
		<main>
			<div className="container-fluid">
				<div className="row" style={{ marginTop: 'auto' }}>
					<div className="col-12 text-left mb-10" style={{ paddingTop: '4em' }}>
						<h1 className="ps-5 dourado texto-eventos" style={{fontSize: `calc(2.5rem * ${scale})`}}>PRÓXIMOS EVENTOS</h1>
					</div>
				</div>
				<div className="row justify-content-center">
					{ProxEventos.map((evento, index) => (
						<CardEvento
						key={index}
						title={evento.nome}
						text={evento.descricao}
						date={evento.data}
						nextEvent={true}
						/>
					))}
				</div>
			</div>

			<div className="container-fluid" style={{ backgroundColor: "#024959" }}>
				<div className="row">
					<div className="col-12 text-left mb-10" style={{ paddingTop: '4em' }}>
						<h1 className="" style={{ fontFamily: 'Montserrat, sans-serif', color: '#E6E6E6', paddingLeft: '1.3em' ,fontSize: `calc(2.5rem * ${scale})`}}>ÚLTIMOS EVENTOS</h1>
					</div>
				</div>
				<div className="row justify-content-center">
					{UltEventos.map((evento, index) => (
						<CardEvento
						key={index}
						title={evento.nome}
						text={evento.descricao}
						date={evento.data}
						nextEvent={false}
						/>
					))}
				</div>
			</div>

        </main>
	);
}
