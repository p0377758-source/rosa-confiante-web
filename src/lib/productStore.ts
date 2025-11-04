// src/lib/productStore.ts
import { Product, Review } from "@/types/product";
import { mockProduct, mockReviews } from "@/data/mockProducts";

const PRODUCTS_KEY = "admin_products";
const REVIEWS_KEY = "admin_reviews";

// Inicializa o armazenamento com dados mocados se estiver vazio
export const initializeProductStore = () => {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    // Salva o produto mock como o primeiro item de uma lista
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([mockProduct]));
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(mockReviews));
  }
};

// --- Funções de Produto ---

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find((p) => p.id === id);
};

export const saveProduct = (productToSave: Product): void => {
  let products = getProducts();
  const index = products.findIndex((p) => p.id === productToSave.id);

  if (index > -1) {
    // Atualiza produto existente
    products[index] = productToSave;
  } else {
    // Adiciona novo produto (embora 'createProduct' seja melhor para isso)
    products.push(productToSave);
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const createProduct = (productData: Partial<Product>): Product => {
  const newProduct: Product = {
    // Valores padrão para um novo produto
    id: `prod_${new Date().getTime()}`,
    name: "Novo Produto",
    description: "Descrição do novo produto",
    price: 99.9,
    discountPrice: 49.9,
    discountPercentage: 50,
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"],
    rating: 0,
    reviews: 0,
    soldCount: 0,
    category: "Categoria",
    deliveryInfo: {
      estimatedDays: "7-12",
      shippingCost: 0,
    },
    ...productData, // Sobrescreve padrões com dados fornecidos
  };
  
  const products = getProducts();
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const deleteProduct = (id: string): void => {
  let products = getProducts();
  const filteredProducts = products.filter((p) => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
};


// --- Funções de Review ---
// (Simplificado por enquanto, gerenciando todas as reviews juntas)

export const getReviews = (): Review[] => {
  const data = localStorage.getItem(REVIEWS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveReviews = (reviews: Review[]): void => {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};