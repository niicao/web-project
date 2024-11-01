import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useFontSize } from '@/context/FontsizeContext.js';


export default function Header(){
	const { estaLogado, ehSuper } = useAuth();
	const { scale } = useFontSize();


	return (
		<header className="container-fluid gradient-bg py-3" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
			<div className="row align-items-center" style={{ marginTop: '0px' }}>
				<div className="col-auto">
					<img src="/ASSCLOGO.png" alt="Logo" style={{ height: '5%' }} />
				</div>
				<div className="col" style={{ width: '30%' }}>
					<div className="row" style={{ width: '0%', marginTop: '0px' }}>
						<div className="col">
							<span className="h1" style={{color: '#E6E6E6', fontFamily: 'Limelight', fontSize: `calc(60px * ${scale})`, marginTop: '-15px' }}>ASSCJF</span>
						</div>
					</div>
					<div className="row" style={{ marginTop: '0px' }}>
						<div className="col">
							<Link legacyBehavior href="/">
								<a className="btn text" style={{ paddingLeft: '0em', paddingRight: '0em',fontSize: `calc(1.5rem * ${scale})`  }}>Home</a>
							</Link>
							<Link legacyBehavior href="/eventos">
								<a className="btn text" style={{ paddingRight: '0em', paddingLeft: '1em',fontSize: `calc(1.5rem * ${scale})`  }}>Eventos</a>
							</Link>
							<Link legacyBehavior href="/sobre">
								<a className="btn text" style={{ paddingRight: '0em', paddingLeft: '1em',fontSize: `calc(1.5rem * ${scale})`  }}>Sobre</a>
							</Link>
							<Link legacyBehavior href="/contribua">
								<a className="btn text" style={{ paddingRight: '0em', paddingLeft: '1em',fontSize: `calc(1.5rem * ${scale})`  }}>Contribua</a>
							</Link>
							<Link legacyBehavior href="/contato">
								<a className="btn text" style={{ paddingRight: '0em', paddingLeft: '1em',fontSize: `calc(1.5rem * ${scale})`  }}>Contato</a>
							</Link>
						</div>
					</div>
				</div>
				<ButtonUser estaLogado={estaLogado} ehSuper={ehSuper} />
			</div>
		</header>
	);
}

function ButtonUser({ estaLogado, ehSuper }) {
	const { logout } = useAuth();

	if(ehSuper){
		return (
			<div className="col-md special-col-auto d-flex justify-content-right" style={{marginRight:"70px"}}>
				<div className="d-flex align-items-center" style={{display:"flex", alignItems:"center"}}>
					<Admbutton />
				</div>
				<div>
					<LogOut logout={logout}/>
				</div>
			</div>
		);
	}
	else if(estaLogado){
		return (
			<div className="col-md special-col-auto d-flex justify-content-right" style={{marginRight:"70px"}}>
				<div className="d-flex align-items-center" style={{display:"flex", alignItems:"center"}}>
					<Perfilbutton />
				</div>
				<div>
					<LogOut logout={logout}/>
				</div>
			</div>
		);
	}
	else{
		return(
			<div className="col-4 special-col-auto">
				<Acessarbutton />

				<Cadastrebutton />
			</div>
		)
	}
}

function Acessarbutton(){
	const { scale } = useFontSize();
	return(
	<Link legacyBehavior href="/login">
		<a className="btn btn-secondary" style={{fontSize: `calc(1.3rem * ${scale})`}}>
			Acessar<i className="bi bi-box-arrow-in-left" style={{ paddingLeft: '0.1em' }}></i>
		</a>
	</Link>
	)
}

function Cadastrebutton(){
	const { scale } = useFontSize();
	return(
	<Link legacyBehavior href="/cadastro">
		<a className="btn btn-primary button-gradient" style={{fontSize: `calc(0.8rem * ${scale})`}}>Cadastre-se</a>
	</Link>
	)
}

function LogOut({ logout }) {
    const router = useRouter();

    const handleLogout = () => {

        logout();

        router.push('/');
    };

    return (
        <button onClick={handleLogout} className="btn btn-secondary" style={{ width: "150%" }}>
            Log Out<i className="bi bi-box-arrow-in-left" style={{ paddingLeft: '0.1em' }}></i>
        </button>
    );
}

function Perfilbutton(){
	
    return(
        <div className="row centered-row" style={{marginTop:"5px"}}>
			<div className="col">
          		<a className="btn btn-secondary" href="/perfil" style={{width: '125px'}}>Meu Perfil</a>
			</div>
			<div className="col icon-user">
				<FontAwesomeIcon icon={faUser} size="xl" />
			</div>

        </div>
    )
}

function Admbutton(){
	return(
        <div className="row centered-row" style={{marginTop:"5px"}}>
			<div className="col">
          		<a className="btn btn-secondary" href="/superusuario" style={{width: '125px'}}>Administração</a>
			</div>
			<div className="col icon-user">
			</div>

        </div>
    )
}