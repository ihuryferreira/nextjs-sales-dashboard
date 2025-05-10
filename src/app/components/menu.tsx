import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

export function Menu() {
  return (
    <Menubar className="flex justify-between items-center w-[90%] rounded-[4px] m-auto py-6">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/`} className="text-3xl">
            🏠 <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/tabela`} className="text-3xl">
            📋 <span className="sr-only sm:not-sr-only">Tabela</span>
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={`/grafico`} className="text-3xl">
            📊 <span className="sr-only sm:not-sr-only">Gráfico</span>
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}