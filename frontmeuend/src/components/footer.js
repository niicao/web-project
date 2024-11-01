import Link from "next/link";
import { FontSizeProvider, useFontSize } from '@/context/FontsizeContext.js';


export default function Footer() {

    const { scale } = useFontSize();

    return (
        <footer className="bg-black-custom pt-3 pb-3">
            <div className="container" style={{ paddingTop: '2%', paddingRight: '0%' }}>
                <div className="row align-items-start">
                    <div className="col-auto image">
                        <img src="/ASSCLOGO.png" alt="Logo" />
                    </div>

                    <div className="col-md-3 footer-content">
                        <p className="footer-text"style={{fontSize: `calc(1rem * ${scale})`}}><i className="bi bi-geo-alt-fill"></i>Av. Comendador Alfredo Maffei, 1372 Jardim Sao Carlos 13561-270</p>
                        <br />
                        <p className="footer-text"style={{fontSize: `calc(1rem * ${scale})`}}><i className="bi bi-whatsapp"></i>(16) 99706-4737</p>
                        <br />
                        <p className="footer-text"style={{fontSize: `calc(1rem * ${scale})`}}><i className="bi bi-telephone"></i>(16) 3419-9222</p>
                    </div>
                    <div className="col-md-3 footer-content footer-botoes">
                        <ul className="list-unstyled">
                            <li><Link legacyBehavior href="/"><a className="btn text-white" style={{ paddingTop: '0px',fontSize: `calc(1rem * ${scale})` }}>Home</a></Link></li>
                            <li><Link legacyBehavior href="/eventos"><a className="btn text-white" style={{fontSize: `calc(1rem * ${scale})`}}>Eventos</a></Link></li>
                            <li><Link legacyBehavior href="/sobre"><a className="btn text-white" style={{fontSize: `calc(1rem * ${scale})`}}>Sobre</a></Link></li>
                            <li><Link legacyBehavior href="/contribua"><a className="btn text-white" style={{fontSize: `calc(1rem * ${scale})`}}>Contribua</a></Link></li>
                            <li><Link legacyBehavior href="/contato"><a className="btn text-white" style={{fontSize: `calc(1rem * ${scale})`}}>Contato</a></Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-content footer-redes">

                        <div className="d-flex">
                            <a href="https://www.facebook.com/ASSCSaoCarlos/?locale=pt_BR" className="botoes-redes">
                                <i className="bi bi-facebook botao" style={{fontSize: `calc(2rem * ${scale})`}}></i>
                            </a>
                            <a href="https://www.instagram.com/assc_saocarlos/" className="botoes-redes">
                                <i className="bi bi-instagram botao" style={{fontSize: `calc(2rem * ${scale})`}}></i>
                            </a>
                            <a href="https://wa.me/16997064737" className="botoes-redes">
                                <i className="bi bi-whatsapp botao" style={{fontSize: `calc(2rem * ${scale})`}}></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center footer-content">
                        <span className="rights-text">© 2024 Todos os direitos reservados</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
