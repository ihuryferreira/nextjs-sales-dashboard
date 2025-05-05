import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Menu } from "../components/menu";
import { Button } from "../../components/ui/button";

const Tabela = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-dvh bg-[hsl(261,87%,9%)]">
      <div className="w-full flex flex-col items-center h-full">
        <h1 className="text-5xl text-white my-5">Tabela de Vendas</h1>
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="text-[#FFFFFF] uppercase bg-[hsl(224,76%,48%)] odd:bg-[#0a2879] even:bg-[hsl(224,85%,24%)] hover:bg-[hsl(224,85%,35%)]">
                <TableHead className="px-6 py-3">Nome do Vendedor</TableHead>
                <TableHead className="px-6 py-3">Valor da Venda</TableHead>
                <TableHead className="px-6 py-3">Valor da Comissão</TableHead>
                <TableHead className="px-6 py-3">Valor Total da Comissão</TableHead>
                <TableHead className="px-6 py-3">Data da Venda</TableHead>
                <TableHead className="px-6 py-3">Horário da venda</TableHead>
                <TableHead className="px-6 py-3">Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-dark-foreground odd:bg-[#ffffff] even:bg-[hsl(0,0%,100%)] hover:bg-[hsl(240,1%,80%)]">
                <TableCell>Ihury</TableCell>
                <TableCell>R$ 100.00</TableCell>
                <TableCell>R$ 6.5</TableCell>
                <TableCell>R$ 6.5</TableCell>
                <TableCell>04/05/2025</TableCell>
                <TableCell>21:00</TableCell>
                <TableCell>
                  <Button variant="destructive" className="rounded-full">Excluir</Button>
                </TableCell>
              </TableRow>
              <TableRow className="text-dark-foreground odd:bg-[#dbb405] even:bg-[hsl(44,92%,49%)] hover:bg-[hsl(41,96%,45%)]">
                <TableCell>Ihgor</TableCell>
                <TableCell>R$ 100.00</TableCell>
                <TableCell>R$ 6.5</TableCell>
                <TableCell>R$ 6.5</TableCell>
                <TableCell>04/05/2025</TableCell>
                <TableCell>21:00</TableCell>
                <TableCell>
                  <Button variant="destructive" className="rounded-full">Excluir</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
