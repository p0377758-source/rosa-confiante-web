import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FixedBuyButtonProps {
  onBuyNow: () => void;
  price: number;
}

export const FixedBuyButton = ({ onBuyNow, price }: FixedBuyButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 p-4 md:hidden">
      <div className="container flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total:</p>
          <p className="text-2xl font-bold text-primary">
            R$ {price.toFixed(2)}
          </p>
        </div>
        <Button size="lg" className="flex-1 max-w-xs" onClick={onBuyNow}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Comprar Agora
        </Button>
      </div>
    </div>
  );
};
