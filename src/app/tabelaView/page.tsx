"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Menu } from "../components/menu";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { obterDadosLocalmente, removerVenda } from "@/app/services/formService";

const Tabela = () => {
  interface Venda {
    username: string;
    sale: number;
    percentage: number;
    date: string;
    time: string;
  }

  const [dados, setDados] = useState<Venda[]>([]);

  useEffect(() => {
    try {
      const dadosSalvos = obterDadosLocalmente();
      if (Array.isArray(dadosSalvos)) {
        setDados(dadosSalvos);
      } else {
        console.error("Dados no localStorage não estão no formato esperado.");
      }
    } catch (error) {
      console.error("Erro ao obter dados do localStorage:", error);
    }
  }, []);

  const handleRemoverVenda = (index: number) => {
    const dadosAtualizados = removerVenda(index);
    setDados(dadosAtualizados);
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-dvh bg-[hsl(261,87%,9%)]">
      <div className="w-full flex flex-col items-center h-full px-4">
        <h1 className="text-3xl text-center text-white my-5 sm:text-5xl">Tabela de Vendas</h1>
        <ScrollArea className="flex justify-center items-center h-full w-full">
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-[#1d0536]">
                <TableRow>
                  <TableHead className="px-4 py-2 text-white text-left font-bold">Nome do Vendedor</TableHead>
                  <TableHead className="px-4 py-2 text-white text-left font-bold">Valor da Venda</TableHead>
                  <TableHead className="px-4 py-2 text-white text-left font-bold">Valor da Comissão</TableHead>
                  <TableHead className="px-4 py-2 text-white text-left font-bold">Valor Total da Comissão</TableHead>
                  <TableHead className="px-4 py-2 text-white text-left font-bold">Data da Venda</TableHead>
                  <TableHead className="px-4 py-2 text-white text-left font-bold">Horário da venda</TableHead>
                  <TableHead className="px-4 py-2 text-white text-left font-bold">Excluir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.map((venda, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-2">{venda.username}</TableCell>
                    <TableCell className="px-4 py-2">R$ {venda.sale.toFixed(2)}</TableCell>
                    <TableCell className="px-4 py-2">{(venda.percentage * 100).toFixed(2)}%</TableCell>
                    <TableCell className="px-4 py-2">R$ {(venda.sale * venda.percentage).toFixed(2)}</TableCell>
                    <TableCell className="px-4 py-2">{venda.date}</TableCell>
                    <TableCell className="px-4 py-2">{venda.time}</TableCell>
                    <TableCell className="px-4 py-2">
                      <Button
                        variant="destructive"
                        className="rounded-full"
                        onClick={() => handleRemoverVenda(index)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="pb-2 w-full">
        <Menu />
      </div>
    </div>
  );
};

export default Tabela;
