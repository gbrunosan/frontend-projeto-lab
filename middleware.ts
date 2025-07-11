import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  const { pathname } = request.nextUrl;

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const rotasProtegidas = [
    "/formReserva",
    "/criarLaboratorio",
    "/laboratorio",
    "/minhasReservas",
  ];

  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (rotasProtegidas.some((rota) => pathname.startsWith(rota)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/",
    "/formReserva",
    "/criarLaboratorio",
    "/minhasReservas",
    "/laboratorio/:path*",
  ],
};
