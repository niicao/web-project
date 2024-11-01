import { useFontSize } from '@/context/FontsizeContext.js';


export default function Doacao() {

	const { scale } = useFontSize();

	return (
		<main>
			<main id="cards-doacao">
				<div className="container-lg" style={{ marginTop: 'auto' }}>
					<div>
						<h2 className="dourado titulo mb-5 pt-5"style={{fontSize: `calc(3rem * ${scale})`}}>CONTRIBUA COM A ASSC!</h2>
						<p className="lead texto"style={{fontSize: `calc(1.5rem * ${scale})`}}>Faça uma doação de qualquer valor</p>
					</div>

					{/* Caixas Amarelas */}
					<div className="row my-5 align-items-center justify-content-between">
						{/* caixa da esquerda */}
						<div className="col-12 col-sm-6 col-lg-5 my-1">
							<div className="card border-0">
								<div className="card-body rounded text-center py-lg-4 fundo-amarelo">
									<h4 className="card-title texto"style={{fontSize: `calc(2rem * ${scale})`}}>DOE VIA PIX</h4>
									<img className="img-fluid" src="/qrcode.png" alt="QRcode para doar via pix" />
									<p className="lead card-subtitle texto mt-3"style={{fontSize: `calc(1.5rem * ${scale})`}}>
										CNPJ: 18.563.584/0001-79 <br />
										Associação dos Surdos de São Carlos
									</p>
								</div>
							</div>
						</div>

						{/* caixa da direita */}
						<div className="col-12 col-sm-6 col-lg-5 my-1">
							<div className="card border-0">
								<div className="card-body rounded text-center py-lg-4 fundo-amarelo">
									<h4 className="card-title texto"style={{fontSize: `calc(1.5rem * ${scale})`}}>FAÇA UMA TRANSAÇÃO</h4>
									<p className="lead card-subtitle texto"style={{fontSize: `calc(1.3rem * ${scale})`}}>
										Caixa Econômica Federal <br />
										Agência: 3047 <br />
										Operação: 013 <br />
										Conta Poupança: 00021684-0
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Caixa Azul */}
					<div className="row justify-content-center">
						<div className="col-md-10 col-lg-7 col-xl-6">
							<div className="card border-0">
								<div className="card-body rounded text-center py-lg-4 fundo-azul">
									<h3 className="card-title textoBranco"style={{fontSize: `calc(2rem * ${scale})`}}>A ASSC agradece seu apoio!</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<section id="fazer-parte-assc" className="container-fluid mt-3" >
				<div className="background-image d-flex flex-column align-items-center justify-content-center">
					{/* texto */}
					<div className="sombra" style={{ width: '80%', height: 'auto', padding: '20px', margin: '0 auto' }}>
						<h2 className="titulo text-center textoBranco" style={{ fontWeight: 'bold', color: '#E6E6E6', fontSize: `calc(4rem * ${scale})` }}>VENHA FAZER PARTE DA ASSC!</h2>
						<p className="lead texto text-center" style={{ color: '#E6E6E6', fontSize: `calc(2rem * ${scale})` }}>Ajude a construir nossa Associação</p>
					</div>


					{/* botão */}
					<div className="mt-5">
						<a href="./cadastro" className="outline-button">
							<div className="button-class">
								<div className="button-text" style={{fontSize: `calc(1.5rem * ${scale})`}}>Cadastre-se <i className="fa-solid fa-arrow-right"></i> </div>
							</div>
						</a>
					</div>
				</div>
			</section>

        </main>
	);
}
