import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useUpdateUserMutation } from '@/redux/apiSlice';

export default function ProfilEditModal({ isOpen, onClose, data }) {
  const [updateUser, { isLoading }] = useUpdateUserMutation(); 

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const updatedData = {
      ...formJson,
      age: parseInt(formJson.age, 10) || 0,
    };
    console.log("update", updatedData);
    try {
      await updateUser({ id: data.id, ...updatedData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Userni yangilashda xatolik:", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle sx={{ color: '#ff9800' }}>Profilni tahrirlash</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <TextField
            margin="dense"
            id="first_name"
            name="first_name"
            label="Ism"
            type="text"
            variant="outlined"
            size="small"
            defaultValue={data?.first_name || ''}
            sx={{ width: '300px' }}
          />
          <TextField
            margin="dense"
            id="second_name"
            name="second_name"
            label="Familiya"
            type="text"
            variant="outlined"
            size="small"
            defaultValue={data?.second_name || ''}
            sx={{ width: '300px' }}
          />
          <TextField
            margin="dense"
            id="age"
            name="age"
            label="Yosh"
            type="number"
            variant="outlined"
            size="small"
            defaultValue={data?.age || ''}
            sx={{ width: '300px' }}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            defaultValue={data?.email || ''}
            sx={{ width: '300px' }}
          />
          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Manzil"
            type="text"
            variant="outlined"
            size="small"
            defaultValue={data?.address || ''}
            sx={{ width: '300px' }}
          />
          <TextField
            margin="dense"
            id="phone_number"
            name="phone_number"
            label="Telefon raqam"
            type="tel"
            variant="outlined"
            defaultValue={data?.phone_number || ''}
            size="small"
            sx={{ width: '300px', height: "50px" }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', paddingBottom: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: '#d32f2f',
            color: 'white',
            '&:hover': { bgcolor: '#b71c1c' },
          }}
        >
          Bekor qilish
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            bgcolor: '#ff9800',
            color: 'white',
            '&:hover': { bgcolor: '#e68900' },
          }}
        >
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
