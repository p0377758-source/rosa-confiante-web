// src/data/mockProducts.ts
import { Product, Review } from "@/types/product";

// Este é agora apenas o DADO INICIAL
export const mockProduct: Product = {
  id: "jbl-boombox-4",
  name: "OFERTA RELÂMPAGO • Caixa de Som Bluetooth À Prova D'água Boombox 4 JBL",
  description: `Caixa de Som Bluetooth À Prova D'água Boombox 4 JBL

Som potente, design moderno e resistência total para acompanhar o seu ritmo — onde quer que esteja.

No TikTok, a vibe é intensidade — e som de qualidade não pode ficar de fora. A Boombox 4 JBL chega com potência de sobra, estilo marcante e resistência para te acompanhar em qualquer lugar. Seja na praia, na piscina, no churrasco ou no quarto, o som vai ser sempre o protagonista.

Feita para quem vive no ritmo da música, essa caixa de som combina graves profundos, bateria de longa duração e design moderno. E o melhor: totalmente à prova d'água, pra você curtir sem se preocupar com respingos ou mergulhos.`,
  price: 329.9,
  discountPrice: 47.9,
  discountPercentage: 72,
  images: [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  ],
  rating: 4.7,
  reviews: 204,
  soldCount: 4473,
  category: "Eletrônicos",
  variants: [
    { id: "black", name: "Preta", color: "#000000" },
    { id: "camo", name: "Camuflada", color: "#4a5d3f" },
    { id: "blue", name: "Azul", color: "#1e40af" },
    { id: "white", name: "Branca", color: "#ffffff" },
  ],
  specifications: {
    "Potência": "80W RMS",
    "Autonomia": "Até 24 horas",
    "Tempo de recarga": "6,5 horas",
    "Dimensões": "48,2 x 25,7 x 20 cm",
    "Conectividade": "Bluetooth 5.3 + entrada auxiliar",
    "Proteção": "À prova d'água e poeira (IP67)",
    "Peso": "5,9 kg",
    "Compatibilidade": "JBL Portable App",
  },
  includedItems: [
    "1 x Caixa de Som JBL Boombox 4 Original",
    "1 x Cabo de carregamento USB-C",
    "1 x Manual do usuário",
    "Garantia oficial do fabricante",
  ],
  deliveryInfo: {
    estimatedDays: "7-12",
    shippingCost: 0,
  },
};

// Estas são as DADOS INICIAIS
export const mockReviews: Review[] = [
  {
    id: "1",
    productId: "jbl-boombox-4",
    userName: "Maria Silva",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "Produto excelente! O som é muito potente e a qualidade é impecável. Vale cada centavo!",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80"],
    createdAt: "há 23 minutos",
  },
  {
    id: "2",
    productId: "jbl-boombox-4",
    userName: "João Santos",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment: "Melhor caixa de som que já tive! A bateria dura muito e é super resistente.",
    createdAt: "há 1 hora",
  },
  {
    id: "3",
    productId: "jbl-boombox-4",
    userName: "Ana Costa",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    comment: "Muito boa! Só achei um pouco pesada, mas a qualidade compensa.",
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80"],
    createdAt: "há 3 horas",
  },
];
