"use client";

import { useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/apiSlice";
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
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const drawerWidth = 240;

export default function AdminUsers() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users, isLoading, error } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    await updateUser(selectedUser);
    setOpenModal(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Foydalanuvchilar
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ism</TableCell>
              <TableCell>Familiya</TableCell>
              <TableCell>Yosh</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Harakatlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.second_name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(user)} color="primary">
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" gutterBottom>
            Foydalanuvchini tahrirlash
          </Typography>
          <TextField fullWidth label="Ism" margin="normal" value={selectedUser?.first_name || ""} onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} />
          <TextField fullWidth label="Familiya" margin="normal" value={selectedUser?.second_name || ""} onChange={(e) => setSelectedUser({ ...selectedUser, second_name: e.target.value })} />
          <TextField fullWidth label="Yosh" margin="normal" type="number" value={selectedUser?.age || ""} onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })} />
          <TextField fullWidth label="Email" margin="normal" value={selectedUser?.email || ""} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
          <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleCloseModal} variant="outlined">Bekor qilish</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Saqlash</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
