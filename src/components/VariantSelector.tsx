import { ProductVariant } from "@/types/product";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant?: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector = ({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Escolha a cor:</h3>
      <div className="grid grid-cols-2 gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelectVariant(variant)}
            className={cn(
              "relative flex items-center gap-3 rounded-lg border-2 p-3 transition-all hover:border-primary",
              selectedVariant?.id === variant.id
                ? "border-primary bg-secondary"
                : "border-border"
            )}
          >
            {variant.color && (
              <div
                className="h-8 w-8 rounded-full border-2 border-border"
                style={{ backgroundColor: variant.color }}
              />
            )}
            <span className="font-medium">{variant.name}</span>
            {selectedVariant?.id === variant.id && (
              <Check className="absolute right-3 h-5 w-5 text-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
