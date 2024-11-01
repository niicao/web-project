import { useFontSize } from '@/context/FontsizeContext.js';
import { useState } from 'react';
import { rotas } from '@/services/api.js';

export default function Contato() {

    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        email: '',
        cel_number: '',
        message: '',
        file: null,
    });
    
    const { scale } = useFontSize();

    const handleFormEdit = (event, name) => {
        setFormData({ 
            ...formData,
            [name]: name === 'file' ? event.target.files[0] : event.target.value 
        });
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            console.log(formData);

            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            const response = await rotas.post('/email', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            <div className="yellow-bg mt-0">
                <div className="row mx-0" style={{ marginTop: 'auto' }}>
                    <div className="col-md-5">
                        <div className="contact-form" style={{ margin: '15px' }}>
                            <h1 className="mx-auto h1-top" style={{ color: 'black', paddingLeft: '0px', fontSize: '30px' ,fontSize: `calc(2.5rem * ${scale})`}}>ENVIE-NOS UMA MENSAGEM</h1>
                            <form onSubmit={handleForm}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label" style={{fontSize: `calc(1.2rem * ${scale})`}}>Nome</label>
                                    <input type="text" className="form-control" id="name" name="name" required value={formData.name} onChange={(e) => {handleFormEdit(e, 'name')}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="company_name" className="form-label" style={{fontSize: `calc(1.2rem * ${scale})`}}>Nome da Empresa (Opcional)</label>
                                    <input type="text" className="form-control" id="company_name" name="company_name" value={formData.company_name} onChange={(e) => {handleFormEdit(e, 'company_name')}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"style={{fontSize: `calc(1.2rem * ${scale})`}}>Email</label>
                                    <input type="email" className="form-control" id="email" name="email" required value={formData.email} onChange={(e) => {handleFormEdit(e, 'email')}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cel_number" className="form-label"style={{fontSize: `calc(1.2rem * ${scale})`}}>Telefone</label>
                                    <input type="tel" className="form-control" id="cel_number" name="cel_number" required value={formData.cel_number} onChange={(e) => {handleFormEdit(e, 'cel_number')}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label"style={{fontSize: `calc(1.2rem * ${scale})`}}>Mensagem</label>
                                    <textarea className="form-control" id="message" name="message" rows="3" required value={formData.message} onChange={(e) => {handleFormEdit(e, 'message')}}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label"style={{fontSize: `calc(1.2rem * ${scale})`}}>Envie um arquivo adicional</label>
                                    <label className="custom-file-button border border-dark"style={{fontSize: `calc(1.2rem * ${scale})`}}>Selecione um arquivo
                                        <input className="form-control" type="file" id="formFile" onChange={(e) => {handleFormEdit(e, 'file')}} />
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#30B0E7',fontSize: `calc(1.2rem * ${scale})`} }>Enviar</button>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-5" style={{ textAlign: 'center', margin: '15px' }}>
                        <h1 className="mx-auto h1-top" style={{ color: 'black', paddingLeft: '0px', textAlign: 'center', paddingTop: '50px', fontSize: '30px', fontSize: `calc(2rem * ${scale})`}}>FAÇA UMA DOAÇÃO</h1>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/aea8e5f7b703d5fc3601d51ba45089e1444d6e560e33f78aaab2797903720e2f?apiKey=7df1ecca409e42de8622c49afce9d2c2&"
                                className="img"
                                id="qr-code"
                            />
                        </div>
                        <div>
                            <p className="text" style={{color:'black', textAlign: 'center', fontWeight: 450,fontSize: `calc(1.2rem * ${scale})`}}>Caixa Econômica Federal<br />
                                Agência: 3047<br />
                                Operação: 013 <br />
                                Conta Poupança: 00021684-0<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
