import next from "next";
import { useEffect, useState } from "react";
import CardLink from "./../components/CardLink.js";
import DescriptionCard from "./../components/DescriptionCard.js";
import TitledCard from "./../components/TitledCard.js";
import CarouselInstagram from "./../components/CarouselInstagram.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import rotas from '@/services/api';
import { useFontSize } from '@/context/FontsizeContext.js';

export default function Sobre() {

	const [links, setLinks] = useState([]);
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

		fetchLinks();
  	}, []);

	return (
		<main>
			<div className="py-4 somos-bg">
				<h1 className="display-4 title mb-5 ms-5 pt-5" style={{fontSize: `calc(3rem * ${scale})`}}>QUEM SOMOS</h1>
				<div className="mb-2">
					<div className="container">
					<div className="row g-3" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
						<DescriptionCard 
						text = 'A Associação dos Surdos de São Carlos promove a inclusão social, educacional e profissional de pessoas surdas, surdocegas e deficientes auditivos. Fundada em 2013 e com uma sede própria desde 2018, a associação realiza ações de habilitação, organiza eventos culturais e esportivos, desenvolve a educação dos surdos e oferece apoio social. Defendemos os direitos dos surdos, combatemos a discriminação e orientamos famílias, estabelecendo parcerias para fortalecer nossas iniciativas. Somos um espaço de empoderamento e resistência, comprometidos em melhorar a qualidade de vida dos surdos em São Carlos.'
							/>
						<div className="col-md-6">
							<div className="flex-md-row mb-4 position-relative">
								<div className="col d-flex flex-column position-static h-100">
								<div id="meuCarrossel" className="carousel slide" data-bs-ride="true">
									<div className="carousel-indicators">
										<button type="button" data-bs-target="#meuCarrossel" data-bs-slide-to="0" className="active" aria-current="true"></button>
										<button type="button" data-bs-target="#meuCarrossel" data-bs-slide-to="1"></button>
									</div>
									<div className="carousel-inner">
										<div className="carousel-item active">
											<img src="./pessoasAssc.png" className="d-block w-100"/>
										</div>
										<div className="carousel-item">
											<img src="./pessoasAssc2.png" className="d-block w-100" />
										</div>
										
									</div>
									<button className="carousel-control-prev" type="button" data-bs-target="#meuCarrossel" data-bs-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
									</button>
									<button className="carousel-control-next" type="button" data-bs-target="#meuCarrossel" data-bs-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
									</button>
								</div>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
			<div className="border py-4">
				<h1 className="display-4 title mb-5 ms-5 pt-5"style={{fontSize: `calc(3rem * ${scale})`, color:'black' }}>ATIVIDADES</h1>
				<div className="mb-2">
					<div className="container">
						<TitledCard title={"Informática para inciantes💻💻"} 
						text={"Nós oferecemos aulas de informática para iniciantes, com o objetivo de capacitar iniciantes na informática para o mercado de trabalho. As aulas são ministradas por voluntários e abordam temas como uso de computadores, internet, redes sociais e softwares de escritório. As aulas são gratuitas e abertas a todos os integrantes interessados."}
						imagePath={"./informatica.svg"}
						/>

						<TitledCard title={"Curso de libras🧏"} 
						text={"Curso de Libras podendo ser nível básico, intermediário e avançado de acordo com a necessidade dos alunos matriculados. O curso tem o objetivo de capacitar ouvintes e surdos na língua de sinais. O curso é gratuito e aberto a todos os interessados."}
						reverse={true}
						imagePath={"./linguagemSinais.svg"}
						/>

						<TitledCard title={"Curso de gramática📚"} 
						text={"Curso da norma padrão da língua portuguesa, com o objetivo de capacitar surdos e ouvintes na escrita e leitura da língua portuguesa. O curso é gratuito e aberto a todos os interessados. Temos aulas de gramática, redação e interpretação de texto, em nível iniciante, intermediário e avançado."}
						imagePath={"./gramatica.svg"}
						/>
					</div>
				</div>
			</div>
             {/* NAO FUNCIONA E EU N SEI PORQUE (CarouselInstagram.js -> 3h perdidas (atualize o numero de horas)) */}
			{/* <CarouselInstagram/> */}

			<div className="py-4 historia-design pb-5" style={{backgroundColor:"#f7e058"}}>
			<h1 className="display-4 title mb-5 ms-5 pt-5" style={{color: "#000"}}>HISTÓRIA 📖</h1>
			<div className="mb-2">
				<div className="container">
					<TitledCard title={"NOSSA HISTÓRIA"}
					text={"A associação começou com a intenção de evangelismo, mas logo se percebeu a necessidade de apoio à integração social dos surdos. Inicialmente, as atividades incluíam ensinar Libras e organizar eventos esportivos, o que mostrou o potencial dos surdos se comunicarem e se integrarem melhor. Em 2010, um grupo de surdos que frequentava o SESC sonhava com a criação da associação." +
						"\n Em 2013, após várias reuniões e adaptações de estatutos de outras associações, foi fundada a Associação dos Surdos de São Carlos. As primeiras reuniões ocorreram em espaços cedidos pela prefeitura. A associação se tornou um espaço de luta, empoderamento e resistência, oferecendo apoio aos surdos e cobrando o cumprimento de leis para garantir seus direitos." + 
						"\nEm 2017, após um período de instabilidade na liderança, uma nova diretoria assumiu, comprometida em fortalecer a associação. Em 2018, a conquista de uma sede própria marcou um novo capítulo na história da associação, proporcionando um espaço fixo para reuniões e atividades." +
						"\nHoje, a associação continua a lutar pela acessibilidade e inclusão dos surdos em São Carlos, incentivando a participação de toda a comunidade e buscando inspiração em associações mais antigas e bem-sucedidas."
					}
					imagePath={"./maosSinais.png"}
					/>
				</div>
			</div>
		</div>

		<div className="image-background-sobre" style={{ minHeight: '600px' }}>
		<img src="/fundo_doacao.png" alt="Background" className="background-image-sobre" />
			<div className="display-4 title mb-4">CONHEÇA NOSSO ESTATUTO!</div>
			<a href="estatuto" id="overlap-a" style={{ display: 'inline-block', width: '50%' }}>
				<div className="overlapping-button">
					<div id="button-cadastro">
						<p className="button-text" id="hover-text" style={{ margin: 0, fontSize: `calc(1.2rem * ${scale})` }}>
							LER ESTATUTO <FontAwesomeIcon icon={faArrowRight} />
						</p>
					</div>
				</div>
			</a>
		</div>

		<div class="border py-4">
			<h1 class="display-4 title mb-5 ms-5 pt-1"style={{fontSize: `calc(3rem * ${scale})`, color:'black'}}>PRESTAÇÃO DE CONTAS</h1>
			<div class="mb-2">
				<div class="container">
					<div class="row">
					<a href="https://example.com" target="_blank" rel="noopener noreferrer" className="anos mb-4" style={{ color: 'black',fontSize: `calc(1.7rem * ${scale})`}}>Acesse Nosso Drive</a>
					</div>
				</div>
			</div>
		</div>

		<div className = "container-fluid">
			<div className="row">
				<div className="col-12 text-left mb-10" style={{ paddingTop: '4em' }}>
					<h1 className="ps-5 dourado texto-eventos" style={{ fontFamily: 'Montserrat, sans-serif', paddingLeft: '1.3em',fontSize: `calc(3rem * ${scale})`}}>ACESSE</h1>
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



        </main>
	);
}



