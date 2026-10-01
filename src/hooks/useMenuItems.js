import { useState, useEffect } from "react";
import { listenToMenuItems } from "../firebase/menu";

export function useMenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToMenuItems((allItems) => {
      // Customers should only ever see items that are in stock and not hidden
      const availableItems = allItems.filter(
        (item) => !item.soldOut && item.stock > 0
      );
      setItems(availableItems);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { items, loading };
}