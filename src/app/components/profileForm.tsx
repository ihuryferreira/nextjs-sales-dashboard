"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { adicionarVenda, obterDadosLocalmente } from "@/app/services/formService";
import { Loader2Icon } from "lucide-react";
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";

// Definição do esquema com valores válidos
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: "O nome deve conter apenas letras e espaços.",
    }),
  sale: z.coerce.number().positive().min(0.01, {
    message: "O valor deve ser maior que 0.",
  }),
  percentage: z
    .enum(["0.065", "0.04", "10", "5"], {
      errorMap: () => ({ message: "Selecione um tipo de seguro válido." }),
    })
    .optional(),
});

export function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    obterDadosLocalmente();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      sale: undefined,
      percentage: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    setTimeout(() => {
      try {
        const dadosAtualizados = adicionarVenda({
          ...values,
          percentage: Number(values.percentage ?? "0"),
        });

        console.log("Dados atualizados:", dadosAtualizados);

        // Exibe a notificação de sucesso
        toast.current?.show({
          severity: "success",
          summary: "Mensagem de sucesso",
          detail: "Dados gravados com sucesso",
          life: 3000,
          content: (
            <div className="flex items-center justify-between gap-2 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-[rgb(232,250,242)] border-l-8 border-green-500 text-green-700 font-bold py-2 px-4 rounded shadow-lg">
              <div className="flex items-center gap-2">
                <i className="pi pi-check text-green-600 text-xl"></i>
                <span className="text-sm">Dados gravados com sucesso</span>
              </div>
              <Button
                className="bg-transparent text-destructive hover:bg-[hsl(261,87%,9%)] font-bold py-1 px-2 rounded"
                onClick={() => toast.current?.clear()}
              >
                <i className="pi pi-times text-xl"></i>
              </Button>
            </div>
          ),
        });

        // Reseta os valores do formulário
        form.reset({
          username: "",
          sale: undefined,
          percentage: undefined,
        });

        // Reseta manualmente o valor do Select
        form.setValue("percentage", undefined);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erro ao salvar:", error.message);
          alert("Erro ao salvar os dados. Verifique os valores e tente novamente.");
        } else {
          console.error("Erro ao salvar:", error);
          alert("Erro inesperado ao salvar os dados.");
        }
      } finally {
        setLoading(false);
      }
    }, 5000);
  }

  return (
    <>
      {/* Componente Toast para exibir notificações */}
      <Toast ref={toast} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 py-2 w-[90%] m-auto"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Digite o seu nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="ex: Douglas"
                    className="placeholder:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Venda</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    className="placeholder:text-base"
                    placeholder="ex: 100 ou 127.50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escolha a Porcentagem da sua venda</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue placeholder="Selecione uma porcentagem..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.01">
                        Venda de Produto com 1% de comissão
                      </SelectItem>
                      <SelectItem value="0.02">
                        Venda de Produto com 2% de comissão
                      </SelectItem>
                      <SelectItem value="0.065">
                        Garantia Estendida e Troca Certa 6.5%
                      </SelectItem>
                      <SelectItem value="0.04">
                        Proteção Roubo e Furto 4%
                      </SelectItem>
                      <SelectItem value="10">
                        Maga+ 1 venda = R$10
                      </SelectItem>
                      <SelectItem value="5">
                        Cartão Magazine Luiza 1 venda = R$5
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full rounded-full text-lg hover:text-[#e2e2e2]"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Gravar dados..."}
          </Button>
        </form>
      </Form>
    </>
  );
}
