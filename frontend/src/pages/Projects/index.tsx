import { useState, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useProjects, type ProjectProps } from "../../hooks/useProjects";
import { AuthContext } from "../../contexts/AuthContext";

const statusOptions = [
  { value: "planejado", label: "Planejado" },
  { value: "em_andamento", label: "Em Andamento" },
  { value: "concluido", label: "Concluído" },
  { value: "cancelado", label: "Cancelado" },
];

export default function Projects() {
  const { projects, createProject, updateProject, loading } = useProjects();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectProps | null>(null);
  const [form, setForm] = useState<ProjectProps>({
    name: "",
    description: "",
    status: "",
    createdAt: "",
    endDate: "",
    createdBy: "",
    userId: undefined,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpen = (project?: ProjectProps) => {
    if (project) {
      setEditing(project);
      setForm({
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        endDate: project.endDate,
        createdBy: project.createdBy,
        userId: project.userId,
      });
    } else {
      setEditing(null);
      setForm({
        name: "",
        description: "",
        status: "",
        createdAt: new Date().toISOString(),
        endDate: "",
        createdBy: user?.fullname || "",
        userId: user?.id || undefined,
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing && editing.id) {
        await updateProject(editing.id, form);
        setSnackbar({
          open: true,
          message: "Projeto atualizado com sucesso!",
          severity: "success",
        });
      } else {
        await createProject(form);
        setSnackbar({
          open: true,
          message: "Projeto criado com sucesso!",
          severity: "success",
        });
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Ocorreu um erro ao salvar o projeto.",
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
    { field: "status", headerName: "Status", flex: 1 },
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
        <Typography variant="h5">Projetos</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => handleOpen()}
          sx={{ mb: 2 }}
        >
          Adicionar Projeto
        </Button>
      </div>
      <DataGrid
        rows={projects}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5]}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editing ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
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

          <FormControl fullWidth margin="dense" sx={{ mt: 1 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={form.status}
              label="Status"
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as string })
              }
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
