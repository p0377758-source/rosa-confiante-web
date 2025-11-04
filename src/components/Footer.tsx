import { Shield, Lock, CreditCard, RefreshCw } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-10 w-10 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Compra Segura</h3>
            <p className="text-sm text-muted-foreground">SSL 256 bits</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Lock className="h-10 w-10 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Pagamento Seguro</h3>
            <p className="text-sm text-muted-foreground">Dados protegidos</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="h-10 w-10 text-primary mb-2" />
            <h3 className="font-semibold mb-1">PIX Instantâneo</h3>
            <p className="text-sm text-muted-foreground">Aprovação rápida</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <RefreshCw className="h-10 w-10 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Garantia</h3>
            <p className="text-sm text-muted-foreground">15 dias para troca</p>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Sobre</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Quem Somos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Trabalhe Conosco</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ajuda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Política de Trocas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Rastreamento</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Políticas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Reembolso</a></li>
              </ul>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-8 border-t">
            <p className="mb-2">CNPJ: 00.000.000/0000-00</p>
            <p>© {new Date().getFullYear()} MeuEcommerce. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
