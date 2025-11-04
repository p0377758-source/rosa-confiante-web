import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "pedrocosta2683@gmail.com";
const ADMIN_PASSWORD = "Canario@10";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
      toast({
        title: "Erro ao fazer login",
        description: "E-mail ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
              <div className="text-center">
                <a href="#" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
            </form>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Admin</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            Sair
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Gerenciar Produtos</h2>
            <p className="text-muted-foreground mb-4">
              Adicione, edite ou remova produtos da sua loja.
            </p>
            <Button className="w-full">Gerenciar</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Pedidos</h2>
            <p className="text-muted-foreground mb-4">
              Visualize e gerencie os pedidos recebidos.
            </p>
            <Button className="w-full">Ver Pedidos</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Gerar Links</h2>
            <p className="text-muted-foreground mb-4">
              Crie links personalizados para seus produtos.
            </p>
            <Button className="w-full">Criar Link</Button>
          </Card>
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-bold mb-6">Estatísticas Rápidas</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-muted-foreground mb-1">Vendas Hoje</p>
              <p className="text-3xl font-bold text-primary">R$ 0,00</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Pedidos</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Produtos</p>
              <p className="text-3xl font-bold">1</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Visitantes</p>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
