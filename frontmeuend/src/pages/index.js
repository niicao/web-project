import { useEffect, useState } from "react";
import { useFontSize } from '@/context/FontsizeContext.js';
import CardLink from "./../components/CardLink.js";
import EventoHome from "./../components/EventoHome.js";
import rotas from '@/services/api';

export default function Home() {
	const [links, setLinks] = useState([]);
	const [ProxEventos, setProxEventos] = useState([]);
	const { scale } = useFontSize();

  	useEffect(() => {
		const fetchLinks = async () => {
			try {
				const response = await rotas.get('/links'); 
				setLinks(response.data);
			} catch (error) {
				console.error('Deu erro:', error);
			}
		};
		const fetchProxEventos = async () => {
			try {
			  const response = await rotas.get('/proxEventos'); 
			  setProxEventos(response.data);
			} catch (error) {
			  console.error('Erro ao encontrar próximos eventos:', error);
			}
		};

		fetchLinks();
		fetchProxEventos();
  	}, []);

	return (
		<div style={{backgroundColor: '#E6E6E6'}}>
			<main>
				<div className="container-fluid" id="headtitle">
					<h1 className="mx-auto h1-top" style={{ paddingTop: '30px', fontSize: `calc(3rem * ${scale})` }}>QUEM SOMOS?</h1>
					<div className="row" style={{ display: 'flex', marginLeft: '5px' }}>
						<div className="col-md-5" id="first-section-cols" style={{ marginBottom: '20px'}}>
							<img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c14099a99d5efc09bf6281d8c66a196eaf19968d60b9bc8e33108ef489277fb0?apiKey=7df1ecca409e42de8622c49afce9d2c2" className="icon" />
							<h2 className="title-in"style={{fontSize: `calc(2.2rem * ${scale})`}}>NOSSA HISTÓRIA</h2>
							<div className="text"style={{color: 'black', fontSize: `calc(1.2rem * ${scale})`}}>
								{'A Associação dos Surdos de São Carlos começou com atividades de evangelismo e esportes, logo percebendo a necessidade de apoio social e educacional para surdos. Fundada oficialmente em 2013, a associação enfrentou desafios iniciais, realizando reuniões em locais cedidos pela prefeitura. Em 2018, conquistaram uma sede própria, que fortaleceu suas atividades. Hoje, a associação continua a lutar pela inclusão e direitos dos surdos, oferecendo apoio e promovendo a integração na comunidade.'}
							</div>
						</div>
						<div className="col-md-5" id="first-section-cols" style={{ marginBottom: '20px' }}>
							<img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c14099a99d5efc09bf6281d8c66a196eaf19968d60b9bc8e33108ef489277fb0?apiKey=7df1ecca409e42de8622c49afce9d2c2" className="icon" />
							<h2 className="title-in"style={{fontSize: `calc(2.2rem * ${scale})`}}>Nosso Objetivo</h2>
							<div className="text" style={{color: 'black', fontSize: `calc(1.2rem * ${scale})`}}>
								{'Os objetivos da associação de surdos são promover a inclusão social, educacional e profissional das pessoas surdas, surdocegas e deficientes auditivas. A associação realiza ações de habilitação e reabilitação, organizam eventos culturais e esportivos, e desenvolvem a educação e cultura dos surdos. A associação oferece amparo social, aperfeiçoamento para associados e familiares, e estabelece parcerias com outras entidades. Além disso, defendem os direitos dos surdos, combatem a discriminação e orientam e apoiam as famílias.'}
							</div>
						</div>
					</div>
					<a href="./sobre" className="outline-button" id="sobre-button">
						<div className="button-class">
							<div className="button-text"style={{fontSize: `calc(1.2rem * ${scale})`}}>Saiba Mais <i className="fa-solid fa-arrow-right"></i></div>
						</div>
					</a>
				</div>
	
				{/*Carrossel de eventos próximos*/}
				<div className="yellow-bg" style={{ marginTop: '30px', paddingBottom: '25px', paddingTop: '30px' }}>
					<h1 className="mx-auto h1-top" style={{ color: '#000000', textAlign: 'left' , fontSize: `calc(2.5rem * ${scale})`}} id="calendario-eventos">CALENDÁRIO DE EVENTOS</h1>

					<div className="carousel slide" data-bs-ride="carousel" id="carouselExampleControls">
						<div className="carousel-inner">
						{ProxEventos.map((evento, index) => (
							<div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
								<EventoHome title={evento.nome} text={evento.descricao} date={evento.data}/>
							</div>
						))}
						</div>

						{/* Botão para evento anterior */}
						<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>

						{/* Botão para próximo evento */}
						<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>

					</div>

					<a href="./eventos" className="outline-button" style={{ backgroundColor: '#958600', marginRight: '15px', marginLeft: '15px' }}>
						<div className="button-class">
							<p className="button-text" id="todos-eventos" style={{fontSize: `calc(1.2rem * ${scale})`}}>Todos os Eventos <i className="fa-solid fa-arrow-right"></i></p>
						</div>
					</a>
				</div>


				{/* Links Externos */}
				<div className = "container-fluid">
					<div className="row">
						<div className="col-12 text-left mb-10" style={{ paddingTop: '1em' }}>
							<h1 className="ps-5 dourado texto-eventos" style={{ fontFamily: 'Montserrat, sans-serif', paddingLeft: '1.3em',fontSize: `calc(2.5rem * ${scale})` }}>ACESSE</h1>
						</div>
					</div>
					<div className="row justify-content-center">
						{links.map((link, index) => (
							<CardLink
							key={index}
							title={link.nome}
							text={link.descricao}
							link={link.link}
							/>
						))}
					</div>
				</div>
	

				{/* Botao para cadastro */}
				<div className="image-background-sobre" style={{ minHeight: '600px' }}>
				<img src="/fundo_doacao.png" alt="Background" className="background-image-sobre" />
					<div className="display-4 title mb-4">VENHA FAZER PARTE DA ASSC!</div>
					<a href="./cadastro" id="overlap-a" style={{ display: 'inline-block', width: '50%' }}>
						<div className="overlapping-button">
							<div id="button-cadastro">
								<p className="button-text" id="hover-text" style={{ margin: 0, fontSize: `calc(1.2rem * ${scale})` }}>
									Cadastre-se
								</p>
							</div>
						</div>
					</a>
				</div>	

			</main>
		</div>
	);	
}

