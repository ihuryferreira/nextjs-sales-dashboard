"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "./components/profileForm";
import { Menu } from "./components/menu";
import { useEffect, useState, useCallback } from "react";
import { obterDadosLocalmente } from "@/app/services/formService";

interface Venda {
  sale: number;
  percentage: number;
}

export default function Home() {
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalComissao, setTotalComissao] = useState(0);

  const atualizarTotais = useCallback(() => {
    const dadosSalvos = obterDadosLocalmente();
    if (Array.isArray(dadosSalvos)) {
      const totalVendasCalc = dadosSalvos.reduce((acc: number, venda: Venda) => acc + Number(venda.sale || 0), 0);
      const totalComissaoCalc = dadosSalvos.reduce(
        (acc: number, venda: Venda) =>
          acc + Math.round((Number(venda.sale || 0) * Number(venda.percentage || 0)) * 100) / 100,
        0
      );
      setTotalVendas(totalVendasCalc);
      setTotalComissao(totalComissaoCalc);
    } else {
      setTotalVendas(0);
      setTotalComissao(0);
    }
  }, []);

  useEffect(() => {
    atualizarTotais();
  }, [atualizarTotais]);

  return (
    <div className="flex flex-col justify-center min-h-dvh bg-[hsl(261,87%,9%)]">
      <h1 className="text-3xl font-bold text-center mt-4 py-4 text-white">
        Formulário de Vendas
      </h1>
      <div className="flex flex-col justify-center items-center py-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-[90%]">
          <Card className="flex-1 bg-[#f8fafc]">
            <CardHeader className="text-center">
              <CardTitle className="text-[#1e0b42] text-xl font-semibold uppercase">Total de Vendas</CardTitle>
              <CardDescription className="mt-2 text-[#38343f] text-2xl font-bold">R$ {totalVendas.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-1 bg-[#f8fafc]">
            <CardHeader className="text-center">
              <CardTitle className="text-[#1e0b42] text-xl font-semibold uppercase">Total de Comissão</CardTitle>
              <CardDescription className="mt-2 text-[#38343f] text-2xl font-bold">R$ {totalComissao.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Card className="w-[90%]">
          <CardHeader className="text-center">
            <CardTitle className="text-[#1e0b42] text-3xl font-semibold uppercase">Registro de Vendas</CardTitle>
            <CardDescription className="mt-4 text-[#38343f]">Registre suas vendas com rapidez e facilidade.</CardDescription>
          </CardHeader>
          <ProfileForm onVendaAdicionada={atualizarTotais} />
        </Card>
      </div>
      <div className="pb-2">
        <Menu />
      </div>
    </div>
  );
}
