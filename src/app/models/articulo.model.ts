import { Lote } from './lote.model';
import { Responsable } from './responsable.model';

export class Articulo {
	id?: string;
	codigoBarra: string;
	nombre: string;
	descripcion: string;
	cantidad: number;
	lote: Lote;
	responsable: Responsable;
	fechaCreacion: Date;
	fechaModificacion: Date;

	constructor() {
		this.id = '';
		this.codigoBarra = '';
		this.nombre = '';
		this.descripcion = '';
		this.cantidad = 0;
		this.lote = new Lote();
		this.responsable = new Responsable();
		this.fechaCreacion = new Date();
		this.fechaModificacion = new Date();
	}
}
