import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product, useProducts } from "../../../contexts/productsContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    fontSize: "1rem",
    borderBottom: `2px solid ${theme.palette.divider}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.9rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableContainerNoBorder = styled(TableContainer)(() => ({
  boxShadow: "none",
}));


const TableCart: React.FC = () => {
  const { listCart, changeQuantityInCard } = useProducts()
  const [itensCart, setItensCart] = useState<Product[]>([]);
  const handleUpdateQuantity = (index: number, quantity: number) => {
    changeQuantityInCard(itensCart[index].id, quantity)

  }
  const totaly = (index: number) => {
    return itensCart[index].price * itensCart[index].quantityInCard;
  }

  useEffect(() => {
    setItensCart(listCart())
  }, [listCart])

  return (
    <TableContainerNoBorder>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Produto</StyledTableCell>
            <StyledTableCell align="center">Quantidade</StyledTableCell>
            <StyledTableCell align="center">Preço (R$)</StyledTableCell>
            <StyledTableCell align="center">Total (R$)</StyledTableCell>
            <StyledTableCell align="center">-</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itensCart.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton color="primary" onClick={() => handleUpdateQuantity(index, -1)}>
                  <RemoveIcon />
                </IconButton>
                {row.quantityInCard}
                <IconButton color="primary" onClick={() => handleUpdateQuantity(index, 1)}>
                  <AddIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.price.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {totaly(index).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton color="error" onClick={() => handleUpdateQuantity(index, -itensCart[index].quantityInCard)}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerNoBorder>
  );
};

export default TableCart;
