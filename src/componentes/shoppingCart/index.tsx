import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import TableCart from "./table";
import { useProducts } from "../../contexts/productsContext";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import HeaderNavegate from "../headerNavegate";
import { StyledLink, Container, StyledIconButton } from './style';

const ShoppingCart: React.FC = () => {
  const { listCart, changeQuantityInCard } = useProducts()
  const [totally, setTotally] = useState<number>(0)

  // Reduce:
  // let sum = 0
  // for (let index = 0; index < listCart().length; index++) {
  //   const product = listCart()[index];
  //   sum = sum + (product.price * product.quantityInCard)
  // }
  // return sum

  // Soma o valor total
  useEffect(() => {
    setTotally(listCart().reduce((sum, product) => sum + (product.price * product.quantityInCard), 0))
  }, [listCart, changeQuantityInCard])

  return (
    <>
      <HeaderNavegate/>
      <Container>
      <StyledLink to="/main">
        <StyledIconButton>
          <ArrowLeftIcon />
        </StyledIconButton>
        Retornar a página de produtos
      </StyledLink>
    </Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: 4, 
        "@media (max-width: 768px)": {
          display: "block", 
          padding: 2, 
    },
      }}>
        <Box sx={{ flex: 3, marginRight: 2 }}>
          <Typography variant="h5" gutterBottom>
            Seu Carrinho
          </Typography>
          <TableCart />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Resumo da compra
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Sub-total</Typography>
              <Typography>R$ {totally.toFixed(2).replace(".", ",")}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Frete</Typography>
              <Typography>Grátis</Typography>
            </Box>
            <Typography
              sx={{ color: "green", cursor: "pointer", textDecoration: "underline" }}
            >
              Adicionar cupom de desconto
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                padding: 1,
                borderRadius: 1,
              }}
            >
              <Typography>Total</Typography>
              <Typography>R$ {totally.toFixed(2).replace(".", ",")}</Typography>
            </Box>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "100%",
                padding: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              FINALIZAR COMPRA
            </Button>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ShoppingCart;
