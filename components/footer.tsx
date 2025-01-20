export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary to-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-primary">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/sobre"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="/contato"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-primary">
              Informações de Contato
            </h3>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a
                  href="mailto:contato@easycard.com"
                  className="hover:text-primary transition-colors"
                >
                  contato@easycard.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Telefone:</span>
                <a
                  href="tel:+5589992021020"
                  className="hover:text-primary transition-colors"
                >
                  +55 89 99202102
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Endereço:</span>
                <span>Picos, Piauí, Brasil</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-primary">Sobre</h3>
            <p className="text-foreground/80 leading-relaxed">
              EasyCard oferece soluções práticas e intuitivas para gestão e
              vendas online. Nossa missão é simplificar a experiência de compra
              e venda para pequenos e médios empreendedores.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center border-t border-border/50">
          <p className="text-foreground/70 font-medium">EasyCard © 2025</p>
          <p className="text-sm mt-2 text-foreground/60">
            Desenvolvido por:{" "}
            <span className="text-primary font-medium">Projeto Manhattan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
