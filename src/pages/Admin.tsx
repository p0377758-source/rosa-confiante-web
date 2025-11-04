import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { mockProduct, mockReviews } from "@/data/mockProducts";
import { Product, Review, ProductVariant } from "@/types/product";

// Login hardcoded conforme solicitado [cite: 38]
const ADMIN_EMAIL = "pedrocosta2683@gmail.com";
const ADMIN_PASSWORD = "Canario@10";

type AdminView = "dashboard" | "edit-product" | "manage-links";

// Componente do formulário do produto
const ProductForm = ({ onBack }: { onBack: () => void }) => {
  const { toast } = useToast();
  // Inicializa o estado do formulário com os dados mocados existentes
  const [product, setProduct] = useState<Product>(mockProduct);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  // Funções auxiliares para lidar com campos complexos (JSON em Textarea)
  const handleSpecificationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const specs = JSON.parse(e.target.value);
      setProduct((p) => ({ ...p, specifications: specs }));
    } catch {
      // Ignora JSON inválido temporariamente
    }
  };

  const handleVariantsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const variants = JSON.parse(e.target.value);
      setProduct((p) => ({ ...p, variants: variants }));
    } catch {
      // Ignora JSON inválido
    }
  };

  const handleReviewsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const revs = JSON.parse(e.target.value);
      setReviews(revs);
    } catch {
      // Ignora JSON inválido
    }
  };
  
  const handleProductChange = (field: keyof Product, value: string | number) => {
    setProduct((p) => ({ ...p, [field]: value }));
  };

  const handleSave = () => {
    // Em um app real, aqui você enviaria `product` e `reviews` para sua API ou arquivo
    console.log("Produto Salvo:", product);
    console.log("Avaliações Salvas:", reviews);
    toast({
      title: "Produto Salvo!",
      description: "Os dados do produto foram salvos (no console, por enquanto).",
    });
    onBack();
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Gerenciar Produto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Título do Produto [cite: 51]</Label>
          <Input
            id="name"
            value={product.name}
            onChange={(e) => handleProductChange("name", e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Valor Original (R$) [cite: 49]</Label>
            <Input
              id="price"
              type="number"
              value={product.price}
              onChange={(e) => handleProductChange("price", parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPrice">Valor com Desconto (R$) [cite: 47]</Label>
            <Input
              id="discountPrice"
              type="number"
              value={product.discountPrice}
              onChange={(e) => handleProductChange("discountPrice", parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPercentage">Desconto (%) [cite: 48]</Label>
            <Input
              id="discountPercentage"
              type="number"
              value={product.discountPercentage}
              onChange={(e) => handleProductChange("discountPercentage", parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Imagens (Links separados por vírgula) [cite: 45]</Label>
          <Textarea
            id="images"
            placeholder="https://link1.png, https://link2.png, ..."
            value={product.images.join(",\n")}
            onChange={(e) => handleProductChange("images", e.target.value.split(",").map(link => link.trim()))}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição [cite: 58-66]</Label>
          <Textarea
            id="description"
            value={product.description}
            onChange={(e) => handleProductChange("description", e.target.value)}
            rows={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="includedItems">Itens Inclusos (Separados por vírgula) [cite: 67-71]</Label>
          <Textarea
            id="includedItems"
            value={product.includedItems?.join(",\n")}
            onChange={(e) => handleProductChange("includedItems", e.target.value.split(",").map(item => item.trim()))}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specifications">Especificações (Formato JSON) [cite: 72-88]</Label>
          <Textarea
            id="specifications"
            value={JSON.stringify(product.specifications, null, 2)}
            onChange={handleSpecificationChange}
            rows={8}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="variants">Variantes (Formato JSON) [cite: 108-112]</Label>
          <Textarea
            id="variants"
            value={JSON.stringify(product.variants, null, 2)}
            onChange={handleVariantsChange}
            rows={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reviews">Avaliações (Formato JSON) [cite: 99]</Label>
          <Textarea
            id="reviews"
            value={JSON.stringify(reviews, null, 2)}
            onChange={handleReviewsChange}
            rows={10}
          />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button onClick={handleSave} className="w-full">Salvar Produto</Button>
        <Button onClick={onBack} variant="outline" className="w-full">Voltar</Button>
      </CardFooter>
    </Card>
  );
};

// Componente para Gerar Links
const ManageLinks = ({ onBack }: { onBack: () => void }) => {
  const [generatedLink, setGeneratedLink] = useState("");
  
  const generateLink = () => {
    // Por enquanto, apenas gera o link do produto principal
    const link = `${window.location.origin}/product`;
    setGeneratedLink(link);
  };
  
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Gerar Links de Produto </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateLink} className="w-full">Gerar Link do Produto Principal</Button>
        {generatedLink && (
          <div className="space-y-2">
            <Label htmlFor="product-link">Link Gerado:</Label>
            <Input id="product-link" readOnly value={generatedLink} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onBack} variant="outline" className="w-full">Voltar</Button>
      </CardFooter>
    </Card>
  );
};

// Componente principal do Admin
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<AdminView>("dashboard");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setView("dashboard");
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
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };
  
  const renderDashboard = () => (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Gerenciar Produtos</h2>
          <p className="text-muted-foreground mb-4">
            Adicione ou edite os produtos da sua loja. 
          </p>
          <Button className="w-full" onClick={() => setView("edit-product")}>Gerenciar</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Pedidos</h2>
          <p className="text-muted-foreground mb-4">
            Visualize e gerencie os pedidos recebidos.
          </p>
          <Button className="w-full" disabled>Ver Pedidos (Em breve)</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Gerar Links </h2>
          <p className="text-muted-foreground mb-4">
            Crie links personalizados para seus produtos.
          </p>
          <Button className="w-full" onClick={() => setView("manage-links")}>Criar Link</Button>
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
    </>
  );
  
  const renderView = () => {
    switch(view) {
      case "dashboard":
        return renderDashboard();
      case "edit-product":
        return <ProductForm onBack={() => setView("dashboard")} />;
      case "manage-links":
        return <ManageLinks onBack={() => setView("dashboard")} />;
      default:
        return renderDashboard();
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail [cite: 38]</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha [cite: 38]</Label>
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

  // Painel Admin Logado
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Admin</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
        
        {renderView()}
        
      </main>
    </div>
  );
};

export default Admin;
