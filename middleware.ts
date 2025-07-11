import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  const { pathname } = request.nextUrl;

  // Se já estiver logado e tentar ir para /login, redireciona para a página inicial
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Se não estiver logado e tentar acessar uma rota protegida
  const rotasProtegidas = [
    "/formReserva",
    "/criarLaboratorio",
    "/laboratorio",
    "/minhasReservas",
  ];

  // Verificando a página inicial de forma separada
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Para as outras rotas protegidas
  if (rotasProtegidas.some((rota) => pathname.startsWith(rota)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continua normalmente se nenhuma condição acima bater
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/",
    "/formReserva",
    "/criarLaboratorio",
    "/minhasReservas",
    "/laboratorio/:path*", // Rotas dinâmicas para '/laboratorio' e suas sub-rotas
  ],
};
