'use client';

import React, { useState } from 'react';
import {

  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line,
} from 'recharts';

// Exemplo de dados locais
const dadosPorMes = [
  { mes: 'Jan', vendas: 400, meta: 350 },
  { mes: 'Feb', vendas: 300, meta: 320 },
  { mes: 'Mar', vendas: 500, meta: 450 },
  { mes: 'Apr', vendas: 200, meta: 250 },
  { mes: 'May', vendas: 278, meta: 300 },
  { mes: 'Jun', vendas: 189, meta: 200 },
  { mes: 'Jul', vendas: 239, meta: 220 },
  { mes: 'Aug', vendas: 349, meta: 340 },
  { mes: 'Sep', vendas: 400, meta: 390 },
  { mes: 'Oct', vendas: 300, meta: 310 },
  { mes: 'Nov', vendas: 200, meta: 210 },
  { mes: 'Dec', vendas: 278, meta: 300 },
];

// Gera anos de exemplo
const anos = [2022, 2023, 2024];

export default function GraficoVendas() {
  const [anoSelecionado, setAnoSelecionado] = useState(2024);
  const [mesSelecionado, setMesSelecionado] = useState('Todos');

  // Filtra dados se mês for selecionado
  const dadosFiltrados = mesSelecionado === 'Todos'
    ? dadosPorMes
    : dadosPorMes.filter(d => d.mes === mesSelecionado);

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Gráfico de Vendas por Mês</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <label>
          Ano:
          <select
            value={anoSelecionado}
            onChange={e => setAnoSelecionado(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          >
            {anos.map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </label>
        <label>
          Mês:
          <select
            value={mesSelecionado}
            onChange={e => setMesSelecionado(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="Todos">Todos</option>
            {dadosPorMes.map(d => (
              <option key={d.mes} value={d.mes}>{d.mes}</option>
            ))}
          </select>
        </label>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dadosFiltrados}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
          <Line type="monotone" dataKey="meta" stroke="#ff0000" name="Meta" strokeWidth={3} dot={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}