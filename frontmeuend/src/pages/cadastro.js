import {useState, useEffect} from "react";
import { cadastroUsuario } from "@/utils/autenticacao";
import { useRouter } from "next/router";
import axios from 'axios';


import DayCheckbox from "@/components/DayCheckbox.js";
import Apresentacao_cadastro from "@/components/Apresentacao_cadastro";

const diasDaSemana = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const periodos = ["manhã", "tarde", "noite"];

export default function Cadastro() {
	
	const [tipo, setTipo] = useState("0");
	const [check, setCheck] = useState(true); 
	const [disponibilidade, setDisponibilidade] = useState({});
	const [erro, setErro] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [confSenha, setConfSenha] = useState('');
    const [senhaMatch, setSenhaMatch] = useState(true); 
	
	const router = useRouter();

	useEffect(() => {
		setErro('');
	}, [email,senha])


	const handleCheckboxChange = (event) => {
		setCheck(event.target.checked);
	};

	const convertDisponibilidadeToString = (availability) => {
		return availability
		  .map((available, index) => (available["disponivel"] === '1' ? periodos[index] : null))
		  .filter(Boolean)
	};

	const handleAvailabilityChange = (dia, valores) => {
		setDisponibilidade(prevState => ({
			...prevState,
			[dia]: valores
		}));
	};

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
        setSenhaMatch(e.target.value === confSenha);
    };

    const handleConfSenhaChange = (e) => {
        setConfSenha(e.target.value);
        setSenhaMatch(e.target.value === senha);
    };


	//data guarda as respostas
	const OnSubmit = async (e) => {
		e.preventDefault();

		if (senha !== confSenha) {
            alert('As senhas não coincidem. Por favor, digite novamente.');
            return;
        }

		const data = {
			nome: e.target.elements.nome.value,
			telefone: e.target.elements.telefone.value,
			email: e.target.elements.email.value,
			dataNascimento: e.target.elements.data_nascimento.value,
			concordo: e.target.elements.concordo.checked, 
			senha: e.target.elements.senha.value,
			cidade: e.target.elements.cidade.value,
			estado: e.target.elements.estado.value,
			cep: e.target.elements.cep.value,
			tipo: e.target.elements.tipo.value,
			formacao: e.target.elements.formacao.value,
			experiencia: e.target.elements.experiencia ? e.target.elements.experiencia.value : null,
			trabAtual: e.target.elements.atual ? e.target.elements.atual.value === 'Sim' : null,
			recomendacoes: e.target.elements.recomendacoes ? e.target.elements.recomendacoes.value : null,
			interesse: e.target.elements.interesse ? e.target.elements.interesse.value === 'Sim' : null,
			segunda: disponibilidade["segunda"] ? convertDisponibilidadeToString(disponibilidade["segunda"]) : [],
			terca: disponibilidade["terça"] ? convertDisponibilidadeToString(disponibilidade["terça"]) : [],
			quarta: disponibilidade["quarta"] ? convertDisponibilidadeToString(disponibilidade["quarta"]) : [],
			quinta: disponibilidade["quinta"] ? convertDisponibilidadeToString(disponibilidade["quinta"]) : [],
			sexta: disponibilidade["sexta"] ? convertDisponibilidadeToString(disponibilidade["sexta"]) : [],
			sabado: disponibilidade["sábado"] ? convertDisponibilidadeToString(disponibilidade["sábado"]) : [],
		}
		console.log(data);
		
		try{
			const response = await cadastroUsuario(data);
			router.push('/'); 
		}catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error('Houve um erro:', error.response.status);
					if (error.response.status === 409) {
						setErro('Usuário já cadastrado');
					} else if (error.response.status === 400) {
						setErro('Informe usuário e senha!');
					} else {
						setErro('Houve um erro ao fazer cadastro. Por favor, tente novamente.');
					}
				} else if (error.request) {
					console.error('Nenhuma resposta recebida:', error.request);
					setErro('Sem resposta do servidor. Por favor, tente novamente mais tarde.');
				} else {
					console.error('Erro ao configurar a solicitação:', error.message);
				}
			} else {
				console.error('Erro inesperado:', error);
				setErro('Ocorreu um erro inesperado. Por favor, tente novamente.');
			}
		}

	}

	return (
		<main>

			<div class="container-fluid" >

				<div class="row g-3 ps-3" style={{ marginTop: 'auto' }}>

					<div class="col-md-8 col-12">

						<main>

							<Apresentacao_cadastro />


							<form onSubmit={OnSubmit} action="/cadastro" method="post" class="row g-3 pe-4" id="formulario" name="Formulário de Inscrição">

								<div class="input-group col-md-12 mt-3 mb-3">
									<span class="input-group-text text_f" id="inputGroup-sizing-default">Nome Completo:</span>
									<input name="nome" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								</div>

								<div class="input-group col-md-12 mt-3 mb-3">
									<span class="input-group-text text_f" id="inputGroup-sizing-default">Telefone:</span>
									<input name="telefone" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								</div>

								<div class="form-floating col-md-6 mt-3 mb-3">
									<input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}  required />
									<label for="email" class="text_f" >E-mail</label>
								</div>

								<div class="form-floating col-md-6 mt-3 mb-3">
									<input type="text" id="data_nascimento" class="form-control" name="data_nascimento" placeholder="Data no formato dd/mm/aaaa" required />
									<label for="data_nascimento" class="form-label text_f">Data de Nascimento:</label>
								</div>

								<div class="form-check form-switch col-md-12 mt-3 mb-3 ms-3">
									<input name="concordo" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={check}  onChange={handleCheckboxChange} />
									<label class="form-check-label text_f" for="flexSwitchCheckChecked">Concordo em receber mensagens da Associação em meu e-mail fornescido.</label>
								</div>

								<div class="col-md-6 form-floating mt-3 mb-3">
									<input type="password" class="form-control" id="senha" name="senha" placeholder="Crie a Senha" onChange={handleSenhaChange}  required />
									<label for="senha" class="form-label text_f" id="senha">Crie uma senha:</label>
								</div>

								<div class="col-md-6 form-floating mt-3 mb-3">
									<input type="password" class="form-control" id="conf_senha" placeholder="Repita a Senha" onChange={handleConfSenhaChange} required />
									<label for="conf_senha" class="form-label text_f" id="conf_senha">Confirme sua senha:</label>
									{!senhaMatch && <p style={{ color: 'red', fontSize: '12px' }}>As senhas não coincidem.</p>}
								</div>

								<div class="col-md-6 mt-3 mb-3">
									<label name="cidade" for="cidade" class="form-label text_f">Cidade:</label>
									<input type="text" class="form-control" id="cidade" placeholder="Cidade" required />
								</div>

								<div class="col-md-4 mt-3 mb-3">
									<label for="estado" name="estado" class="form-label text_f">Estado (UF):</label>
									<select id="estado" class="form-select form-select" aria-label="Default select example" required>
										<option class="text_f" selected>Selecione:</option>
										<option class="text_f" value="AC">Acre</option>
										<option class="text_f" value="AL">Alagoas</option>
										<option class="text_f" value="AP">Amapá</option>
										<option class="text_f" value="AM">Amazonas</option>
										<option class="text_f" value="BA">Bahia</option>
										<option class="text_f" value="CE">Ceará</option>
										<option class="text_f" value="DF">Distrito Federal</option>
										<option class="text_f" value="ES">Espirito Santo</option>
										<option class="text_f" value="GO">Goiás</option>
										<option class="text_f" value="MA">Maranhão</option>
										<option class="text_f" value="MS">Mato Grosso do Sul</option>
										<option class="text_f" value="MT">Mato Grosso</option>
										<option class="text_f" value="MG">Minas Gerais</option>
										<option class="text_f" value="PA">Pará</option>
										<option class="text_f" value="PB">Paraíba</option>
										<option class="text_f" value="PR">Paraná</option>
										<option class="text_f" value="PE">Pernambuco</option>
										<option class="text_f" value="PI">Piauí</option>
										<option class="text_f" value="RJ">Rio de Janeiro</option>
										<option class="text_f" value="RN">Rio Grande do Norte</option>
										<option class="text_f" value="RS">Rio Grande do Sul</option>
										<option class="text_f" value="RO">Rondônia</option>
										<option class="text_f" value="RR">Roraima</option>
										<option class="text_f" value="SC">Santa Catarina</option>
										<option class="text_f" value="SP">São Paulo</option>
										<option class="text_f" value="SE">Sergipe</option>
										<option class="text_f" value="TO">Tocantins</option>
									</select>
								</div>

								<div class="col-md-2 mt-3 mb-3">
									<label for="cep" name="cep" class="form-label text_f">CEP:</label>
									<input type="text" class="form-control" id="cep" placeholder="xxxxx-xxx" />
								</div>

								<div class="col-md-12 mt-3 mb-3">
									<select name="formacao" class="form-select form-select-lg text_f" aria-label="Large multiple select example">
										<option class="text_f" selected>Formação Escolar/Acadêmica</option>
										<option class="text_f" value="Ensino médio completo.">Ensino médio completo.</option>
										<option class="text_f" value="Ensino superior incompleto.">Ensino superior incompleto.</option>
										<option class="text_f" value="Ensino superior completo.">Ensino superior completo.</option>
										<option class="text_f" value="Pós-graduação incompleta.">Pós-graduação incompleta.</option>
										<option class="text_f" value="Pós-graduação completa.">Pós-graduação completa.</option>
										<option class="text_f" value="Mestrado incompleto.">Mestrado incompleto.</option>
										<option class="text_f" value="Mestrado completo.">Mestrado completo.</option>
										<option class="text_f" value="Doutorado incompleto.">Doutorado incompleto.</option>
										<option class="text_f" value="Doutorado completo.">Doutorado completo.</option>
									</select>
								</div>

								<div className="col-md-12 mt-3 mb-3">
									<select
										name="tipo"
										className="form-select form-select-lg text_f"
										aria-label="Large multiple select example"
										onChange={(e) => {
											setTipo(e.target.value);
										}
										}
									>
										<option className="text_f" selected>Tipo de Cadastro</option>
										<option className="text_f" value="Intérprete ou Tradutor">Intérprete ou Tradutor</option>
										<option className="text_f" value="Associado ASSC">Associado ASSC</option>
										<option className="text_f" value="Voluntário">Voluntário</option>
									</select>
								</div>

								{tipo === 'Intérprete ou Tradutor' ?
									<>
										<div class="col-md-12 mt-3 mb-3">
											<p class="text_c rounded p-2 justify" id="bg1">
												Para o cadastro de Intérpretes, favor responder as seguintes perguntas
											</p>

											<select name="experiencia" class="form-select form-select-lg text_f" aria-label="Large multiple select example">
												<option class="text_f" selected>Experiência profissional como Intérprete</option>
												<option class="text_f" value="Sem Experiência">Sem Experiência</option>
												<option class="text_f" value="Interpretação de Conferências (Palestras, Eventos).">Interpretação de Conferências (Palestras, Eventos).</option>
												<option class="text_f" value="Guia-Interpretação de Conferências (Palestras, Eventos).">Guia-Interpretação de Conferências (Palestras, Eventos).</option>
												<option class="text_f" value="Interpretação Educacional - Universidades (Graduação ou Pós-Graduação).">Interpretação Educacional - Universidades (Graduação ou Pós-Graduação).</option>
												<option class="text_f" value="Guia-Interpretação Educacional - Universidades (Graduação ou Pós-Graduação).">Guia-Interpretação Educacional - Universidades (Graduação ou Pós-Graduação).</option>
												<option class="text_f" value="Interpretação Educacional - Escolas (Ensino Fundamental ou Ensino Médio).">Interpretação Educacional - Escolas (Ensino Fundamental ou Ensino Médio).</option>
												<option class="text_f" value="Guia-Interpretação Educacional - Escolas (Ensino Fundamental ou Ensino Médio).">Guia-Interpretação Educacional - Escolas (Ensino Fundamental ou Ensino Médio).</option>
												<option class="text_f" value="Interpretação na Esfera Comunitária.">Interpretação na Esfera Comunitária.</option>
												<option class="text_f" value="Guia-Interpretação na Esfera Comunitária.">Guia-Interpretação na Esfera Comunitária.</option>
												<option class="text_f" value="Interpretação na Esfera Empresarial.">Interpretação na Esfera Empresarial.</option>
												<option class="text_f" value="Guia-Interpretação na Esfera Empresarial.">Guia-Interpretação na Esfera Empresarial.</option>
												<option class="text_f" value="Interpretação na Esfera Jurídica.">Interpretação na Esfera Jurídica.</option>
												<option class="text_f" value="Guia-Interpretação na Esfera Jurídica.">Guia-Interpretação na Esfera Jurídica.</option>
												<option class="text_f" value="Interpretação na Esfera Religiosa.">Interpretação na Esfera Religiosa.</option>
												<option class="text_f" value="Guia-Interpretação na Esfera Religiosa.">Guia-Interpretação na Esfera Religiosa.</option>
												<option class="text_f" value="Interpretação na Esfera da Saúde.">Interpretação na Esfera da Saúde.</option>
												<option class="text_f" value="Guia-Interpretação na Esfera da Saúde.">Guia-Interpretação na Esfera da Saúde.</option>
												<option class="text_f" value="Interpretação em Eventos Políticos.">Interpretação em Eventos Políticos.</option>
												<option class="text_f" value="Guia-Interpretação em Eventos Políticos.">Guia-Interpretação em Eventos Políticos.</option>
												<option class="text_f" value="Interpretação em Órgãos Públicos.">Interpretação em Órgãos Públicos.</option>
												<option class="text_f" value="Guia-Interpretação em Órgão Públicos.">Guia-Interpretação em Órgão Públicos.</option>
											</select>
										</div>

										<div class="col-md-12 mt-3 mb-3">
											<select name="atual" class="form-select form-select-lg text_f" aria-label="Large multiple select example">
												<option class="text_f" selected>Trabalha atualmente como Intérprete</option>
												<option class="text_f" value="Sim">Sim</option>
												<option class="text_f" value="Não">Não</option>
											</select>
										</div>

										<div class="col-md-12 mt-3 mb-3">
											<select name="recomendacoes" class="form-select form-select-lg text_f" aria-label="Large multiple select example">
												<option class="text_f" selected>Recomendações para Trabalho</option>
												<option class="text_f" value="Não quero ser Recomendado">Não quero ser Recomendado</option>
												<option class="text_f" value="Interpretação">Interpretação</option>
												<option class="text_f" value="Tradução">Tradução</option>
												<option class="text_f" value="Guia-interpretação">Guia-interpretação</option>
											</select>
										</div>
										<div class="col-md-12 mt-3 mb-3">
											<select name="interesse" class="form-select form-select-lg text_f" aria-label="Large multiple select example">
												<option class="text_f" selected>Interesse de participar de eventos ASSC como voluntário</option>
												<option class="text_f" value="Sim">Sim</option>
												<option class="text_f" value="Não">Não</option>
											</select>
										</div>


										<div class="col-md-12 mt-3 mb-3">
											<p class="text_c rounded p-2 justify" id="bg1">
												Para um encontro formativo de intérpretes da ASSC, em quais períodos você teria disponibilidade?
											</p>
										</div>

										{diasDaSemana.map(dia => (
											<DayCheckbox key={dia} dia={dia} onAvailabilityChange={handleAvailabilityChange} />
										))}
									</>
									: <></>}
								{erro && <p style={{color: 'red'}}>{erro}</p>}

								<div class="col-12 mt-3 mb-3">

									<button class="btn btn-primary btn-lg" id="send-button" type="submit">Enviar</button>
								</div>

							</form>

						</main>

					</div>

					<aside class="col-4 h-99 d-inline-block side_banner"></aside>

				</div>

			</div>
		</main>
	);
}
