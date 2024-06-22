import React from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ViewModalI } from "../../utils/types";

const ViewModal: React.FC<ViewModalI> = ({ task, open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        fontWeight={600}
        fontSize={16}
        width={400}
        justifyContent="space-between"
        display="flex"
      >
        <div>Tarefa: {task?.name}</div> <div>{`${task?.createdAt}`}</div>
      </DialogTitle>

      <DialogContent>
        <TextField multiline disabled fullWidth value={task?.description} />
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
