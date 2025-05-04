"use client"


import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  sale: z.coerce.number().positive().min(0.01, {
    message: "Sale value must be a valid number greater than 0.",
  }),
  percentage: z.enum([
    "0.065",
    "0.04",
    "10",
    "5",
  ], {
    errorMap: () => ({ message: "Please select a valid insurance type." }),
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2 w-[90%] m-auto">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digite o seu nome</FormLabel>
              <FormControl>
                <Input placeholder="ex: Douglas" {...field} />
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
                <Input placeholder="ex: 100 ou 127.50" {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Selecione o seguro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.065">Garantia Estendida e Troca certa 6.5%</SelectItem>
                    <SelectItem value="0.04">Proteção Roubo e Furto 4%</SelectItem>
                    <SelectItem value="10">Maga+ 1 venda = R$10</SelectItem>
                    <SelectItem value="5">Cartão Magazine Luiza 1 venda = R$5</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full rounded-full text-lg" type="submit">Gravar dados...</Button>
      </form>
    </Form>
  )
}
