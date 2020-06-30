import { InformacionContacto } from './informacion-contacto.model';
import { Responsable } from './responsable.model';
import { v4 as uuidv4 } from 'uuid';

export class Proveedor {
	id: string;
	nombre: string;
	rut: string;
	contactos: Array<InformacionContacto>;
	responsable: Responsable;
	fechaCreacion: Date;
	fechaModificacion: Date;

	constructor() {
		this.id = uuidv4();
		this.nombre = '';
		this.rut = '';
		this.contactos = new Array<InformacionContacto>();
		this.responsable = new Responsable();
		this.fechaCreacion = new Date();
		this.fechaModificacion = new Date();
	}
}
