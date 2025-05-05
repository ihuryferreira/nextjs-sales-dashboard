const LOCAL_STORAGE_KEY = "salesData";

// Função para recuperar os dados do localStorage
export function obterDadosLocalmente() {
  const dadosSalvos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return dadosSalvos ? JSON.parse(dadosSalvos) : [];
}

// Define the Venda interface
interface Venda {
  username: string;
  sale: number;
  percentage: number;
  date: string;
  time: string;
}

// Função para salvar os dados no localStorage
export function salvarDadosLocalmente(dados: Venda[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dados));
}

// Função para adicionar uma nova venda
// Define a type for the venda input
interface VendaInput {
  username: string;
  sale: number;
  percentage: number;
}

export function adicionarVenda({ username, sale, percentage }: VendaInput) {
  if (!username || isNaN(sale) || sale <= 0) {
    throw new Error("Dados inválidos! Nome e venda devem ser preenchidos corretamente.");
  }

  const novaVenda = {
    username,
    sale,
    percentage,
    date: new Date().toLocaleDateString("pt-BR"),
    time: new Date().toLocaleTimeString("pt-BR"),
  };

  const dadosAtuais = obterDadosLocalmente();
  dadosAtuais.push(novaVenda);
  salvarDadosLocalmente(dadosAtuais);
  return dadosAtuais;
}

// Função para remover uma venda por índice
interface RemoverVendaInput {
  index: number;
}

export function removerVenda(index: RemoverVendaInput["index"]) {
  const dadosAtuais = obterDadosLocalmente();
  if (index >= 0 && index < dadosAtuais.length) {
    dadosAtuais.splice(index, 1);
    salvarDadosLocalmente(dadosAtuais);
  }
  return dadosAtuais;
}