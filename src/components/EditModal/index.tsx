import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { EditModalI } from "../../utils/types";

const EditModal: React.FC<EditModalI> = ({
  task,
  open,
  handleConfirm,
  handleClose,
  setName,
  setDescription,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle fontWeight={600} fontSize={16} width={400}>
        Editar tarefa
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          defaultValue={task?.name}
          required
          label="Nome da tarefa"
          variant="filled"
          size="small"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          defaultValue={task?.description}
          required
          label="Descrição"
          variant="filled"
          size="small"
          multiline
          rows={5}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={handleConfirm}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
