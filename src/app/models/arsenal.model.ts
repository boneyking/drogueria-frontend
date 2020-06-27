import { ArsenalTipo } from '../enums/arsenal-tipo.enum';
import { Responsable } from './responsable.model';
import { v4 as uuidv4 } from 'uuid';

export class Arsenal {
	id: string;
	nombre: string;
	arsenalTipo: ArsenalTipo;
	responsable: Responsable;
	activo: boolean;
	fechaCreacion: Date;
	fechaModificacion: Date;

	constructor() {
		this.id = uuidv4();
		this.nombre = '';
		this.arsenalTipo = ArsenalTipo.Medicamento;
		this.responsable = new Responsable();
		this.activo = true;
		this.fechaCreacion = new Date();
		this.fechaModificacion = new Date();
	}
}
