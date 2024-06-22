import React from "react";
import { DeleteConfirmI } from "../../utils/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteConfirm: React.FC<DeleteConfirmI> = ({
  task,
  open,
  handleConfirm,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle fontWeight={600} fontSize={16} width={400}>
        Tarefa: {task?.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir a tarefa?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          color="info"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          size="small"
          color="warning"
          onClick={handleConfirm}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
