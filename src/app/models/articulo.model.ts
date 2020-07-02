import { Lote } from './lote.model';
import { Responsable } from './responsable.model';
import { Arsenal } from './arsenal.model';

export class Articulo {
	id: string;
	codigoBarra: string;
	arsenal: Arsenal;
	lote: Lote;
	activo: boolean;
	responsable: Responsable;
	fechaCreacion: Date;
	fechaModificacion: Date;

	constructor() {
		this.id = '';
		this.codigoBarra = '';
		this.arsenal = new Arsenal();
		this.lote = new Lote();
		this.activo = true;
		this.responsable = new Responsable();
		this.fechaCreacion = new Date();
		this.fechaModificacion = new Date();
	}
}
