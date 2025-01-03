import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 8px;
`;
