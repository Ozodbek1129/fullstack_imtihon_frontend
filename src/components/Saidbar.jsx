"use client";

import { useState } from "react";
import { useGetProductsQuery, useGetUserQuery } from "@/redux/apiSlice";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
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
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("users");

  const { data: users, isLoading: userLoading, error: userError } = useGetUserQuery();
  const { data: products, isLoading: productLoading, error: productError } = useGetProductsQuery();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleEdit = (id) => {
    alert(`Edit qilinmoqda: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`O'chirildi: ${id}`);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {[
          { text: "Foydalanuvchilar", icon: <PeopleIcon />, key: "users" },
          { text: "Mahsulotlar", icon: <ShoppingCartIcon />, key: "products" },
          { text: "Kategoriyalar", icon: <CategoryIcon />, key: "categories" },
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
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Button onClick={toggleDrawer(true)} variant="contained" className="m-4">
        Menuni ochish
      </Button>

      {/* Content */}
      <div className="ml-5 mt-5 w-full">
        {selectedMenu === "users" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Foydalanuvchilar</h2>
            {userLoading ? (
              <p>Yuklanmoqda...</p>
            ) : userError ? (
              <p>Xatolik yuz berdi</p>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Ism</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Harakatlar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(user.id)} color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(user.id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        )}

        {selectedMenu === "products" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Mahsulotlar</h2>
            {productLoading ? (
              <p>Yuklanmoqda...</p>
            ) : productError ? (
              <p>Xatolik yuz berdi</p>
            ) : (
              <TableContainer component={Paper}>
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
                    {products?.products?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(product.id)} color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(product.id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        )}

        {selectedMenu === "categories" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Kategoriyalar</h2>
            <p>Hozircha kategoriya ma'lumotlari mavjud emas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
