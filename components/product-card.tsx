"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  disponivel: boolean;
}

export function ProductCard({ produto }: { produto: Produto }) {
  const { toast } = useToast();
  const [quantidade, setQuantidade] = useState(1);

  const updateQuantidade = (change: number) => {
    setQuantidade(Math.max(1, quantidade + change));
  };

  const addToCart = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existingItem = cartItems.find(
        (item: any) => item.id === produto.id
      );

      if (existingItem) {
        existingItem.quantidade += quantidade;
      } else {
        const newItem = {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
          quantidade: quantidade,
        };
        cartItems.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      toast({
        title: "Produto adicionado ao carrinho",
        description: `${quantidade}x ${produto.nome}`,
      });

    
      setQuantidade(1);
    } catch (error) {
      toast({
        title: "Erro ao adicionar ao carrinho",
        description: "Tente novamente",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full">
          <CardContent className="p-0">
            <div className="relative aspect-square w-full">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold line-clamp-2 min-h-[48px]">
                {produto.nome}
              </h3>
              <p className="text-lg font-bold text-primary mt-2">
                R$ {produto.preco.toFixed(2)}
              </p>
              <Badge
                variant={produto.disponivel ? "default" : "secondary"}
                className="mt-2"
              >
                {produto.disponivel ? "Em Estoque" : "Fora de Estoque"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{produto.nome}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-square w-full">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground">{produto.descricao}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-primary">
              R$ {produto.preco.toFixed(2)}
            </p>
            <Badge variant={produto.disponivel ? "default" : "secondary"}>
              {produto.disponivel ? "Em Estoque" : "Fora de Estoque"}
            </Badge>
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantidade(-1)}
              disabled={quantidade <= 1}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium w-8 text-center">
              {quantidade}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantidade(1)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="w-full"
            disabled={!produto.disponivel}
            onClick={addToCart}
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
