"use client";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useRouter } from "next/navigation";

export function Menu() {
  const router = useRouter();
  return (
    <Menubar className="flex justify-between items-center w-[90%] rounded-[4px] m-auto">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer" onClick={() => router.push("/")}>Home</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Tabela</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Gráfico de Venda</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}