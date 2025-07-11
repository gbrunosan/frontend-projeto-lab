'use client';

import { useRouter } from 'next/navigation';

// Função para obter o token do cookie
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// Definindo a URL base da API
const BASE_URL = 'http://localhost:5000/api/';

export async function fetchComToken(
  endpoint: string,  // Agora a função recebe apenas o endpoint
  options: RequestInit = {}
): Promise<any> {
  const token = getCookie('token');  // Usando a função para pegar o token dos cookies

  if (!token) {
    alert('Token não encontrado. Por favor, faça login novamente.');
    window.location.href = '/login';
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,  // Adicionando o token no cabeçalho
  };

  // Construindo a URL completa concatenando a BASE_URL com o endpoint
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const data = await response.json();
    if (data.msg?.includes('expired') || data.msg?.includes('Missing')) {
      alert('Sua sessão expirou ou é inválida. Faça login novamente.');
      // Limpar cookies e redirecionar para o login
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = '/login';
      return;
    }
  }

  if (response.status === 403) {
    const data = await response.json();
    alert(data.error || 'Acesso negado.');
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }

  return data;
}
