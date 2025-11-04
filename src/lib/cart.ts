import { CartItem } from "@/types/product";
import Cookies from "js-cookie";

const CART_COOKIE_NAME = "shopping_cart";

export const getCart = (): CartItem[] => {
  const cartData = Cookies.get(CART_COOKIE_NAME);
  if (!cartData) return [];
  try {
    return JSON.parse(cartData);
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), { expires: 7 });
};

export const addToCart = (item: CartItem): void => {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (cartItem) =>
      cartItem.product.id === item.product.id &&
      cartItem.variant?.id === item.variant?.id
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
};

export const removeFromCart = (productId: string, variantId?: string): void => {
  const cart = getCart();
  const filtered = cart.filter(
    (item) =>
      !(
        item.product.id === productId &&
        (variantId ? item.variant?.id === variantId : true)
      )
  );
  saveCart(filtered);
};

export const updateCartQuantity = (
  productId: string,
  quantity: number,
  variantId?: string
): void => {
  const cart = getCart();
  const item = cart.find(
    (cartItem) =>
      cartItem.product.id === productId &&
      (variantId ? cartItem.variant?.id === variantId : true)
  );

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
};

export const clearCart = (): void => {
  Cookies.remove(CART_COOKIE_NAME);
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce(
    (total, item) => total + item.product.discountPrice * item.quantity,
    0
  );
};

export const getCartItemsCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
