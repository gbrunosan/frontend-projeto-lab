"use client";

import { useState } from "react";
import { PersonalPrivacy } from "@icon-park/react"; // Ícone de perfil
import { useRouter } from "next/navigation";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Função para alternar o menu dropdown
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login";
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="relative z-[99]">
      <button onClick={toggleMenu} className="rounded-full border p-2">
        <PersonalPrivacy theme="outline" size={26} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md rounded-lg w-52 text-[15px] text-textPrimary z-50">
            <ul className="list-none m-0">
              <li
                className="hover:bg-gray-100 rounded-t-lg px-4 py-2.5 border-b border-gray-300 cursor-pointer"
                onClick={() => handleNavigate("/")}
              >
                <span>Início</span>
              </li>
              <li
                className="hover:bg-gray-100 px-4 py-2.5 border-b border-gray-300 cursor-pointer"
                onClick={() => handleNavigate("/minhasReservas")}
              >
                <span>Minhas reservas</span>
              </li>

              <li
                className="hover:bg-gray-100 px-4 py-2.5 border-b border-gray-300 cursor-pointer"
                onClick={() => handleNavigate("/novoUsuario")}
              >
                <span>Criar novo usuário</span>
              </li>

              <li
                className="hover:bg-gray-200 rounded-b-lg px-4 py-2.5 cursor-pointer"
                onClick={handleLogout}
              >
                Sair da conta
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
