'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchComToken } from '@/utils/fetchComToken';
import Toast from './Toast';
import { ToastProps } from '@/types/toastProps'; 
import { PreviewCloseOne, PreviewOpen } from "@icon-park/react";

export default function NovoUsuario() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('professor');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!nome || !email || !senha || !tipo) {
      setToast({
        type: 'error',
        title: 'Erro',
        description: 'Todos os campos são obrigatórios!',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetchComToken('usuarios', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha, tipo }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setToast({
        type: 'success',
        title: 'Sucesso',
        description: response.message || 'Usuário criado com sucesso!',
      });

      setNome('');
      setEmail('');
      setSenha('');
      setTipo('professor');
    } catch (err: any) {
      setToast({
        type: 'error',
        title: 'Erro',
        description: err.message || 'Erro ao criar o usuário',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 pb-6 mt-2 max-w-[700px] w-full">
      <h1 className="text-primary font-bold text-[22px]">Criar novo usuário</h1>

      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          description={toast.description}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="px-4 flex flex-col gap-3 mt-4">
        <div>
          <label className="block mb-1 text-textPrimary">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border border-secondary text-textSecondary p-2 w-full rounded-lg"
            placeholder="Nome do usuário"
          />
        </div>

        <div>
          <label className="block mb-1 text-textPrimary">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-secondary text-textSecondary p-2 w-full rounded-lg "
            placeholder="Email do usuário"
          />
        </div>

        <div className='relative'>
          <label className="block mb-1 text-textPrimary">Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-secondary text-textSecondary p-2 w-full rounded-lg"
            placeholder="Senha do usuário"
          />
          <button
              type="button"
              className="absolute right-3 bottom-2.5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <PreviewCloseOne theme="outline" size={24} fill="#333" />
              ) : (
                <PreviewOpen theme="outline" size={24} fill="#333" />
              )}
          </button>
        </div>

        <div>
          <label className="block mb-1 text-textPrimary">Tipo de Usuário</label>
          <div className="border border-secondary text-textSecondary px-2 w-full rounded-lg">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full bg-gray-50 py-2 focus:outline-none focus:ring-0 focus:border-none"
            >
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? 'bg-gray-400' : 'bg-primary hover:bg-green-700'
            } text-white py-2 px-6 rounded-md w-full duration-150 font-semibold`}
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
          </button>
        </div>
      </form>
    </div>
  );
}
