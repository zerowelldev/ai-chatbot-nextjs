import { create } from 'zustand';

interface ProductState {
  productId: string;
  productName: string;
  setProductId(productId: string): void;
  setProductName(productName: string): void;
  reset(): void;
}

export const useProductStore = create<ProductState>((set) => ({
  productId: '상품 선택',
  productName: '상품 선택',
  setProductId(productId) {
    set({ productId });
  },
  setProductName(productName) {
    set({ productName });
  },
  reset() {
    set({
      productId: '상품 선택',
    });
    set({
      productName: '상품 선택',
    });
  },
}));
