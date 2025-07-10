import { create } from 'zustand';

// Definindo o tipo para o usuário
interface Usuario {
  nome: string;
  email: string;
  tipo: string;
}

interface UsuarioStore {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario) => void;
}

// Verificando se estamos no cliente (navegador)
const isClient = typeof window !== 'undefined';

export const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuario: isClient
    ? JSON.parse(localStorage.getItem('user') || 'null')
    : null, // Somente no cliente, lê do localStorage
  setUsuario: (usuario) => {
    set({ usuario });
    if (isClient) {
      // Apenas no cliente, armazena no localStorage
      localStorage.setItem('user', JSON.stringify(usuario));
    }
  },
}));
