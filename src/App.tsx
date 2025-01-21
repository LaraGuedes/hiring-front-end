import { createGlobalStyle } from "styled-components";
import Main from "./componentes/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCart from "./componentes/shoppingCart";
import { ProductProvider } from "./contexts/productsContext";
import HomePage from "./componentes/home";
import HeaderNavegate from "./componentes/headerNavegate";
import Header from "./componentes/header";
import Footer from "./componentes/footer";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: "Epilogue", sans-serif;
  }
`;

function App() {
  return (
    <ProductProvider> 
      {/* Tudo aqui dentro é um children do productProvider (pai dele) e com isso 
      o filho pode acessar todas as variáveis e funções expostas do context em qualquer filho (páginas)*/}
      <GlobalStyle />
      {/* Passa o router aqui para navegação */}
      <BrowserRouter>
        <Routes >
        <Route path="/" element={
          <>
            <Header />
            <HomePage />
          </>
          } />
          <Route path="/main" element={
            <>
              <HeaderNavegate />
              <Main />
            </>
            
          } />
          <Route path="/carrinho" element={<ShoppingCart/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ProductProvider>
  );
}

export default App;
