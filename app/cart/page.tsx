"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

export default function CartPage() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const items = localStorage.getItem("cartItems");
      if (items) {
        setCartItems(JSON.parse(items));
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar o carrinho",
        description: "Não foi possível carregar seus itens",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + item.preco * item.quantidade;
    }, 0);
    setTotal(newTotal);

    if (cartItems.length > 0) {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        toast({
          title: "Erro ao salvar o carrinho",
          description: "Não foi possível salvar as alterações",
          variant: "destructive",
        });
      }
    }
  }, [cartItems, toast]);

  const removeItem = (id: string) => {
    setCartItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });

    toast({
      title: "Item removido",
      description: "O item foi removido do carrinho",
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) => {
      const newItems = prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantidade + change);
          return { ...item, quantidade: newQuantity };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p>Carregando carrinho...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-muted-foreground mb-8">
              Adicione alguns produtos para começar suas compras
            </p>
            <Button asChild>
              <a href="/produtos">Continuar Comprando</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.imagem}
                      alt={item.nome}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.nome}</h3>
                    <p className="text-lg font-bold text-primary mt-1">
                      R$ {item.preco.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantidade <= 1}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">
                          {item.quantidade}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full">Finalizar Compra</Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
