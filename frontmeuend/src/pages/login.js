import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { login as loginUsuario } from "@/utils/autenticacao";
import axios from 'axios';

export default function LoginForm() {

	const userRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [erro, setErro] = useState('');

	const router = useRouter();
	const { login } = useAuth();

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setErro('');
	}, [email,senha])

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await loginUsuario(email, senha);
			

			login();
			router.push('/'); 
		}catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error('Houve um erro:', error.response.status);
					if (error.response.status === 400) {
						setErro('Usuário não cadastrado');
					} else if (error.response.status === 401) {
						setErro('Email e senha inválidos');
					} else {
						setErro('Houve um erro ao fazer login. Por favor, tente novamente.');
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
	};

	return (
		<main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
        <section className="flex-grow-1 mb-5" style={{ display: 'flex', flexDirection: 'column' }}>
            <p ref={errRef} className={erro ? "msgerro" : "offscreen"} aria-live="assertive">{erro}</p>
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100" style={{ marginTop: 'auto' }}>
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-5">
                            <img src="/ASSCLOGO.png" alt="logo" width="100" />
                        </div>

                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Acessar sua conta</h1>

                                <form onSubmit={handleSubmit} action="/login" method="post">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Endereço de e-mail</label>
                                        <input
                                            id="email"
                                            type="text"
                                            ref={userRef}
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="senha">Senha</label>
                                            <Link legacyBehavior href="/esqueci">
                                                <a href="./esqueci" className="float-end">
                                                    Esqueceu a senha?
                                                </a>
                                            </Link>
                                        </div>
                                        <input
                                            id="senha"
                                            type="password"
                                            ref={userRef}
                                            className="form-control"
                                            name="senha"
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            required
                                        />
                                    </div>

										<div className="d-flex align-items-center">
											<div className="form-check">
											</div>
											<button className="outline-button ms-auto botao-login">
												Login
											</button>
										</div>
										{erro && <p style={{color: 'red'}}>{erro}</p>}
									</form>
								</div>
								<div className="card-footer py-3 border-0">
									<div className="text-center">
										Não tem conta? <Link legacyBehavior href="/cadastro"><a className="text-dark">Crie uma!</a></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

        </main>
	);
}
