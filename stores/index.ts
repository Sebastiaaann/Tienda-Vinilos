import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const state = get();
        const existingItem = state.items.find((item) => item.id === newItem.id);
        
        set((state) => {
          if (existingItem) {
            toast.success('Cantidad actualizada', {
              description: `${newItem.name} - Nueva cantidad: ${existingItem.quantity + 1}`
            });
            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          toast.success('Producto agregado al carrito', {
            description: newItem.name
          });
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });
      },
      removeItem: (id) => {
        const item = get().items.find((item) => item.id === id);
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
        if (item) {
          toast.success('Producto eliminado del carrito', {
            description: item.name
          });
        }
      },
      updateQuantity: (id, quantity) => {
        const item = get().items.find((item) => item.id === id);
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
        if (item) {
          toast.success('Cantidad actualizada', {
            description: `${item.name} - Nueva cantidad: ${quantity}`
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
