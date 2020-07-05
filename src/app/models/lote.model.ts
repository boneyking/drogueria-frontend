export class Lote{
  identificador: string;
  fechaVencimiento: Date;
  valorUnitario: number;
  cantidadEntrada: number;
  cantidadSalida: number;
  stock: number;

  constructor(){
	  this.identificador = '';
	  this.fechaVencimiento = new Date();
	  this.valorUnitario = 0;
	  this.cantidadEntrada = 0;
	  this.cantidadSalida = 0;
	  this.stock = 0;
  }
}
