
export default function Reset() {

	return (
		<main>
            <section className="h-100 mb-5">
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                            <div className="text-center my-5">
                                <img src="/ASSCLOGO.png" alt="logo" width="100" />
                            </div>
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h1 className="fs-4 card-title fw-bold mb-4">Alterar senha</h1>
                                    <form method="POST" className="needs-validation" noValidate autoComplete="off">
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" htmlFor="password">Nova senha</label>
                                            <input id="password" type="password" className="form-control" name="password" value="" required autoFocus />
                                            <div className="invalid-feedback">
                                                Senha é necessária
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" htmlFor="password-confirm">Confirmar senha</label>
                                            <input id="password-confirm" type="password" className="form-control" name="password_confirm" required />
                                            <div className="invalid-feedback">
                                                Por favor confirme sua nova senha
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <div className="form-check">
                                                <input type="checkbox" name="logout_devices" id="logout" className="form-check-input" />
                                                <label htmlFor="logout" className="form-check-label">Sair de todos os dispositivos</label>
                                            </div>
                                            <button type="submit" className="outline-button ms-auto botao-login">
                                                Resetar senha
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
	);
}
