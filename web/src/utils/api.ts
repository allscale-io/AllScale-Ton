// API utilities for backend server

const API_URL = 'http://localhost:4000';

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function fetchInvoices() {
  const res = await fetch(`${API_URL}/invoices`);
  return res.json();
}

export async function createInvoice(data: { productId: number; buyer: string; amount: number }) {
  const res = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function payInvoice(id: number) {
  const res = await fetch(`${API_URL}/invoices/${id}/pay`, {
    method: 'PATCH',
  });
  return res.json();
} 