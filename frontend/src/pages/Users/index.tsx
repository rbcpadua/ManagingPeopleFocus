import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useUsers } from "../../hooks/useUsers";
import type { UserProps } from "../../hooks/useUsers";

type ProfileProps = {
  id: number;
  name: string;
};

export default function Users() {
  const { users, createUser, updateUser, refreshUsers, loading } = useUsers();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProps | null>(null);
  const [form, setForm] = useState<UserProps>({
    fullname: "",
    email: "",
    role: "",
    document: "",
    login: "",
    password: "",
    profileId: undefined,
  });

  const [profiles, setProfiles] = useState<ProfileProps[]>([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/profiles");
        if (!response.ok) {
          throw new Error("Erro ao buscar perfis.");
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Falha ao carregar perfis:", error);
        setSnackbar({
          open: true,
          message: "Ocorreu um erro ao carregar os perfis.",
          severity: "error",
        });
      }
    };

    fetchProfiles();
  }, []);

  const handleOpen = (user?: UserProps) => {
    if (user) {
      setEditingUser(user);
      setForm({
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        document: user.document,
        login: user.login,
        password: user.password,
        profileId: user.profileId,
      });
    } else {
      setEditingUser(null);
      setForm({
        fullname: "",
        email: "",
        role: "",
        document: "",
        login: "",
        password: "",
        profileId: undefined,
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingUser && editingUser.id) {
        await updateUser(editingUser.id, form);
        setSnackbar({
          open: true,
          message: "Usuário atualizado com sucesso!",
          severity: "success",
        });
      } else {
        await createUser(form);
        setSnackbar({
          open: true,
          message: "Usuário criado com sucesso!",
          severity: "success",
        });
      }
      refreshUsers();
      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar o usuário:", error);
      setSnackbar({
        open: true,
        message: "Ocorreu um erro ao salvar o usuário.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "Nome Completo", flex: 1 },
    { field: "login", headerName: "Login", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    {
      field: "document",
      headerName: "Documento",
      flex: 1,
      renderCell: (params) => {
        const doc = params.value as string;
        if (!doc || doc.length !== 11) {
          return doc;
        }
        return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      },
    },
    { field: "role", headerName: "Cargo", flex: 1 },
    {
      field: "profileId",
      headerName: "Perfil",
      width: 120,
      renderCell: (params) => {
        const profile = profiles.find((p) => p.id === params.value);
        return profile ? profile.name : "N/A";
      },
    },
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
        <Typography variant="h5">Usuários</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => handleOpen()}
          sx={{ mb: 2 }}
        >
          Adicionar Usuário
        </Button>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5]}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingUser ? "Editar Usuário" : "Novo Usuário"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome Completo"
            fullWidth
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="E-mail"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Login"
            fullWidth
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Documento"
            fullWidth
            value={form.document}
            onChange={(e) => setForm({ ...form, document: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Senha"
            fullWidth
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Cargo"
            fullWidth
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <FormControl fullWidth margin="dense" sx={{ mt: 1 }}>
            <InputLabel id="profile-label">Perfil</InputLabel>
            <Select
              labelId="profile-label"
              value={form.profileId || ""}
              label="Perfil"
              onChange={(e) =>
                setForm({ ...form, profileId: e.target.value as number })
              }
            >
              {profiles.map((profile) => (
                <MenuItem key={profile.id} value={profile.id}>
                  {profile.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
