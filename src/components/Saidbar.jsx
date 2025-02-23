"use client";

import { useState } from "react";
import { useGetProductsQuery, useGetUserQuery } from "@/redux/apiSlice";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import EditProductModal from "./EditProduct";
import EditUserModal from "./EditUser";

const drawerWidth = 240;

export default function AdminLayout() {
  const [selectedMenu, setSelectedMenu] = useState("users");
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users, isLoading: userLoading, error: userError } = useGetUserQuery();
  const { data: products, isLoading: productLoading, error: productError } = useGetProductsQuery();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setOpenProductModal(true);
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setOpenUserModal(true);
  };

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          backgroundColor: "#f4f4f4",
          p: 2,
          borderRight: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Admin Panel
        </Typography>
        <List>
          {[
            { text: "Foydalanuvchilar", icon: <PeopleIcon />, key: "users" },
            { text: "Mahsulotlar", icon: <ShoppingCartIcon />, key: "products" },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(item.key)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Table content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Mahsulotlar jadvali */}
        {selectedMenu === "products" && products && (
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mahsulotlar
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nomi</TableCell>
                  <TableCell>Narxi</TableCell>
                  <TableCell>Harakatlar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditProductClick(product)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => alert(`Delete: ${product.id}`)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Foydalanuvchilar jadvali */}
        {selectedMenu === "users" && users && (
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Foydalanuvchilar
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Ism</TableCell>
                  <TableCell>Familiya</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Yosh</TableCell>
                  <TableCell>Harakatlar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.second_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditUserClick(user)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => alert(`Delete: ${user.id}`)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Modallar */}
      <EditProductModal open={openProductModal} handleClose={handleCloseProductModal} product={selectedProduct} />
      <EditUserModal open={openUserModal} handleClose={handleCloseUserModal} user={selectedUser} />
    </Box>
  );
}
