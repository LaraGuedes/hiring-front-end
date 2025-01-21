import React, { useEffect } from "react";
import MediaCard from "./componentes/card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import { Product, useProducts } from "../../contexts/productsContext";

const Main: React.FC = () => {
  const { orderBy, changeFavorite, products, loadingProducts, changeQuantityInCard } = useProducts()

  // Organiza os produtos na tela conforme for passado
  const handleChange = (event: SelectChangeEvent) => {
    orderBy(event.target.value.toString());
  };

  // Pega o id do produto que cliquei no botão favoritos e favorita
  const handleFavoriteToggle = (id: string) => {
    changeFavorite(id);
  };

  // Pega o id de quando cliquei oara adicionar no carrinho e adiciona no carrinho
  const handleAddInCardToggle = (product: Product) => {
    changeQuantityInCard(product.id, 1);
  };

  useEffect(() => {
    loadingProducts()
  }, [])

  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            Coleção
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Possuimos a maior variedade de produtos do mercado
          </Typography>
        </div>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Selecionar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Selecionar"
            onChange={handleChange}
          >
            <MenuItem value="">Selecionar</MenuItem>
            <MenuItem value="az">Alfabéticamente A-Z</MenuItem>
            <MenuItem value="za">Alfabéticamente Z-A</MenuItem>
            <MenuItem value="asc">Valor crescente</MenuItem>
            <MenuItem value="desc">Valor decrescente</MenuItem>
            <MenuItem value="newest">Mais recentes</MenuItem>
            <MenuItem value="lastest">Mais antigos</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={3} sx={{ marginTop: "1.5rem" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
              <MediaCard
                product={product}
                onFavoriteToggle={() => handleFavoriteToggle(product.id)}
                onAddToCardToggle={() => handleAddInCardToggle(product)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Carregando...
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Main;
