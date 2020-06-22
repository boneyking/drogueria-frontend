import { Lote } from './lote.model';
import { Responsable } from './responsable.model';

export class Articulo{
  id?:string;
  codigoBarra: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  lote: Lote;
  responsable:Responsable;
  fechaCreacion: Date;
  fechaModificacion: Date;
}
