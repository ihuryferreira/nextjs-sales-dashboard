import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

export function Menu() {
  return (
    <Menubar className="flex justify-between items-center w-[90%] rounded-[4px] m-auto">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/`}>
            🏠 Home
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/tabela`}>
            📋 Tabela de Vendas
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/grafico`}>
            📊 Gráfico de Venda
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}