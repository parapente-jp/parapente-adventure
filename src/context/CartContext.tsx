'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: string;
    formulaId: string;
    formulaName: string;
    price: number;
    duration: string;
    options: { id: string; name: string; price: number }[];
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleOption: (itemId: string, option: { id: string; name: string; price: number }) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Charger depuis localStorage au montage
    useEffect(() => {
        const saved = localStorage.getItem('parapente-cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Sauvegarder dans localStorage à chaque changement
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('parapente-cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (item: Omit<CartItem, 'id' | 'quantity'>) => {
        const id = `${item.formulaId}-${item.options.map(o => o.id).join('-')}-${Date.now()}`;
        setItems(prev => [...prev, { ...item, id, quantity: 1 }]);
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleOption = (itemId: string, option: { id: string; name: string; price: number }) => {
        setItems(prev => prev.map(item => {
            if (item.id !== itemId) return item;
            const hasOption = item.options.some(o => o.id === option.id);
            return {
                ...item,
                options: hasOption
                    ? item.options.filter(o => o.id !== option.id)
                    : [...item.options, option]
            };
        }));
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = items.reduce((sum, item) => {
        const optionsPrice = item.options.reduce((s, o) => s + o.price, 0);
        return sum + (item.price + optionsPrice) * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            toggleOption,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
