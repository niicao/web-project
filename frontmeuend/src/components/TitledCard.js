import React from "react";
import { useFontSize } from '@/context/FontsizeContext.js';


export default function TitledCard({title, text, reverse=false, imagePath="./ASSCLOGO.png"}) {
	const { scale } = useFontSize();
    
    if(reverse){
        return(
            <div className="row g-3">
              <div className="col-md-6">
                 <div className="flex-md-row mb-4 position-relative">
                    <div className="col d-flex flex-column position-static h-100">
                       <div id="Atividade2" className="carousel slide" data-bs-ride="true">
                          <div className="carousel-indicators">
                             <button type="button" data-bs-slide-to="0" className="active" aria-current="true" aria-label=""></button>
                             <button type="button" data-bs-slide-to="1" aria-label=""></button>
                          </div>
                          <div className="carousel-inner">
                             <div className="carousel-item active">
                                <img src={imagePath} className="d-block w-100" alt=""/>
                             </div>
                             <div className="carousel-item">
                                <img src={imagePath} className="d-block w-100" alt=""/>
                             </div>
                          </div>
                          <button className="carousel-control-prev" type="button"  data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button"  data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="col-md-5 mb-5">
                 <div className="atividades-style border rounded-4 flex-md-row shadow-sm position-relative h-100">
                    <div className="col p-4" style={{color: '#E6E6E6'}}>
                       <h1 className="mb-5"style={{fontSize: `calc(2rem * ${scale})`}}>{title}</h1>
                       <p  className="text"style={{fontSize: `calc(1.2rem * ${scale})`}}>{text}</p>
                    </div>
                 </div>
              </div>
           </div>
        )

    }
    else{
        return (
            <div className="row g-3">
                <div className="col-md-5 mb-5">
                    <div className="atividades-style border rounded-4 flex-md-row shadow-sm position-relative h-100">
                        <div className="col p-4">
                        <h1 className="mb-5"style={{fontSize: `calc(2rem * ${scale})`}}>{title}</h1>
                        <p className="text"style={{fontSize: `calc(1.2rem * ${scale})`}}>{text}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="flex-md-row mb-4 position-relative">
                        <div className="col d-flex flex-column position-static h-100">
                        <div id="Atividade1" className="carousel slide" data-bs-ride="true">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#Atividade1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="image"></button>
                                <button type="button" data-bs-target="#Atividade1" data-bs-slide-to="1" aria-label="image"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={imagePath} className="d-block w-100" alt=""/>
                                </div>
                                <div className="carousel-item">
                                    <img src={imagePath} className="d-block w-100" alt=""/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#Atividade1" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#Atividade1" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}