"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const categorias = [
  "Todos",
  "Tintas e Cartuchos",
  "Papéis",
  "Materiais de Escritório",
  "Periféricos",
];

const produtos = [
  {
    id: "1",
    nome: "Cartucho Preto",
    descricao: "Cartucho de tinta original HP 664 preto para impressoras",
    preco: 69.99,
    imagem: "/images/tinta.png",
    categoria: "Tintas e Cartuchos",
    disponivel: true,
  },
  {
    id: "2",
    nome: "Papel Sulfite A4",
    descricao: "Pacote com 500 folhas de papel sulfite A4",
    preco: 29.99,
    imagem: "/images/folhaa4.png",
    categoria: "Papéis",
    disponivel: true,
  },
  {
    id: "3",
    nome: "Clipes Niquelados",
    descricao: "Caixa com 100 clipes niquelados",
    preco: 4.99,
    imagem: "/images/clipes.png",
    categoria: "Materiais de Escritório",
    disponivel: true,
  },
  {
    id: "4",
    nome: "Mouse Sem Fio",
    descricao: "Mouse sem fio ergonômico",
    preco: 49.99,
    imagem: "/images/mouse.png",
    categoria: "Periféricos",
    disponivel: true,
  },
  {
    id: "5",
    nome: "Papel Fotográfico",
    descricao: "Papel fotográfico A4 20 folhas",
    preco: 25.99,
    imagem: "/images/papelfoto.png",
    categoria: "Papéis",
    disponivel: true,
  },
  {
    id: "6",
    nome: "Teclado USB",
    descricao: "Teclado USB ABNT2 com design ergonômico",
    preco: 39.99,
    imagem: "/images/teclado.png",
    categoria: "Periféricos",
    disponivel: true,
  },
];

function CategoriasSidebar({
  categoriaAtual,
  onCategoriaChange,
}: {
  categoriaAtual: string;
  onCategoriaChange: (categoria: string) => void;
}) {
  return (
    <div className="space-y-2">
      {categorias.map((categoria) => (
        <Button
          key={categoria}
          variant={categoriaAtual === categoria ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onCategoriaChange(categoria)}
        >
          {categoria}
        </Button>
      ))}
    </div>
  );
}

export default function ProdutosPage() {
  const [categoriaAtual, setCategoriaAtual] = useState("Todos");
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    let filtered = produtos;

    if (categoriaAtual !== "Todos") {
      filtered = filtered.filter(
        (produto) => produto.categoria === categoriaAtual
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(query) ||
          produto.descricao.toLowerCase().includes(query) ||
          produto.categoria.toLowerCase().includes(query)
      );
    }

    setProdutosFiltrados(filtered);
  }, [categoriaAtual, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Menu className="h-4 w-4 mr-2" />
                    Categorias
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px]">
                  <div className="py-4">
                    <h2 className="text-lg font-semibold mb-4">Categorias</h2>
                    <CategoriasSidebar
                      categoriaAtual={categoriaAtual}
                      onCategoriaChange={setCategoriaAtual}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden md:block w-[240px] flex-shrink-0">
              <h2 className="text-lg font-semibold mb-4">Categorias</h2>
              <CategoriasSidebar
                categoriaAtual={categoriaAtual}
                onCategoriaChange={setCategoriaAtual}
              />
            </div>

            <div className="flex-1">
              {produtosFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-muted-foreground">
                    Nenhum produto encontrado para sua busca.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {produtosFiltrados.map((produto) => (
                    <ProductCard key={produto.id} produto={produto} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
