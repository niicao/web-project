import Link from "next/link";

export default function Forgot() {

	return (
		<main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
            <section className="h-100 mb-5">
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                            <div className="text-center my-5">
                                <img src="/ASSCLOGO.png" alt="logo" width="100" />
                            </div>
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h1 className="fs-4 card-title fw-bold mb-4">Esqueci a senha</h1>
                                    <form method="POST" className="needs-validation" noValidate autoComplete="off">
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" htmlFor="email">Endereço de email</label>
                                            <input id="email" type="email" className="form-control" name="email" value="" required autoFocus />
                                            <div className="invalid-feedback">
                                                Email é inválido
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <button type="submit" className="outline-button ms-auto botao-login">
                                                Enviar link
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer py-3 border-0">
                                    <div className="text-center">
                                        Lembra sua senha? <Link legacyBehavior href="/login"><a className="text-dark">Login</a></Link>
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
