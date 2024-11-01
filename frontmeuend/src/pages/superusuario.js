import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import rotas from "@/services/api";

// definir descrição de eventos e links com máximo de 600 caracteres
//data do evento deve seeguir o formato DD/MM/AAAA
//A URL deve ser https://

export default function Superusuario() {

    const router = useRouter();

    const [salvou, setSalvou] = useState('');

    const [erroSalvar, setErroSalvar] = useState('');
    const [erroEvento, setErroEvento] = useState('');
    const [erroLink, setErroLink] = useState('');

    const [eventos, setEventos] = useState([]);
    const [novoEvento, setNovoEvento] = useState({ nome: '', descricao: '' , data: ''});

    const [links, setLinks] = useState([]);
    const [novoLink, setNovoLink] = useState({ nome: '', descricao: '' , link: ''});
    
    const [usuarios, setUsuarios] = useState([]);


    useEffect(() => {
        const fetchEventos = async() => {
            try{
                const response = await rotas.get('/eventos');
                setEventos(response.data);
            }catch(e){
                console.log("Erro ao carregar eventos:", e)
            }
        };

        const fetchLinks = async() => {
            try{
                const response = await rotas.get('/links');
                setLinks(response.data);
            }catch(e){
                console.log("Erro ao carregar links:", e)
            }
        };

        const fetchUsuarios = async() => {
            try{
                const token = localStorage.getItem('token');

                const response = await rotas.get('/usuarios',{
                    headers: {
                        'Authorization':`Bearer ${token}`
                    }
                });
                setUsuarios(response.data);
            }catch(e){
                console.log("Erro ao carregar usuários:", e)
            }
        };

        fetchEventos();
        fetchLinks();
        fetchUsuarios();

    }, []);

    useEffect(() => {
        setSalvou('');
        setErroLink('');
        setErroSalvar('');
    }, [novoLink]);

    useEffect(() => {
        setSalvou('');
        setErroEvento('');
        setErroSalvar('');
    }, [novoEvento]);

    const handleSalvar = async () => {
        console.log('entrei')
        try {
            const token = localStorage.getItem('token'); 

            await rotas.put('/eventos', eventos, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',

                }
            });

            await rotas.put('/links', links, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',

                }
            });

            console.log('Alterações realizadas com sucesso!');
            setSalvou('Alterações realizadas com sucesso!');
        }catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error('Houve um erro:', error.response.status);
					if (error.response.status === 500) {
						setErroSalvar('Houve um erro ao salvar alterações. Por favor, tente novamente.');
					}
				} else if (error.request) {
					console.error('Nenhuma resposta recebida:', error.request);
					setErroSalvar('Sem resposta do servidor. Por favor, tente novamente mais tarde.');
				} else {
					console.error('Erro ao configurar a solicitação:', error.message);
				}
			} else {
				console.error('Erro inesperado:', error);
				setErroSalvar('Ocorreu um erro inesperado. Por favor, tente novamente.');
			}
		}
        
      };

    const handleEventoChange = (fieldName, value) => {
        setNovoEvento(prevNovoEvento => ({
            ...prevNovoEvento,
            [fieldName]: value
        }));
    };

    const DelEvento = (nome) => {
        const eventosAtualizados = eventos.filter(evento => evento.nome !== nome);
        setEventos(eventosAtualizados);
    };

    const AddEvento = () => {
        if(novoEvento.nome.trim() === '' || novoEvento.descricao.trim() === '' || novoEvento.data.trim() === '') {
            setErroEvento('Nome, descrição e data são obrigatórios!');
            return;
        }
        if(novoEvento.descricao.length > 600){
            setErroEvento('A descrição deve ter no máximo 600 caracteres!');
            return;
        }
        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(novoEvento.data)){
            setErroEvento('A data deve seguir o formato DD/MM/AAAA!');
            return;
        }


        setErroEvento('');
        const novoEventoAdicionado = { ...novoEvento };
        setEventos([...eventos, novoEventoAdicionado]);
        setNovoEvento({ nome: '', descricao: '', data: ''});
    };

    const handleLinkChange = (fieldName, value) => {
        setNovoLink(prevNovoLink => ({
            ...prevNovoLink,
            [fieldName]: value
        }));
    };


    const AddLink = () => {
        if (novoLink.nome.trim() === '' || novoLink.descricao.trim() === '' || novoLink.link.trim() === '') {
            setErroLink('Nome, descrição e link são obrigatórios!');
            return;
        }
        if(!novoLink.link.trim().startsWith('https://')){
            setErroLink('O link deve começar com "https://".');
            return;
        }
        if(novoLink.descricao.length > 600){
            setErroLink('A descrição deve ter no máximo 600 caracteres!');
            return;
        }

        setErroLink('');
        const novoLinkAdicionado = { ...novoLink };
        setLinks([...links, novoLinkAdicionado]);
        setNovoLink({ nome: '', descricao: '' , link: ''});
    };

    const DelLink = (link) => {
        const linksAtualizados = links.filter(elemento => elemento !== link);
        setLinks(linksAtualizados);
    };

    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
            <div className="container-fluid m-2">

                <div className="row g-3 ps-3">

                    <div className=" p-5">

                        <main>

                            <section className="row g-3 pt-5 pe-4" name="Apresentação do Banco de Dados">

                                <div className="container col-12 pt-4 pe-1" name="Introdução">
                                    <h1 className="text_t">Alterações no Site</h1>

                                    <p className="text_p justify">
                                        Área para consulta das informações de usuários e para alterações na disponibilização de links externos e eventos. Faça as alterações e clique em salvar.
                                    </p>
                                </div>
                            </section>

                            <form className="row g-3 pe-2" id="formulario" name="Formulário de Inscrição">
                                {eventos.length > 0 ? eventos.map((evento, index) => (
                                    <div key={index}>
                                        <button onClick={() => DelEvento(evento.nome)} className="btn btn-danger btn-lg ml-3 m-3" type="button">Apagar Evento</button>
                                        <div className="border">
                                            <h2 className="border">{evento.nome}</h2>
                                            <h4>{evento.data}</h4>
                                            <p>{evento.descricao}</p>
                                        </div>
                                    </div>
                                ))
                                    : <h1 className="pt-5 pb-3 fw-light text_t2 text-center" style={{ textAlign: 'center' }}>Nenhum Evento Adicionado</h1>}
                                <div>
                                    <div className="col-12 mb-3">
                                        <h7 name="evento" className="text_t2">Adicionar Evento</h7>
                                        <h7 className="ms-1 text_t2"><button onClick={AddEvento} className="btn btn-success btn-lg ml-3" type="button">Adicionar Evento</button></h7>
                                    </div>
                                    {erroEvento && (
                                        <div className="col-12 mb-3">
                                            <div className="alert alert-danger" role="alert">
                                                {erroEvento}
                                            </div>
                                        </div>
                                    )}
                                    <div className="form-floating col-md-12 mt-3 mb-3">
                                        <input type="text" className="form-control" id="novoEventoNome" placeholder="Nome" required value={novoEvento.nome} onChange={(e) => handleEventoChange('nome', e.target.value)} />
                                        <label htmlFor="novoEventoNome" className="text_f">Nome</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="novoEventoData">Data do Evento</label>
                                        <textarea className="form-control" id="novoEventoData" rows="3" placeholder="Data (deve seguir o formato DD/MM/AAAA)" value={novoEvento.data} onChange={(e) => handleEventoChange('data', e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="novoEventoDescricao">Descrição do Evento</label>
                                        <textarea className="form-control" id="novoEventoDescricao" rows="3" placeholder="Descrição (máximo de 600 caracteres)" value={novoEvento.descricao} onChange={(e) => handleEventoChange('descricao', e.target.value)}></textarea>
                                    </div>
                                </div>

                                {links.length > 0 ? links.map((link, index) => (
                                    <div key={index}>
                                        <button onClick={() => DelLink(link)} className="btn btn-danger btn-lg ml-3 m-3" type="button">Apagar Link</button>
                                        <div className="border">
                                            <h4><a href={link.link} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>{link.nome} </a></h4>
                                            <p>{link.descricao}</p>
                                        </div>
                                    </div>
                                ))
                                    : <h1 className="pt-5 pb-3 fw-light text_t2 text-center" style={{ textAlign: 'center' }}>Nenhum Link Adicionado</h1>}
                                <div>
                                     <div className="col-12 mb-3">
                                        <h7 name="link" className="text_t2">Adicionar Link</h7>
                                        <h7 className="ms-1 text_t2"><button onClick={AddLink} className="btn btn-success btn-lg ml-3" type="button">Adicionar Link</button></h7>
                                    </div>
                                    {erroLink && (
                                        <div className="col-12 mb-3">
                                            <div className="alert alert-danger" role="alert">
                                                {erroLink}
                                            </div>
                                        </div>
                                    )}
                                    <div className="form-floating col-md-12 mt-3 mb-3">
                                        <input type="text" className="form-control" id="novoLinkNome" placeholder="Nome" required value={novoLink.nome} onChange={(e) => handleLinkChange('nome', e.target.value)} />
                                        <label htmlFor="novoLinkNome" className="text_f">Nome</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="novoLinkData">URL</label>
                                        <textarea className="form-control" id="novoLinkLink" rows="3" placeholder="URL (deve iniciar com https://)" value={novoLink.link} onChange={(e) => handleLinkChange('link', e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="novoLinkDescricao">Descrição do Link</label>
                                        <textarea className="form-control" id="novoLinkDescricao" rows="3" placeholder="Descrição (máximo de 600 caracteres)" value={novoLink.descricao} onChange={(e) => handleLinkChange('descricao', e.target.value)}></textarea>
                                    </div>
                                </div>
                            </form>
                            {erroSalvar && (
                                <div className="col-12 mb-3">
                                    <div className="alert alert-danger" role="alert">
                                        {erroSalvar}
                                    </div>
                                </div>
                            )}
                            {salvou && (
                                <div className="col-12 mb-3">
                                    <div className="alert alert-success" role="alert">
                                        {salvou}
                                    </div>
                                </div>
                            )}
                            <div class="col-12 mt-3 mb-3">
                                <button class="btn btn-primary btn-lg" id="send-button" type="button" onClick={handleSalvar}>Salvar</button>
                            </div>

                            <h1 className="pt-5 pb-3 fw-light text_t2 text-center" style={{ textAlign: 'center' }}>Usuários:</h1>

                            <table className="table">
                                <thead className="fixed-header">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Telefone</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Data de Nascimento</th>
                                        <th scope="col">Concordo</th>
                                        <th scope="col">Cidade</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Formação</th>
                                        <th scope="col">Experiência</th>
                                        <th scope="col">Recomendações</th>
                                        <th scope="col">Interesse</th>
                                        <th scope="col">Disponibilidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{usuario.nome}</td>
                                            <td>{usuario.telefone}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.dataNascimento}</td>
                                            <td>{usuario.concordo ? "Sim" : "Não"}</td>
                                            <td>{usuario.cidade}</td>
                                            <td>{usuario.tipo}</td>
                                            <td>{usuario.formacao}</td>
                                            <td>{usuario.experiencia || "-"}</td>
                                            <td>{usuario.recomendacoes || "-"}</td>
                                            <td>{usuario.interesse ? "Sim" : "Não"}</td>
                                            <td>
                                                <ul>
                                                    <li>
                                                        <strong>Segunda:</strong>{" "}
                                                        {usuario.segunda && usuario.segunda.length > 0
                                                            ? usuario.segunda.join(", ")
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <strong>Terça:</strong>{" "}
                                                        {usuario.terca && usuario.terca.length > 0
                                                            ? usuario.terca.join(", ")
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <strong>Quarta:</strong>{" "}
                                                        {usuario.quarta && usuario.quarta.length > 0
                                                            ? usuario.quarta.join(", ")
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <strong>Quinta:</strong>{" "}
                                                        {usuario.quinta && usuario.quinta.length > 0
                                                            ? usuario.quinta.join(", ")
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <strong>Sexta:</strong>{" "}
                                                        {usuario.sexta && usuario.sexta.length > 0
                                                            ? usuario.sexta.join(", ")
                                                            : "-"}
                                                    </li>
                                                    <li>
                                                        <strong>Sábado:</strong>{" "}
                                                        {usuario.sabado && usuario.sabado.length > 0
                                                            ? usuario.sabado.join(", ")
                                                            : "-"}
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </main>
                    </div>
                    <aside className="col-4 h-99 d-inline-block side_banner"></aside>
                </div>
            </div>
        </main>
    );
}
