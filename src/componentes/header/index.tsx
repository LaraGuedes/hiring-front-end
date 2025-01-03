import { PageWrapper, HeaderWrapper, HeroSection, Title, Subtitle, LogoImage } from "./style";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { Product, useProducts } from "../../contexts/productsContext";
import Typography from "@mui/material/Typography/Typography";
import SellIcon from '@mui/icons-material/Sell';



const Header: React.FC = () => {
  const { listFavorits, changeFavorite } = useProducts()
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setFavorites(listFavorits())
    setOpenDrawer(!openDrawer);
  };

  const handleFavoriteToggle = (product: Product) => {
    changeFavorite(product.id);
    setFavorites(listFavorits())
  };


  return (
    <PageWrapper>
      <HeaderWrapper>
        <Link to="/" style={{ textDecoration: "none" }} ><LogoImage src='/imagens/log.png' alt="Logo" /></Link>
       
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction
                component={Link}
                to="/main"
              label="Produtos"
              icon={<SellIcon />}
            />
            <BottomNavigationAction
              label="Favoritos"
              icon={<FavoriteIcon />}
              onClick={toggleDrawer}
            />
            <BottomNavigationAction
              label="Carrinho"
              onClick={() => navigate("/carrinho")}
              icon={<ShoppingCartIcon />}
            />
          </BottomNavigation>
        </Box>

        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer} aria-label="Favoritos">
        <Typography 
          variant="h6" 
          gutterBottom 
          style={{ 
            fontWeight: 600, 
            fontSize: '1.25rem', 
            textAlign: 'center', 
            color: '#444', 
            marginBottom: '1rem' 
          }}
        >
          Meus Favoritos
        </Typography>
          <div role="presentation" style={{ width: 250 }}>
            <List>
              {favorites.map((favorite, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={favorite.name}
                    secondary={`Preço: ${favorite.price}`}
                  />
                  <IconButton onClick={() => { handleFavoriteToggle(favorite) }}>
                    <Favorite />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </HeaderWrapper>

    <HeroSection>
        <Title>Encontre Tudo o que Você Precisa!</Title>
        <Subtitle>
            Na nossa loja, você encontra uma variedade incrível de produtos para todos os gostos e necessidades.
        </Subtitle>
      </HeroSection>
    </PageWrapper>
  );
};

export default Header;
