"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Menu } from "../components/menu";

// Tipos fora do componente para evitar redefinição a cada render
interface Venda {
  date: string;
  sale: number;
  percentage?: number;
}

interface DadosDiaSemana {
  dia: string;
  vendas: number;
}

function obterVendasLocalStorage(): Venda[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("salesData");
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function agruparPorDiaSemana(dados: Venda[], mes: number, ano: number): DadosDiaSemana[] {
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ];
  const vendasPorDia: { [key: string]: number } = {};
  diasSemana.forEach(dia => vendasPorDia[dia] = 0);

  dados.forEach((item) => {
    if (!item.date) return;
    const partes = item.date.split("/");
    if (partes.length !== 3) return;
    const [dia, mesStr, anoStr] = partes;
    const d = new Date(Number(anoStr), Number(mesStr) - 1, Number(dia));
    if (d.getMonth() + 1 === mes && d.getFullYear() === ano) {
      const diaSemana = d.getDay(); // 0=Dom, 1=Seg, ..., 6=Sáb
      vendasPorDia[diasSemana[diaSemana]] += item.sale || 0;
    }
  });
  return diasSemana.map(dia => ({ dia, vendas: vendasPorDia[dia] }));
}

const GraficoVendas = () => {
  const [mesAno, setMesAno] = useState(() => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
  });
  const [ano, mes] = mesAno.split("-").map(Number);
  const vendas: Venda[] = typeof window !== "undefined" ? obterVendasLocalStorage() : [];
  const dadosDiaSemana: DadosDiaSemana[] = agruparPorDiaSemana(vendas, mes, ano);

  const totalVendas = vendas.reduce((acc, v) => acc + (v.sale || 0), 0);
  const totalGanhos = vendas.reduce((acc, v) => acc + ((v.sale || 0) * (v.percentage || 0)), 0);
  const totalVendasMes = vendas.filter(v => {
    if (!v.date) return false;
    const partes = v.date.split("/");
    if (partes.length !== 3) return false;
    const mesStr = partes[1];
    const anoStr = partes[2];
    return Number(mesStr) === mes && Number(anoStr) === ano;
  }).reduce((acc, v) => acc + (v.sale || 0) + ((v.sale || 0) * (v.percentage || 0)), 0);

  return (
    <div className="flex flex-col justify-between items-center min-h-dvh bg-[hsl(261,87%,9%)] lg:min-h-screen">
      <div className="w-full flex flex-col items-center h-full px-4">
        <h1 className="text-3xl text-center text-white my-5 sm:text-5xl">Gráfico de Vendas por Dia da Semana</h1>
        <div className="flex flex-wrap gap-4 justify-center my-4">
          <div className="bg-white rounded shadow p-4 min-w-[180px] text-center">
            <div className="text-gray-700 font-bold">Total de Vendas</div>
            <div className="text-2xl text-green-700 font-bold">R$ {totalVendas.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-white rounded shadow p-4 min-w-[180px] text-center">
            <div className="text-gray-700 font-bold">Total de Ganhos de Serviços</div>
            <div className="text-2xl text-blue-700 font-bold">R$ {totalGanhos.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-white rounded shadow p-4 min-w-[180px] text-center">
            <div className="text-gray-700 font-bold">Total de Vendas no mês</div>
            <div className="text-2xl text-purple-700 font-bold">R$ {totalVendasMes.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="bg-white w-[90%] py-5 m-auto rounded">
            <h2 className="text-lg text-black font-bold pl-4">Selecione o mês e ano</h2>
            <input
              type="month"
              className="ml-4 border border-gray-300 rounded p-2 text-black"
              value={mesAno}
              onChange={e => setMesAno(e.target.value)}
            />
          </div>
          <div className="bg-white w-[90%] py-5 m-auto rounded my-6">
            {dadosDiaSemana.every(d => d.vendas === 0) ? (
              <div className="text-center text-gray-500 py-10">Nenhum dado para o mês/ano selecionado.</div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dadosDiaSemana} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
      <div className="pb-2 w-full">
        <Menu />
      </div>
    </div>
  );
};

export default GraficoVendas;