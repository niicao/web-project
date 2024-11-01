import rotas from "@/services/api";

export const login = async (email, senha) => {
    
  const response = await rotas.post('/login', JSON.stringify({ email, senha }),
      {
          headers: {'Content-Type':'Application/json'},
          withCredentials: false,
      }
  );

  const token = response.data.token;

  console.log(response.data.id)

  localStorage.setItem('token', token); 
  localStorage.setItem('logado', true);
  localStorage.setItem('admin', response.data.admin); 
  localStorage.setItem('id', response.data.id); 

  return response.data;
  
};

export const cadastroUsuario = async (data) => {

  const response = await rotas.post('/cadastro', JSON.stringify(data,null,2),
      {
          headers: {'Content-Type':'Application/json'},
          withCredentials: false,
      }
  );
};
