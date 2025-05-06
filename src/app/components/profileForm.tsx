"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

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

// Definição do esquema com valores válidos
const formSchema = z.object({
  username: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  sale: z.coerce.number().positive().min(0.01, {
    message: "O valor deve ser maior que 0.",
  }),
  percentage: z.enum(["0.065", "0.04", "10", "5"], {
    errorMap: () => ({ message: "Selecione um tipo de seguro válido." }),
  }).optional(),
});

export function ProfileForm() {
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
    try {
      const dadosAtualizados = adicionarVenda({
        ...values,
        percentage: Number(values.percentage ?? "0.065"),
      });
      console.log("Dados atualizados:", dadosAtualizados);
      alert("Dados salvos com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao salvar:", error.message);
        alert("Erro ao salvar os dados. Verifique os valores e tente novamente.");
      } else {
        console.error("Erro ao salvar:", error);
        alert("Erro inesperado ao salvar os dados.");
      }
    }

    // Reseta os valores do formulário
    form.reset({
      username: "",
      sale: undefined,
      percentage: undefined,
    });

    // Reseta manualmente o valor do Select
    form.setValue("percentage", undefined);
  }

  return (
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
                    <SelectValue placeholder="Selecione o seguro" />
                  </SelectTrigger>
                  <SelectContent>
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
        <Button className="w-full rounded-full text-lg hover:text-[#e2e2e2]" type="submit">
          Gravar dados...
        </Button>
      </form>
    </Form>
  );
}
