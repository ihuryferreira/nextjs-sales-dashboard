import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProfileForm } from "./components/profileForm";
import { Menu } from "./components/menu";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-dvh bg-[#11032b]">
      <h1 className="text-3xl font-bold text-center mt-4 py-4 text-white">
        Formulário de Vendas
      </h1>
      <div className="flex flex-col justify-center items-center py-4">
        <Card className="w-[90%]">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-semibold">Registro de Vendas</CardTitle>
            <CardDescription>Registre suas vendas com rapidez e facilidade.</CardDescription>
          </CardHeader>
          <ProfileForm />
        </Card>
      </div>
      <div className="pb-2">
        <Menu />
      </div>
    </div>
  );
}
