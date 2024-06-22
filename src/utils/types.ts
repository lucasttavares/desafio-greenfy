import { ReactNode } from "react";

export interface TaskI {
  id?: number;
  name?: string;
  description?: string;
  status?: boolean;
  createdAt?: Date | string;
}

export interface ViewModalI {
  open: boolean;
  handleClose: () => void;
  task: TaskI | null;
}

export interface DeleteConfirmI extends ViewModalI {
  handleConfirm: () => void;
}

export interface EditModalI extends ViewModalI {
  handleConfirm: () => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
}

export interface PrivateRouteI {
  children: ReactNode;
}

export interface PublicRouteI {
  children: ReactNode;
}

export interface UserI {
  email?: string;
  password?: string;
}
