import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Truck, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductReviews } from "@/components/ProductReviews";
import { VariantSelector } from "@/components/VariantSelector";
import { FixedBuyButton } from "@/components/FixedBuyButton";
import { mockProduct, mockReviews } from "@/data/mockProducts";
import { ProductVariant } from "@/types/product";
import { addToCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";

const Product = () => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (mockProduct.variants && !selectedVariant) {
      toast({
        title: "Selecione uma variante",
        description: "Por favor, escolha a cor do produto antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      product: mockProduct,
      variant: selectedVariant,
      quantity: 1,
    });

    window.dispatchEvent(new Event("cartUpdated"));

    toast({
      title: "Produto adicionado!",
      description: "O produto foi adicionado ao seu carrinho.",
    });
  };

  const handleBuyNow = () => {
    if (mockProduct.variants && !selectedVariant) {
      toast({
        title: "Selecione uma variante",
        description: "Por favor, escolha a cor do produto antes de comprar.",
        variant: "destructive",
      });
      return;
    }

    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6 pb-32 md:pb-6">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ProductGallery images={mockProduct.images} productName={mockProduct.name} />
          
          <div className="space-y-6">
            <div>
              <div className="inline-block bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold mb-3">
                -{mockProduct.discountPercentage}% OFF
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{mockProduct.name}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{mockProduct.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({mockProduct.reviews}) • {mockProduct.soldCount} vendidos
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm text-muted-foreground line-through">
                  De R$ {mockProduct.price.toFixed(2)}
                </p>
                <p className="text-4xl font-bold text-primary">
                  R$ {mockProduct.discountPrice.toFixed(2)}
                </p>
                <p className="text-sm text-success font-semibold">
                  Economia de R$ {(mockProduct.price - mockProduct.discountPrice).toFixed(2)}
                </p>
              </div>
            </div>

            {mockProduct.variants && (
              <VariantSelector
                variants={mockProduct.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />
            )}

            <div className="hidden md:flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                Comprar Agora
              </Button>
              <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
            </div>

            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Entrega para todo Brasil</p>
                  <p className="text-sm text-muted-foreground">
                    Receba entre {mockProduct.deliveryInfo.estimatedDays} dias úteis
                  </p>
                  <p className="text-sm font-semibold text-success mt-1">Frete Grátis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Descrição</h2>
            <p className="whitespace-pre-line text-muted-foreground">{mockProduct.description}</p>
          </section>

          {mockProduct.includedItems && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Itens Inclusos</h2>
              <ul className="space-y-2">
                {mockProduct.includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {mockProduct.specifications && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Especificações</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(mockProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b py-3">
                    <span className="font-semibold">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-6">Avaliações dos Clientes ({mockProduct.reviews})</h2>
            <ProductReviews
              reviews={mockReviews}
              averageRating={mockProduct.rating}
              totalReviews={mockProduct.reviews}
            />
          </section>
        </div>
      </main>

      <FixedBuyButton onBuyNow={handleBuyNow} price={mockProduct.discountPrice} />
      <Footer />
    </div>
  );
};

export default Product;
