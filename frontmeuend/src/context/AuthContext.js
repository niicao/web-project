import { EB_Garamond } from 'next/font/google';
import React, { createContext, useState, useContext , useEffect} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [estaLogado, setEstaLogado] = useState(false);
    const [ehSuper, setEhSuper] = useState(false);

    useEffect(() => {
        const logado = localStorage.getItem('logado') === 'true';
        const admin = localStorage.getItem('admin') === 'true';

        setEstaLogado(logado);
        setEhSuper(admin);
    }, []);
    
    const login = () => {
        const logado = localStorage.getItem('logado') === 'true';
        const admin = localStorage.getItem('admin') === 'true';

        setEstaLogado(logado);
        setEhSuper(admin);
    };

    const logout = () => {
        localStorage.removeItem('token');
		localStorage.removeItem('logado');
        localStorage.removeItem('admin');
        localStorage.removeItem('id');

        setEstaLogado(false);
        setEhSuper(false);
    };

    return (
        <AuthContext.Provider value={{ estaLogado, ehSuper, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
