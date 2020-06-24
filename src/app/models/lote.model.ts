export class Lote{
  id?:string;
  identificador: string;
  fechaVencimiento: Date;

  constructor(){
	  this.id = '';
	  this.identificador = '';
	  this.fechaVencimiento = new Date();
  }
}
