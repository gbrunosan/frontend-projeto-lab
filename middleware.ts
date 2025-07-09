import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || null

  const { pathname } = request.nextUrl

  // ✅ Se já estiver logado e tentar ir pra /login, redireciona
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/listaLab', request.url))
  }

  // ✅ Se não estiver logado e tentar acessar rota protegida
  const rotasProtegidas = ['/listaLab', '/formReserva', '/criarLaboratorio', '/laboratorio']
  const isProtegida = rotasProtegidas.some((rota) => pathname.startsWith(rota))

  if (isProtegida && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ✅ Continua normalmente se nenhuma condição acima bater
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/listaLab',
    '/formReserva',
    '/criarLaboratorio',
    '/laboratorio/:path*'
  ]
}

