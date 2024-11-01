import Link from "next/link";
import { useState, useEffect } from "react";
import rotas from '@/services/api';


import DayCheckbox from "@/components/DayCheckbox.js";

const diasDaSemana = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado"];


export default function info_user() {


    const [disponibilidade, setDisponibilidade] = useState({});
    const [userId, setUserId] = useState('');
    const [info, setInfo] = useState({});

    const [erro, setErro] = useState('');

    const [senhaAtual, setSenhaAtual] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
	const [confSenha, setConfSenha] = useState('');
    const [senhaMatch, setSenhaMatch] = useState(true); 

    useEffect(() => {
        // Pega as informações do usuário e coloca na variável info
        const fetchUsuario = async () => {
            const id = localStorage.getItem('id');
            setUserId(id);

            const token = localStorage.getItem('token');
            try{
              const response = await rotas.get(`usuarios/${id}`,{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
              }); 
              setInfo(response.data);
            }catch(e){
                console.log("Erro encontrar dados do usuário.", e)
            }
        };

        fetchUsuario();
    }, []);


	const handleEnviar  = async (e) => {
        // Função para atualizar a base de dados com os novos dados
		e.preventDefault();

        const token = localStorage.getItem('token');

        try{
            const response = await rotas.put(`usuarios/${userId}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Server response:', response.data);
            alert('Dados enviados com sucesso!');
        }catch(error){
            console.error('Failed to send data:', error);
            alert('Falha ao enviar os dados');
        }
	}

	const handleAvailabilityChange = (dia, valores) => {
        const horariosDispFilter = valores.filter(item => item.disponivel === '1');
        const horariosDisp = horariosDispFilter.map(item => item.horario);
        
        if(dia === 'segunda'){
            info.segunda = horariosDisp;
        }else if(dia === 'terça'){
            info.terca = horariosDisp;
        }else if(dia === 'quarta'){
            info.quarta = horariosDisp;
        }else if(dia === 'quinta'){
            info.quinta = horariosDisp;
        }else if(dia === 'sexta'){
            info.sexta = horariosDisp;
        }else if(dia === 'sábado'){
            info.sabado = horariosDisp;
        }        
	};

    const handleChange = (fieldName,value) => {
        /// Lida com as mudanças no formulário
        // Faz esse switch case pq no bd guardamos o trabAtual e interesse como Bool
        /// Mas no formulário usamos sim e não
        let valor_final = value

        switch (fieldName) {
            case 'trabAtual':
                valor_final = value === "1";
                break;
            case 'interesse':
                valor_final = value === "1";
                break;
            default:
                valor_final = value;
                break;
        }

        setInfo(prevInfo => ({
            ...prevInfo,
            [fieldName]: valor_final

        }));
    };

    function converteHorario(list) {
        const initialValues = [
            { horario: 'Manhã', disponivel: '0' },
            { horario: 'Tarde', disponivel: '0' },
            { horario: 'Noite', disponivel: '0' },
        ];
    
        return initialValues.map(item => ({
            ...item,
            disponivel: list.includes(item.horario) ? '1' : '0'
        }));
    }

    function converteDia(dia){
        let diaConvertido = null;
        if(dia === 'segunda'){
            diaConvertido = converteHorario(info.segunda);
        }else if(dia === 'terça'){
            diaConvertido = converteHorario(info.terca);
        }else if(dia === 'quarta'){
            diaConvertido = converteHorario(info.quarta);
        }else if(dia === 'quinta'){
            diaConvertido = converteHorario(info.quinta);
        }else if(dia === 'sexta'){
            diaConvertido = converteHorario(info.sexta);
        }else if(dia === 'sábado'){
            diaConvertido = converteHorario(info.sabado);
        }        

        return diaConvertido;
    }

    const handleSenhaAtualChange = (e) => {
        console.log(disponibilidade);
        setSenhaAtual(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenhaNova(e.target.value);
        setSenhaMatch(e.target.value === confSenha);
    };

    const handleConfSenhaChange = (e) => {
        setConfSenha(e.target.value);
        setSenhaMatch(e.target.value === senhaNova);
    };


    const checarSenha = async (email, senha) => {
        try{
            const response = await rotas.post('/login', JSON.stringify({email, senha }),
                {
                    headers: {'Content-Type':'Application/json'},
                    withCredentials: false,
                }
            );
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    const mudarSenha = async (event) => {
        // Função para trocar a senha e mudar no banco de dados

        event.preventDefault();
        
        const email = info.email;

        if(!await checarSenha(email,senhaAtual)){
            alert('Senha atual está incorreta');
            setSenhaAtual('');
            setSenhaNova('');
            setConfSenha('');
            return;
        }

        if(!senhaMatch){
            alert('As senhas não coincidem. Por favor, digite novamente.');
            setSenhaAtual('');
            setSenhaNova('');
            setConfSenha('');
            return;
        }
            
        try {
            const token = localStorage.getItem('token');

            const response = await rotas.put(`usuarios/${userId}`, 
                {
                    senha: senhaNova
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response);

            if (response.status === 200) {
                // Atualiza localmente
                setInfo(prevInfo => ({
                    ...prevInfo,
                    senha: senhaNova
                }));
                alert('A senha foi trocada com sucesso!');
                setSenhaAtual('');
                setSenhaNova('');
                setConfSenha('');
            } else {
                setSenhaAtual('');
                setSenhaNova('');
                setConfSenha('');
                throw new Error('Falha ao trocar a senha');
            }
        } catch (error) {
            console.error('Falha ao atualizar a senha:', error);
            alert('Falha ao atualizar a senha');
        }
    };

    const volunteerTypes = [
        "Intérprete ou Tradutor",
        "Associado ASSC",
        "Voluntário"
    ];

    const educationLevels = [
        "Ensino médio completo.",
        "Ensino superior incompleto.",
        "Ensino superior completo.",
        "Pós-graduação incompleta.",
        "Pós-graduação completa.",
        "Mestrado incompleto.",
        "Mestrado completo.",
        "Doutorado incompleto.",
        "Doutorado completo."
    ];


    const experienceOptions = [
        "Sem Experiência",
        "Interpretação de Conferências (Palestras, Eventos)",
        "Guia-Interpretação de Conferências (Palestras, Eventos)",
        "Interpretação Educacional - Universidades (Graduação ou Pós-Graduação)",
        "Guia-Interpretação Educacional - Universidades (Graduação ou Pós-Graduação)",
        "Interpretação Educacional - Escolas (Ensino Fundamental ou Ensino Médio)",
        "Guia-Interpretação Educacional - Escolas (Ensino Fundamental ou Ensino Médio)",
        "Interpretação na Esfera Comunitária",
        "Guia-Interpretação na Esfera Comunitária",
        "Interpretação na Esfera Empresarial",
        "Guia-Interpretação na Esfera Empresarial",
        "Interpretação na Esfera Jurídica",
        "Guia-Interpretação na Esfera Jurídica",
        "Interpretação na Esfera Religiosa",
        "Guia-Interpretação na Esfera Religiosa",
        "Interpretação na Esfera da Saúde",
        "Guia-Interpretação na Esfera da Saúde",
        "Interpretação em Eventos Políticos",
        "Guia-Interpretação em Eventos Políticos",
        "Interpretação em Órgãos Públicos",
        "Guia-Interpretação em Órgãos Públicos"
    ]

	return (
		<main>
            <div className="container-fluid m-2">

                <div className="row g-3 ps-3">

                    <div className="col-md-8 col-12">
                        <div className="container col-12 pt-4 pe-1" name="Introdução">
                            <h1 className="text_t">Alteração de Informações Pessoais</h1>
                            <p className="text_p justify">
                                Verifique suas informações pessoais, se desejar fazer alguma alteração, altere apenas o campo que deseja e aperte no botão <b>Salvar</b>
                            </p>
                        </div>

                        <form onSubmit={mudarSenha} action="/trocarSenha" method="post" className="row g-3 pe-4" id="trocarSenha" name="Trocar de Senha">
                            <p><strong>Modifique sua Senha:</strong></p>
                            <div className="col-md-4 form-floating mt-3 mb-3">
                                    <input type="password" className="form-control" value={senhaAtual} id="senha" name="senha" placeholder="Crie a Senha" onChange={handleSenhaAtualChange} required/>
                                    <label htmlFor="senha" className="form-label text_f" id="senha"> Senha Atual</label>
                            </div>

                            <div className="col-md-4 form-floating mt-3 mb-3">
                                <input type="password" className="form-control" value={senhaNova} id="nova" placeholder="Repita a Senha" onChange={handleSenhaChange} required/>
                                <label htmlFor="nova" className="form-label text_f" id="conf_senha">Nova Senha</label>
                            </div>
                            
                            <div className="col-md-4 form-floating mt-3 mb-3">
                                <input type="password" className="form-control" value={confSenha} id="conf_senha" placeholder="Repita a Senha" onChange={handleConfSenhaChange} required/>
                                <label htmlFor="conf_senha" className="form-label text_f" id="conf_senha">Confirme a Nova Senha</label>
                                {!senhaMatch && <p style={{ color: 'red', fontSize: '12px' }}>As senhas não coincidem.</p>}
                            </div>

                            <div className="col-md-15 form-floating mt-3 mb-3">
                                <button className="btn btn-primary btn-lg" id="send-button" type="submit" >Trocar de Senha</button>
                            </div>

                        </form>




                        <form onSubmit={handleEnviar} action="/cadastro" method="post" className="row g-3 pe-4" id="formulario" name="Forumlário de Inscrição">

                        <div className="input-group col-md-12 mt-3 mb-3">
                            <span className="input-group-text text_f" id="inputGroup-sizing-default">Nome Completo:</span>
                            <input name="nome" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required value={info.nome}  onChange={(e) => handleChange('nome', e.target.value)}/>
                        </div>

                        <div className="input-group col-md-12 mt-3 mb-3">
                            <span className="input-group-text text_f" id="inputGroup-sizing-default">Telefone:</span>
                            <input name="telefone" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required value={info.telefone}  onChange={(e) => handleChange('telefone', e.target.value)}/>
                        </div>

                        <div className="form-floating col-md-6 mt-3 mb-3">
                            <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required value={info.email} onChange={(e) => handleChange('email', e.target.value)}/>
                            <label htmlFor="email" className="text_f" >E-mail</label>
                        </div>

                        <div className="form-floating col-md-6 mt-3 mb-3">
                            <input type="text" id="dataNascimento" className="form-control" name="dataNascimento" placeholder="Data no formato dd/mm/aaaa" value={info.dataNascimento} onChange={(e) => handleChange('dataNascimento', e.target.value)}/>
                            <label htmlFor="dataNascimento" className="form-label text_f">Data de Nascimento:</label>
                        </div>


                        <div className="col-md-6 mt-3 mb-3">
                            <label name="cidade" htmlFor="cidade" className="form-label text_f">Cidade:</label>
                            <input type="text" className="form-control" id="cidade" placeholder="Cidade" value={info.cidade} onChange={(e) => handleChange('cidade', e.target.value)}/>
                        </div>

                        <div className="col-md-4 mt-3 mb-3">
                            <label htmlFor="estado" name="estado" className="form-label text_f">Estado (UF):</label>
                            <select id="estado" className="form-select form-select" aria-label="Default select example" value={info.estado} onChange={(e) => handleChange('estado', e.target.value)}>
                                <option className="text_f" value="AC">Acre</option>
                                <option className="text_f" value="AL">Alagoas</option>
                                <option className="text_f" value="AP">Amapá</option>
                                <option className="text_f" value="AM">Amazonas</option>
                                <option className="text_f" value="BA">Bahia</option>
                                <option className="text_f" value="CE">Ceará</option>
                                <option className="text_f" value="DF">Distrito Federal</option>
                                <option className="text_f" value="ES">Espirito Santo</option>
                                <option className="text_f" value="GO">Goiás</option>
                                <option className="text_f" value="MA">Maranhão</option>
                                <option className="text_f" value="MS">Mato Grosso do Sul</option>
                                <option className="text_f" value="MT">Mato Grosso</option>
                                <option className="text_f" value="MG">Minas Gerais</option>
                                <option className="text_f" value="PA">Pará</option>
                                <option className="text_f" value="PB">Paraíba</option>
                                <option className="text_f" value="PR">Paraná</option>
                                <option className="text_f" value="PE">Pernambuco</option>
                                <option className="text_f" value="PI">Piauí</option>
                                <option className="text_f" value="RJ">Rio de Janeiro</option>
                                <option className="text_f" value="RN">Rio Grande do Norte</option>
                                <option className="text_f" value="RS">Rio Grande do Sul</option>
                                <option className="text_f" value="RO">Rondônia</option>
                                <option className="text_f" value="RR">Roraima</option>
                                <option className="text_f" value="SC">Santa Catarina</option>
                                <option className="text_f" value="SP">São Paulo</option>
                                <option className="text_f" value="SE">Sergipe</option>
                                <option className="text_f" value="TO">Tocantins</option>
                            </select>
                        </div>


                        <div className="col-md-2 mt-3 mb-3">
                            <label htmlFor="cep" name="cep" className="form-label text_f">CEP:</label>
                            <input type="text" className="form-control" id="cep" placeholder="xxxxx-xxx" value={info.cep}/>
                        </div>


                        <div className="col-md-12 mt-3 mb-3">
                            <label htmlFor="formacao" className="form-label text_f">Formação Escolar/Acadêmica</label>
                            <select
                                name="formacao"
                                className="form-select form-select-lg text_f"
                                aria-label="Large select example"
                                value={info.formacao}
                                onChange={e => handleChange('formacao', e.target.value)}
                            >
                                {educationLevels.map(level => (
                                    <option key={level} value={level} className="text_f">{level}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-12 mt-3 mb-3">
                            <label htmlFor="tipo" className="form-label text_f">Tipo de Voluntário</label>
                            <select
                                className="form-select form-select-lg text_f"
                                aria-label="Large select example"
                                onChange={e => handleChange('tipo', e.target.value)}
                                value={info.tipo}
                            >
                                {volunteerTypes.map(type => (
                                    <option key={type} value={type} className="text_f">{type}</option>
                                ))}
                            </select>
                        </div>

                        {info.tipo === 'Intérprete ou Tradutor' ?
                            <>
                                <div className="col-md-12 mt-3 mb-3">
                                    <label htmlFor="experiencia" className="form-label text_f">Experiência profissional como Intérprete</label>
                                    <select
                                        name="experiencia"
                                        className="form-select form-select-lg text_f"
                                        aria-label="Large select example"
                                        value={info.experiencia}
                                        onChange={e => handleChange('experiencia', e.target.value)}
                                    >
                                        {experienceOptions.map(option => (
                                            <option key={option} value={option} className="text_f">{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-12 mt-3 mb-3">
                                    
                                    <label name="cidade" htmlFor="cidade" className="form-label text_f">Trabalha atualmente como Intérprete</label>
                                    <select name="atual" className="form-select form-select-lg text_f" aria-label="Large multiple select example"value={info.trabAtual ? "1" : "2"} onChange={(e) => handleChange('trabAtual', e.target.value)}>
                                        <option className="text_f" value="1">Sim</option>
                                        <option className="text_f" value="2">Não</option>
                                    </select>
                                </div>


                                <div className="col-md-12 mt-3 mb-3">
                                    <label name="cidade" htmlFor="cidade" className="form-label text_f">Interesse de participar de eventos ASSC como voluntário</label>
                                    <select name="interesse" className="form-select form-select-lg text_f" aria-label="Large multiple select example" value={info.interesse ? "1" : "2"} onChange={(e) => handleChange('interesse', e.target.value)}>
                                        <option className="text_f" value='1'>Sim</option>
                                        <option className="text_f" value="2">Não</option>
                                    </select>
                                </div>


                                <div className="col-md-12 mt-3 mb-3">
                                    <p className="text_c rounded p-2 justify" id="bg1">
                                        Para um encontro formativo de intérpretes da ASSC, em quais períodos você teria disponibilidade?
                                    </p>
                                </div>

                                {diasDaSemana.map(dia => (
                                    <DayCheckbox key={dia} dia={dia} val_ini={converteDia(dia)} onAvailabilityChange={handleAvailabilityChange} />
                                ))}
                            </>
                            : <></>}

                            <div className="col-12 mt-3 mb-3">
                                <button className="btn btn-primary btn-lg" id="send-button" type="submit" >Enviar</button>
                            </div>


                            </form>
                        </div>
                    </div>
                </div>


        </main>
	);
}
