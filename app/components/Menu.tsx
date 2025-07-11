'use client';

import { useState, useEffect } from "react";
import { PersonalPrivacy, Down } from "@icon-park/react";
import { useRouter } from "next/navigation";
import { useUsuarioStore } from "@/app/store/useUsuarioStore";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const storeUsuario = useUsuarioStore((state: any) => state.usuario);
  const router = useRouter();

  useEffect(() => {
    if (storeUsuario) {
      setUsuario(storeUsuario);
    }
  }, [storeUsuario]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="relative z-[99]">
      <div onClick={toggleMenu} className="flex gap-2 items-center cursor-pointer">
        {usuario ? (
          <span className="font-semibold truncate w-[80%] max-w-[200px] md:max-w-[400px] xl:max-w-[600px]">
            Olá, <span className="font-bold text-green-400"> {usuario?.nome}</span>
          </span>
        ) : (
          <span>...</span>
        )}
        <button className="rounded-full border p-2">
          <PersonalPrivacy theme="outline" size={26} strokeWidth={5} />
        </button>
        <Down theme="outline" size={22} />
      </div>

      {isOpen && (
        <>
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

              {usuario?.tipo === 'admin' && (
                <li
                  className="hover:bg-gray-100 px-4 py-2.5 border-b border-gray-300 cursor-pointer"
                  onClick={() => handleNavigate("/novoUsuario")}
                >
                  <span>Criar novo usuário</span>
                </li>
              )}

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
