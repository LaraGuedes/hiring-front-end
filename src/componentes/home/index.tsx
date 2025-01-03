
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useProducts } from '../../contexts/productsContext';
import { useEffect } from 'react';
import { Container} from './style';

const HomePage = () => {
    const { products, loadingProducts } = useProducts()

    useEffect(() => {
        loadingProducts()
    }, [])
    return (
        <Box sx={{ fontFamily: 'Roboto, sans-serif' }}>

            <Box sx={{ my: 5, px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: '8px',
                            height: '32px',
                            backgroundColor: '#e07a5f',
                            borderRadius: '4px',
                            mr: 2,
                        }}
                    ></Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Nossa coleção
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        Produtos
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/main"
                        sx={{
                            backgroundColor: '#e07a5f',
                            color: '#fff',
                            fontWeight: 'bold',
                            borderRadius: '20px',
                            textTransform: 'none',
                        }}
                    >
                        Veja mais
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    {products.splice(0, 6)
                        .map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}
                            >
                                <Card
                                    sx={{
                                        borderRadius: '16px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        overflow: 'hidden',
                                    }}

                                >
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={products[index].avatar}
                                        alt={`Product ${index + 1}`}
                                    />
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" gutterBottom>
                                            {products[index].name}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            R$ {(products[index].price).toFixed(2).replace(".", ",")}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Box>


            <Box sx={{ px: 2, py: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: '8px',
                            height: '32px',
                            backgroundColor: '#e07a5f',
                            borderRadius: '4px',
                            mr: 2,
                        }}
                    ></Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Destaques
                    </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    Tendências
                </Typography>
            </Box>


             <Box sx={{ m: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper
            sx={{
              height: '530px',
              borderRadius: '50px',
              backgroundImage: 'url(/imagens/computador.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: 3,
            }}
          >
            <Container>
              <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 900 }} className='sobre'>
                Tecnologia Avançada
              </Typography>
            </Container>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <Paper
              sx={{
                backgroundColor: 'pink',
                height: '250px',
                borderRadius: '50px',
                mb: 3,
                backgroundImage: 'url(/imagens/comidas.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: 2,
              }}
            >
              <Container>
                <Typography variant="h5" sx={{  marginBottom: 2, fontWeight: 900 }} className='sobre'>
                  Comidas locais
                </Typography>
              </Container>
            </Paper>

            <Paper
              sx={{
                backgroundColor: 'blue',
                height: '250px',
                borderRadius: '50px',
                backgroundImage: 'url(/imagens/esporte.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: 2,
              }}
            >
              <Container>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 900 }} className='sobre'>
                  Tudo de esportes
                </Typography>
              </Container>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Paper
        sx={{
          backgroundColor: 'orange',
          width: '100%',
          mt: 3,
          height: '400px',
          borderRadius: '50px',
          backgroundImage: 'url(/imagens/moda.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ><Container>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 900 }} className='sobre'>
        Últimas tendência
      </Typography>
    </Container>
  </Paper>
    </Box>
        </Box>
    );
};

export default HomePage;
