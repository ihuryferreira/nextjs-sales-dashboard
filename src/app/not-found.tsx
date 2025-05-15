import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[hsl(261,87%,9%)]">
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <p className="text-2xl text-white mb-8">Página não encontrada</p>
      <Link href="/" className="text-lg text-[#1e0b42] bg-white px-6 py-2 rounded shadow hover:bg-gray-200 transition">Voltar para Home</Link>
    </div>
  );
}