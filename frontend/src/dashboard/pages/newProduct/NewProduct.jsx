import React from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function NewProduct() {
  return (
    <div className="newProduct">
      <Typography variant="h1" className="addProductTitle">New Product</Typography>
      <form action="" className="addProductForm">
        {/* Vos champs de formulaire */}
      </form>

      {/* Utilisez les composants Material-UI pour le tableau */}
      <TableContainer component={Paper} className="m-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Exemple de ligne pour la démonstration */}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Sample Product</TableCell>
              <TableCell>
                <Button variant="contained" color="error" className="m-2">Delete</Button>
                <Button variant="contained" color="primary">Modify</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NewProduct;
