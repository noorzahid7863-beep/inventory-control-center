import { useMemo } from 'react';
import { useInventory } from '@/context/InventoryContext';

// Custom Hook for reusable inventory analytics logic
export function useInventoryAnalytics() {
  const { products } = useInventory();

  const analytics = useMemo(() => {
    const totalItems = products.length;
    const totalValue = products.reduce((acc, item) => acc + item.price, 0);
    const averagePrice = totalItems > 0 ? (totalValue / totalItems).toFixed(2) : '0';
    const categoriesCount = new Set(products.map((p) => p.category)).size;

    return {
      totalItems,
      totalValue,
      averagePrice,
      categoriesCount,
    };
  }, [products]);

  return analytics;
}