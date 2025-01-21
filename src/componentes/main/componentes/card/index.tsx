import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Checkbox, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import InfoModal from '../modal';
import { Product } from '../../../../contexts/productsContext';
import {CardActionsStyled, CardContentStyled}  from './styled';

interface MediaCardProps {
  product: Product;
  onFavoriteToggle: (product: Product) => void;
  onAddToCardToggle: (product: Product) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ product, onFavoriteToggle, onAddToCardToggle }) => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  // Chama a função para favoritar o produto
  const handleFavoriteToggle = () => {
    onFavoriteToggle(product);
  };

  // Chama a função para adicionar o carrinho
  const handleAddToCard = () => {
    onAddToCardToggle(product);
  };

  // Abre o modal de informação
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia sx={{ height: 140 }} image={product.avatar} title={product.name} />
        <CardContentStyled >
          <div className="name-price">
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" className='price'>
              R$ {product.price.toFixed(2).replace(".", ",")}
            </Typography>
          </div>
        </CardContentStyled >
        <CardActionsStyled >
          <Checkbox
            checked={product.isFavorite}
            onChange={handleFavoriteToggle}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />

          <Checkbox
            checked={(product.quantityInCard ?? 0) > 0}
            onChange={handleAddToCard}
            icon={<AddShoppingCartIcon />}
            checkedIcon={<ShoppingCart />}
          />
          <IconButton aria-label="info" onClick={handleModalOpen}>
            <InfoIcon />
          </IconButton>
        </CardActionsStyled>
      </Card>
      <InfoModal
        open={isModalOpen}
        onClose={handleModalClose}
        productName={product.name}
        description={product.desciption}
      />
    </>
  );
};

export default MediaCard;
