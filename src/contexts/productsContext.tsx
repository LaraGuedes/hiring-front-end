import React, { createContext, useContext, useState, ReactNode } from "react";


// O que é o contex api:


// Criei a interface para tipar os dados que irão vir da api 
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

// Criei a interface do Context type, para tipar as funções que ele possui e são acessadas externamente
// Somente o que adicione aqui é acessado de fora, isso gera segurança no sistema
interface ProductContextType {
  products: Product[]; //variável exposta
  changeQuantityInCard: (productId: string, valueToAdd: number) => void; //void - não retorna nada
  orderBy: (filter: string) => void;
  changeFavorite: (productId: string) => void;
  loadingProducts: () => void;
  listFavorits: () => Product[]; //lista
  listCart: () => Product[];
  searchByText: (text: string) => void
}


// Para garantir que o parametro irá existir
interface ProductProviderProps {
  children: ReactNode; //Children - passo toda aplicação que depende desse contexto
}

// Aqui crio o context e defino qual o type dele
// Para criar: createContext<type>(undefined) -- undefined = iniciar nulo
const ProductContext = createContext<ProductContextType | undefined>(undefined);

//  exporta o provider que sera utilizado no app.tsx
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]); //vou adicionando na lista ou removendo qual set o produto
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]); //Lista original gravada

  // Função 
  const changeQuantityInCard = (productId: string, valueToAdd: number) => {
    // findIndex - trás o index(posição na lista) de quando a condição for verdadeira
    const indexProduct = defaultProducts.findIndex((item) => item.id == productId);
    if (indexProduct >= 0) {
      defaultProducts[indexProduct].quantityInCard = (defaultProducts[indexProduct].quantityInCard ?? 0) + valueToAdd;
      // Usa os 3 pontinhos e o colchete e a lista dentro, porque desta forma cria uma niva lista, e o useState
      // observa mudança de uma variável quando o endereço de memória dela muda, e se você passa-se apenas a lista
      // o endereço continuaria sendo o mesmo, pois a lista é sempre referenciada pelo mesmo valor
      setDefaultProducts([...defaultProducts]); //Atualiza a lista alterada

      // Parte responsável por mudar o que será exibido na tela
      const indexProductListProducts = products.findIndex((item) => item.id == productId);
      products[indexProductListProducts].quantityInCard = defaultProducts[indexProduct].quantityInCard;
      setProducts([...products]); // setado aqui
    }

  };

  // Filtrar por nome
  const searchByText = (text: string) => {
    // filter - filtra
    const filtered = defaultProducts.filter((product) =>
      // Pega o nome que tem incluso o texto que passei
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProducts([...filtered]); //Aqui atualiza a lista que será exibida na tela
  };

  // Favoritos - listagem
  const listFavorits = () => {
    // Retorna todos que o favorite está marcado
    return defaultProducts.filter(element => element.isFavorite)
  }

  // Carrinho - listagem
  const listCart = () => {
    // lista todos os produtos que a quantidade no carrinho é maior que zero
    return defaultProducts.filter(element => (element.quantityInCard ?? 0) > 0)
  }

  // ordenar
  const orderBy = (filter: string) => {
    let sortedProducts = [...defaultProducts]; //Lista de backup
    switch (filter) {
      case 'az':
        // Sort - ordena
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
        // getTime - mostra a data do produto
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

  // Saber se o botão de favorito foi marcado
  const changeFavorite = (productId: string) => {
    const indexProduct = defaultProducts.findIndex((item) => item.id == productId);
    if (indexProduct < 0) return;

    // Ele atribui ao favoritos o valor invertido do que esta clicado
    // ! - inverte o valor
    defaultProducts[indexProduct].isFavorite = !defaultProducts[indexProduct].isFavorite;

    setDefaultProducts([...defaultProducts]); //atualiza a lista
    const indexProductListProducts = products.findIndex((item) => item.id == productId);
    if (indexProductListProducts < 0) return;

    // Atribui o valor da lista que já está invertido
    products[indexProductListProducts].isFavorite = defaultProducts[indexProduct].isFavorite;

    setProducts([...products]); // atualiza na tela
  }

  // Trazer os dados da api
  // async - assincrona - 
  const loadingProducts = async () => {
    // try - dá a possibilidade de ter o catch - tratativa de erro na função
    try {
      if(defaultProducts.length != 0){ // Olha se tem algo na lista
        // Se tiver atribui as variaveis e retorna, para não ficar chamando toda vez que mudar de página 
        // e já tiver os dados carregados
        setDefaultProducts([...defaultProducts]);
        setProducts([...defaultProducts]);
        return;
      }
      const url = "https://62d742f351e6e8f06f1a83da.mockapi.io/api/produtos";
      //fetch - chama a URL
      // Ela salva a resposta da chamada da API
      const response = await fetch(url);
      // Converte a resposta da API no formato json 
      // json - objeto
      const data = await response.json();
      const listItens = [];
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        // Trata os dados de cada produto
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
        // Adiciona o produto depois de tratado na lista
        listItens.push(product);
      }
      // Seta os valores 
      setDefaultProducts([...listItens])
      setProducts([...listItens])

      // catch - trata o erro = deu errado
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  return (
    // Provider - 
    // Passo todas as funções que deixei exposta, porque disse no tipo que passaria
    // E só consigo acessar em outras páginas se chamar elas
    <ProductContext.Provider value={{ changeQuantityInCard, products, orderBy, changeFavorite, loadingProducts, listFavorits, listCart, searchByText }}>
      {children} 
      {/* Passo os filhos para dentro */}
    </ProductContext.Provider>
  );
};

// Para não ter que chamar o context em todo lugar eu chamo essa função
// Vantagem - a regra fica toda em um lugar só
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductProvider");
  }
  return context;
};
