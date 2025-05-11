import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Menu } from "../components/menu";
import { Button } from "../../components/ui/button";

const Tabela = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-dvh bg-[hsl(261,87%,9%)]">
      <div className="w-full flex flex-col items-center h-full">
        <h1 className="text-3xl text-center text-white my-5 sm:text-5xl">Tabela de Vendas</h1>
        <ScrollArea>
          <div
            className="w-[352px] px-1 py-1 sm:max-w-[1366px]"
          >
            <Table className="w-full m-auto">
              <TableHeader className="bg-[#1d0536] hover:bg-[#1d0536]">
                <TableRow>
                  <TableHead className="px-6 py-3 text-white text-left font-bold">Nome do Vendedor</TableHead>
                  <TableHead className="px-6 py-3 text-white text-left font-bold">Valor da Venda</TableHead>
                  <TableHead className="px-6 py-3 text-white text-left font-bold">Valor da Comissão</TableHead>
                  <TableHead className="px-6 py-3 text-white text-left font-bold">Valor Total da Comissão</TableHead>
                  <TableHead className="px-6 py-3 text-white text-left font-bold">Data da Venda</TableHead>
                  <TableHead className="px-6 py-3 text-white text-left font-bold">Horário da venda</TableHead>
                  <TableHead className="px-6 py-3 text-white text-left font-bold">Excluir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ihury</TableCell>
                  <TableCell>R$ 100.00</TableCell>
                  <TableCell>R$ 6.5</TableCell>
                  <TableCell>R$ 6.5</TableCell>
                  <TableCell>04/05/2025</TableCell>
                  <TableCell>21:00</TableCell>
                  <TableCell>
                    <Button variant="destructive" className="rounded-full">
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ihgor</TableCell>
                  <TableCell>R$ 100.00</TableCell>
                  <TableCell>R$ 6.5</TableCell>
                  <TableCell>R$ 6.5</TableCell>
                  <TableCell>04/05/2025</TableCell>
                  <TableCell>21:00</TableCell>
                  <TableCell>
                    <Button variant="destructive" className="rounded-full">
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
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
