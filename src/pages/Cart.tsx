import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getCart, updateCartQuantity, removeFromCart, getCartTotal } from "@/lib/cart";
import { CartItem } from "@/types/product";

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleUpdateQuantity = (productId: string, newQuantity: number, variantId?: string) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, newQuantity, variantId);
    setCart(getCart());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (productId: string, variantId?: string) => {
    removeFromCart(productId, variantId);
    setCart(getCart());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-6">
              Adicione produtos ao carrinho para continuar comprando.
            </p>
            <Button onClick={() => navigate("/")}>Ver Produtos</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-4 border rounded-lg p-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.product.name}</h3>
                  {item.variant && (
                    <p className="text-sm text-muted-foreground mb-2">Cor: {item.variant.name}</p>
                  )}
                  <p className="text-lg font-bold text-primary">
                    R$ {item.product.discountPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.product.id, item.variant?.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-2 border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-success font-semibold">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={() => navigate("/checkout")}>
                Finalizar Compra
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
