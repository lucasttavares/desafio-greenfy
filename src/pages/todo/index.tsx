import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  Divider,
  Fab,
  Checkbox,
  Button,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Tooltip,
  createTheme,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GoPlus, GoSignOut } from "react-icons/go";
import { ptBR } from "@mui/x-data-grid/locales";
import { GoPaste, GoPencil, GoTrash, GoSun, GoMoon } from "react-icons/go";
import { TaskI } from "../../utils/types";
import ViewModal from "../../components/ViewModal";
import DeleteConfirm from "../../components/DeleteConfirm";
import EditModal from "../../components/EditModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Todo: React.FC = () => {
  const [task, setTask] = useState<TaskI | null>(null);
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => setOpenAddModal(false);

  const addTask = () => {
    const newTask: TaskI = {
      ...task,
      id: tasks.length !== 0 ? tasks.at(-1)!.id! + 1 : (task!.id = 1),
      status: false,
      createdAt: `${new Date().toLocaleDateString()} - ${new Date()
        .toLocaleTimeString()
        .slice(0, 5)}`,
    };
    if (
      task?.name === "" ||
      task?.description === "" ||
      task?.name === undefined ||
      task?.description === undefined
    ) {
      setAlert(true);
    } else {
      const updatedTasks: TaskI[] = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTask(null);
      handleAddModalClose();
    }
  };

  const handleViewModalOpen = (taskId: number) => {
    const task = tasks?.find((task) => task.id === taskId);
    setTask(task!);
    setOpenViewModal(true);
  };

  const handleViewModalClose = () => setOpenViewModal(false);

  const handleStatusChange = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAlertClose = () => setAlert(false);

  const handleDeleteConfirmOpen = (taskId: number) => {
    const task = tasks?.find((task) => task.id === taskId);
    setTask(task!);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirmClose = () => setOpenDeleteConfirm(false);

  const deleteTask = () => {
    if (task) {
      const updatedTasks: TaskI[] = tasks.filter(
        (taskId) => taskId.id !== task.id
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      handleDeleteConfirmClose();
    }
  };

  const handleEditModalOpen = (taskId: number) => {
    const task = tasks?.find((task) => task.id === taskId);
    setTask(task!);
    setEditName(task!.name!);
    setEditDescription(task!.description!);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => setOpenEditModal(false);

  const editTask = () => {
    const updatedTask = {
      ...task,
      name: editName,
      description: editDescription,
    };
    if (
      editName === "" ||
      editDescription === "" ||
      editName === undefined ||
      editDescription === undefined
    ) {
      setAlert(true);
    } else {
      const updatedTasks: TaskI[] = tasks.map((taskId) =>
        taskId.id === task?.id ? updatedTask : taskId
      );

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTask(null);
      handleEditModalClose();
    }
  };

  const signOut = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const columns: GridColDef[] = [
    {
      field: "status",
      headerName: "",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 65,
      maxWidth: 65,
      minWidth: 65,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => handleStatusChange(params.id as number)}
        />
      ),
    },
    { field: "id", headerName: "ID", width: 90, filterable: false },
    {
      field: "name",
      headerName: "Nome",
      width: 180,
      flex: 1,
      minWidth: 150,
    },
    { field: "createdAt", headerName: "Data de criação", width: 150 },
    {
      field: "",
      headerName: "Operações",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 120,
      maxWidth: 120,
      minWidth: 120,
      align: "center",
      renderCell: (params) => (
        <>
          <Tooltip title="Ver detalhes">
            <IconButton
              onClick={() => handleViewModalOpen(params.row.id)}
              color="secondary"
              size="small"
            >
              <GoPaste />
            </IconButton>
          </Tooltip>{" "}
          <Tooltip title="Editar tarefa">
            <IconButton
              onClick={() => {
                handleEditModalOpen(params.row.id);
              }}
              color="info"
              size="small"
            >
              <GoPencil />
            </IconButton>
          </Tooltip>{" "}
          <Tooltip title="Excluir tarefa">
            <IconButton
              onClick={() => handleDeleteConfirmOpen(params.row.id)}
              color="error"
              size="small"
            >
              <GoTrash />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? (storedTheme as "light" | "dark") : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <main
        className={currentTheme === "light" ? styles.main : styles.darkMain}
      >
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          className={styles.fab}
          onClick={handleAddModalOpen}
        >
          <GoPlus size={20} />
        </Fab>
        <Snackbar
          open={alert}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert severity="info" aria-label="close" onClick={handleAlertClose}>
            Insira todos os campos
          </Alert>
        </Snackbar>
        <div className={styles.todoContainer}>
          <div className={styles.title}>
            <h4>Desafio Técnico - Gerenciador de Tarefas</h4>
            <div>
              <Tooltip title="Alterar tema">
                <IconButton onClick={toggleTheme}>
                  {currentTheme === "light" ? <GoMoon /> : <GoSun />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Sair">
                <IconButton onClick={signOut}>
                  <GoSignOut />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <Divider />
          <div>
            <DataGrid
              localeText={ptBR.components?.MuiDataGrid.defaultProps.localeText}
              rows={tasks}
              columns={columns}
              autoHeight
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              rowSelection={false}
            />
          </div>
        </div>
        <Dialog open={openAddModal} onClose={handleAddModalClose}>
          <DialogTitle fontWeight={600} fontSize={16} width={400}>
            Adicionar nova tarefa
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              required
              label="Nome da tarefa"
              variant="filled"
              size="small"
              onChange={(e) => {
                setTask({ ...task, name: e.target.value });
              }}
            />
            <TextField
              required
              label="Descrição"
              variant="filled"
              size="small"
              multiline
              rows={5}
              onChange={(e) => {
                setTask({ ...task, description: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddModalClose}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={addTask}>
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
        <ViewModal
          task={task}
          open={openViewModal}
          handleClose={handleViewModalClose}
        />
        <DeleteConfirm
          task={task}
          open={openDeleteConfirm}
          handleConfirm={deleteTask}
          handleClose={handleDeleteConfirmClose}
        />
        <EditModal
          task={task}
          open={openEditModal}
          handleConfirm={editTask}
          handleClose={handleEditModalClose}
          setName={setEditName}
          setDescription={setEditDescription}
        />
      </main>
    </ThemeProvider>
  );
};

export default Todo;
