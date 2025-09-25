import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useProfiles, type ProfileProps } from "../../hooks/useProfiles";

export default function Profiles() {
  const { profiles, createProfiles, updateProfiles, loading } = useProfiles();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProfileProps | null>(null);
  const [form, setForm] = useState<ProfileProps>({ name: "", description: "" });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpen = (profile?: ProfileProps) => {
    if (profile) {
      setEditing(profile);
      setForm({ name: profile.name, description: profile.description });
    } else {
      setEditing(null);
      setForm({ name: "", description: "" });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing && editing.id) {
        await updateProfiles(editing.id, form);
        setSnackbar({
          open: true,
          message: "Perfil atualizado com sucesso!",
          severity: "success",
        });
      } else {
        await createProfiles(form);
        setSnackbar({
          open: true,
          message: "Perfil criado com sucesso!",
          severity: "success",
        });
      }
      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
      setSnackbar({
        open: true,
        message: "Ocorreu um erro ao salvar o perfil.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "600px",
        width: "100%",
        padding: 2,
      }}
    >
      <div className="headerPage">
        <Typography variant="h5">Perfil</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => handleOpen()}
          sx={{ mb: 2 }}
        >
          Adicionar Perfil
        </Button>
      </div>
      <DataGrid
        rows={profiles}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5]}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editing ? "Editar Perfil" : "Novo Perfil"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
