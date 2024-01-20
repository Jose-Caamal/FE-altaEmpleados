import { Cargo } from "./cargo";

export interface Empleado {
  id?: number;
  nombreCompleto: string;
  edad: number;
  fechaNacimiento: Date;
  estatus: boolean;
  idCargo: number;
  cargo: Cargo;
}
