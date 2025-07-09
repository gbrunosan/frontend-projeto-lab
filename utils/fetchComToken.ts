// utils/fetchComToken.ts
'use client';

import { useRouter } from 'next/navigation';

export async function fetchComToken(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const data = await response.json();
    if (data.msg?.includes('expired') || data.msg?.includes('Missing')) {
      alert('Sua sessão expirou ou é inválida. Faça login novamente.');
      localStorage.clear();
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
