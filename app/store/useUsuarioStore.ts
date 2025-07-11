import { create } from 'zustand';

interface Usuario {
  nome: string;
  email: string;
  tipo: string;
}

interface UsuarioStore {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario) => void;
}

const isClient = typeof window !== 'undefined';

export const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuario: isClient
    ? JSON.parse(localStorage.getItem('user') || 'null')
    : null,
  setUsuario: (usuario) => {
    set({ usuario });
    if (isClient) {
      localStorage.setItem('user', JSON.stringify(usuario));
    }
  },
}));
