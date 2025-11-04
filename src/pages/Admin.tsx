// src/pages/Admin.tsx
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Product, Review } from "@/types/product";
import {
  getProducts,
  getProductById,
  saveProduct,
  createProduct,
  deleteProduct,
  getReviews,
  saveReviews,
} from "@/lib/productStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Edit, PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Login hardcoded
const ADMIN_EMAIL = "pedrocosta2683@gmail.com";
const ADMIN_PASSWORD = "Canario@10";

type AdminView = "dashboard" | "edit-product" | "manage-links" | "edit-reviews";

// --- COMPONENTE DO FORMULÁRIO DE PRODUTO ---
const ProductForm = ({
  productId,
  onBack,
}: {
  productId: string | null;
  onBack: () => void;
}) => {
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      setProduct(getProductById(productId) || null);
    } else {
      // Cria um novo produto em branco
      const newProd = createProduct({ name: "Novo Produto" });
      setProduct(newProd);
    }
  }, [productId]);

  if (!product) {
    return <div>Carregando...</div>;
  }

  // Funções auxiliares para lidar com campos complexos
  const handleProductChange = (field: keyof Product, value: any) => {
    setProduct((p) => (p ? { ...p, [field]: value } : null));
  };
  
  const handleNestedChange = (
    section: "specifications" | "variants" | "includedItems" | "images", 
    value: string
  ) => {
    if (!product) return;
    
    try {
      if (section === "specifications" || section === "variants") {
        const parsedValue = JSON.parse(value);
        handleProductChange(section, parsedValue);
      } else if (section === "includedItems" || section === "images") {
         const list = value.split(",").map(item => item.trim()).filter(Boolean);
         handleProductChange(section, list);
      }
    } catch {
      toast({ variant: "destructive", title: "Erro de Formato", description: "O formato JSON ou da lista (separada por vírgula) está inválido."})
    }
  }

  const handleSave = () => {
    if (product) {
      saveProduct(product);
      toast({
        title: "Produto Salvo!",
        description: "Os dados do produto foram salvos.",
      });
      onBack();
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{productId ? "Editar Produto" : "Criar Novo Produto"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="id">ID do Produto (não editável)</Label>
          <Input id="id" value={product.id} readOnly disabled />
        </div>
      
        <div className="space-y-2">
          <Label htmlFor="name">Título do Produto [cite: 19]</Label>
          <Input
            id="name"
            value={product.name}
            onChange={(e) => handleProductChange("name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Valor Original (R$) [cite: 17]</Label>
            <Input
              id="price"
              type="number"
              value={product.price}
              onChange={(e) => handleProductChange("price", parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPrice">Valor com Desconto (R$) [cite: 15]</Label>
            <Input
              id="discountPrice"
              type="number"
              value={product.discountPrice}
              onChange={(e) => handleProductChange("discountPrice", parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPercentage">Desconto (%) [cite: 16]</Label>
            <Input
              id="discountPercentage"
              type="number"
              value={product.discountPercentage}
              onChange={(e) => handleProductChange("discountPercentage", parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Imagens (Links separados por vírgula) [cite: 13]</Label>
          <Textarea
            id="images"
            placeholder="https://link1.png, https://link2.png, ..."
            value={product.images.join(",\n")}
            onChange={(e) => handleNestedChange("images", e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição [cite: 26-33]</Label>
          <Textarea
            id="description"
            value={product.description}
            onChange={(e) => handleProductChange("description", e.target.value)}
            rows={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="includedItems">Itens Inclusos (Separados por vírgula) [cite: 35-39]</Label>
          <Textarea
            id="includedItems"
            value={product.includedItems?.join(",\n") || ""}
            onChange={(e) => handleNestedChange("includedItems", e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specifications">Especificações (Formato JSON) [cite: 40-56]</Label>
          <Textarea
            id="specifications"
            value={JSON.stringify(product.specifications || {}, null, 2)}
            onChange={(e) => handleNestedChange("specifications", e.target.value)}
            rows={8}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="variants">Variantes (Formato JSON) [cite: 76-80]</Label>
          <Textarea
            id="variants"
            value={JSON.stringify(product.variants || [], null, 2)}
            onChange={(e) => handleNestedChange("variants", e.target.value)}
            rows={6}
          />
        </div>

      </CardContent>
      <CardFooter className="gap-2">
        <Button onClick={handleSave} className="w-full">
          Salvar Produto
        </Button>
        <Button onClick={onBack} variant="outline" className="w-full">
          Voltar ao Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- COMPONENTE DE AVALIAÇÕES ---
const ReviewsForm = ({ onBack }: { onBack: () => void }) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  const handleReviewsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const revs = JSON.parse(e.target.value);
      setReviews(revs);
    } catch {
      // Ignora JSON inválido temporariamente
    }
  };
  
  const handleSave = () => {
    saveReviews(reviews);
    toast({
      title: "Avaliações Salvas!",
    });
    onBack();
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Gerenciar Avaliações [cite: 67]</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="reviews">Avaliações (Formato JSON) [cite: 70-73]</Label>
          <Textarea
            id="reviews"
            value={JSON.stringify(reviews, null, 2)}
            onChange={handleReviewsChange}
            rows={20}
          />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button onClick={handleSave} className="w-full">Salvar Avaliações</Button>
        <Button onClick={onBack} variant="outline" className="w-full">Voltar</Button>
      </CardFooter>
    </Card>
  );
};


// --- COMPONENTE DE GERAR LINKS ---
const ManageLinks = ({ onBack }: { onBack: () => void }) => {
  const [link, setLink] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const generateLink = (productId: string) => {
    const productLink = `${window.location.origin}/product/${productId}`;
    setLink(productLink);
  };
  
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Gerar Links de Produto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Selecione um produto para gerar o link:</p>
        <div className="space-y-2">
          {products.map(product => (
            <Button 
              key={product.id}
              variant="outline"
              className="w-full justify-start"
              onClick={() => generateLink(product.id)}
            >
              {product.name}
            </Button>
          ))}
        </div>
        
        {link && (
          <div className="space-y-2 pt-4">
            <Label htmlFor="product-link">Link Gerado:</Label>
            <Input id="product-link" readOnly value={link} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onBack} variant="outline" className="w-full">Voltar</a/Button>
      </CardFooter>
    </Card>
  );
};


// --- COMPONENTE PRINCIPAL DO ADMIN ---
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<AdminView>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoggedIn && view === "dashboard") {
      setProducts(getProducts());
    }
  }, [isLoggedIn, view]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setView("dashboard");
      toast({ title: "Login realizado com sucesso!" });
    } else {
      toast({ title: "Erro ao fazer login", variant: "destructive" });
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleCreateNew = () => {
    setCurrentProductId(null); // Indica que é um novo produto
    setView("edit-product");
  };

  const handleEdit = (id: string) => {
    setCurrentProductId(id);
    setView("edit-product");
  };
  
  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts()); // Atualiza a lista
    toast({ title: "Produto Excluído!" });
  };
  
  const renderDashboard = () => (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Gerenciar Avaliações</h2>
          <p className="text-muted-foreground mb-4">
            Edite as avaliações globais dos produtos.
          </p>
          <Button className="w-full" onClick={() => setView("edit-reviews")}>Gerenciar Avaliações</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Pedidos</h2>
          <p className="text-muted-foreground mb-4">
            Visualize e gerencie os pedidos recebidos.
          </p>
          <Button className="w-full" disabled>Ver Pedidos (Em breve)</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Gerar Links [cite: 8]</h2>
          <p className="text-muted-foreground mb-4">
            Crie links para produtos específicos.
          </p>
          <Button className="w-full" onClick={() => setView("manage-links")}>Criar Link</Button>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Meus Produtos</CardTitle>
          <Button size="sm" onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Produto
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Vendidos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Nenhum produto cadastrado.
                  </TableCell>
                </TableRow>
              )}
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>R$ {product.discountPrice.toFixed(2)}</TableCell>
                  <TableCell>{product.soldCount}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(product.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso excluirá permanentemente o produto.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
  
  // Decide qual view renderizar
  const renderView = () => {
    switch(view) {
      case "dashboard":
        return renderDashboard();
      case "edit-product":
        return <ProductForm productId={currentProductId} onBack={() => setView("dashboard")} />;
      case "manage-links":
        return <ManageLinks onBack={() => setView("dashboard")} />;
      case "edit-reviews":
        return <ReviewsForm onBack={() => setView("dashboard")} />;
      default:
        return renderDashboard();
    }
  }

  // --- RENDER LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Login </h1>
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

  // --- RENDER PAINEL ADMIN ---
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
