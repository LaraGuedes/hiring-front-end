import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const Container = styled.div`
  height: 100%;
  display: flex;
      flex-direction: column;
  justify-content: flex-end;
      align-items: flex-end;
          padding: 20px;

    .sobre{
        color: white;
        font-size: 30px;}

`;

export const Title = styled(Typography)`
  color: black;
  padding: 20px;
`;

export const Description = styled(Typography)`
  color: black;
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 0 20px;
`;
