// app/components/LoginForm.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUsuarioStore } from "../store/useUsuarioStore" // Usando a store para armazenar o usuário

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const setUsuario = useUsuarioStore((state) => state.setUsuario) // Usando a store para armazenar o usuário
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro("")

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error || "Erro no login")
        return
      }

      // Salva no localStorage na chave 'user'
      const userData = { email: data.email, nome: data.nome, tipo: data.tipo }
      localStorage.setItem("user", JSON.stringify(userData))

      // Salva no cookie o token (para manutenção de sessão)
      document.cookie = `token=${data.token}; path=/`

      // Armazenar as informações do usuário na store
      setUsuario(userData)

      // Redireciona para a página de lista de laboratórios
      window.location.href = "/listaLab"  // Redirecionamento usando a URL diretamente
    } catch (err) {
      setErro("Erro na conexão com o servidor")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl px-8 w-full text-neutral-800 flex flex-col gap-5 min-h-[500px] h-[55%] max-w-[550px] justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col">
          <span className="font-bold text-3xl mb-2 leading-8">Bem-vindo ao <span className="text-primary">LabCheck</span></span>
          <span className="text-gray-500 pr-4 leading-5">Faça as reservas dos laboratórios para suas aulas e acompanhe-as de forma rápida!</span>
        </div>

        <div>        
          <div className="mb-2.5">
            <label className="block text-textSecondary text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg border-secondary w-full py-2 px-3 text-neutral-800"
              required
            />
          </div>

          <div className="">
            <label className="block text-textSecondary text-sm font-bold mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border rounded-lg border-secondary w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={carregando}
            className=" bg-primary hover:bg-green-700 duration-150 tracking-wide text-white font-bold py-2.5 px-4 rounded-lg w-full mb-2"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
          {erro && <div className=" text-[#e45156]">{erro}</div>}
        </div>
      </form>
    </div>
  )
}
