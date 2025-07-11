'use client';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const BASE_URL = 'http://localhost:5000/api/';

export async function fetchComToken(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getCookie('token');

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login novamente.');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
  };

  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const data = await response.json();
    if (data.msg?.includes('expired') || data.msg?.includes('Missing')) {
      throw new Error('Sua sessão expirou ou é inválida. Faça login novamente.');
    }
  }

  if (response.status === 403) {
    const data = await response.json();
    throw new Error(data.error || 'Acesso negado.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }

  return data;
}
