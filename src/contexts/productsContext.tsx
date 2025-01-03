import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  avatar: string;
  desciption: string;
  price: number;
  createdAt: string;
  isFavorite: boolean;
  quantityInCard: number;
};

interface ProductContextType {
  products: Product[];
  changeQuantityInCard: (productId: string, valueToAdd: number) => void;
  orderBy: (filter: string) => void;
  changeFavorite: (productId: string) => void;
  loadingProducts: () => void;
  listFavorits: () => Product[];
  listCart: () => Product[];
  searchByText: (text: string) => void
}

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);

  const changeQuantityInCard = (productId: string, valueToAdd: number) => {
    const indexProduct = defaultProducts.findIndex((item) => item.id == productId);
    if (indexProduct >= 0) {
      defaultProducts[indexProduct].quantityInCard = (defaultProducts[indexProduct].quantityInCard ?? 0) + valueToAdd;
      setDefaultProducts([...defaultProducts]);
      const indexProductListProducts = products.findIndex((item) => item.id == productId);
      products[indexProductListProducts].quantityInCard = defaultProducts[indexProduct].quantityInCard;
      setProducts([...products]);
    }

  };

  const searchByText = (text: string) => {
    const filtered = defaultProducts.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProducts([...filtered]);
  };

  const listFavorits = () => {
    return defaultProducts.filter(element => element.isFavorite)
  }

  const listCart = () => {
    return defaultProducts.filter(element => (element.quantityInCard ?? 0) > 0)
  }

  const orderBy = (filter: string) => {
    let sortedProducts = [...defaultProducts];
    switch (filter) {
      case 'az':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'asc':
        sortedProducts.sort((a, b) => a.price - (b.price));
        break;
      case 'desc':
        sortedProducts.sort((a, b) => (b.price) - (a.price));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'lastest':
        sortedProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }
    setProducts([...sortedProducts]);
  };

  const changeFavorite = (productId: string) => {
    const indexProduct = defaultProducts.findIndex((item) => item.id == productId);
    if (indexProduct < 0) return;
    defaultProducts[indexProduct].isFavorite = !defaultProducts[indexProduct].isFavorite;
    setDefaultProducts([...defaultProducts]);
    const indexProductListProducts = products.findIndex((item) => item.id == productId);
    if (indexProductListProducts < 0) return;
    products[indexProductListProducts].isFavorite = defaultProducts[indexProduct].isFavorite;
    setProducts([...products]);
  }

  const loadingProducts = async () => {
    try {
      if(defaultProducts.length != 0){
        setDefaultProducts([...defaultProducts]);
        setProducts([...defaultProducts]);
        return;
      }
      const url = "https://62d742f351e6e8f06f1a83da.mockapi.io/api/produtos";
      const response = await fetch(url);
      const data = await response.json();
      const listItens = [];
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const product = {
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          desciption: item.desciption,
          price: parseFloat(item.price),
          createdAt: item.createdAt,
          isFavorite: false,
          quantityInCard: 0,
        }
        listItens.push(product);
      }
      setDefaultProducts([...listItens])
      setProducts([...listItens])
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  return (
    <ProductContext.Provider value={{ changeQuantityInCard, products, orderBy, changeFavorite, loadingProducts, listFavorits, listCart, searchByText }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
