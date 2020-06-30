import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Validadores } from 'src/app/utils/validadores';
import { UtilsService } from 'src/app/services/utils.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { RequestPaginada } from 'src/app/models/requests/request-paginada.model';
import { Proveedor } from 'src/app/models/proveedor.model';

@Component({
	selector: 'app-recepcion-articulos',
	templateUrl: './recepcion-articulos.component.html',
	styleUrls: ['./recepcion-articulos.component.scss'],
})
export class RecepcionArticulosComponent implements OnInit {
	public formularioRecepcion: FormGroup;
	public listadoProveedores: Array<Proveedor>;

	constructor(
		private formBuilder: FormBuilder,
		private ngxLoaderService: NgxUiLoaderService,
		private notificacionesService: NotificacionesService,
		private utilsService: UtilsService,
		private proveedorService: ProveedorService
	) {}

	ngOnInit(): void {
		this.inicializarFormulario();
		this.listadoProveedores = new Array<Proveedor>();
	}

	inicializarFormulario(): void {
		this.formularioRecepcion = this.formBuilder.group({
			// fechaIngreso: new FormControl(null, [Validators.required]), // fecha actual y hora
			nombreProveedor: new FormControl(null, [Validators.required, Validators.minLength(3)]),
			rutProveedor: new FormControl(null, [Validators.required, Validators.minLength(1), Validadores.rutValido]),
			documentoTipo: new FormControl(null, [Validators.required]),
			identificadorDocumento: new FormControl(null, [Validators.required]),
			origen: new FormControl(null, [Validators.required]),
			// montoTotal: new FormControl(null), // se genera de la suma de los valores netos y el iva
			codigoBarraArticulo: new FormControl(null, [Validators.required]),
			descripcionArticulo: new FormControl(null, [Validators.required]),
			cantidadArticulo: new FormControl(null, [Validators.required]),
			identificadorLoteArticulo: new FormControl(null, [Validators.required]),
			fechaVencimientoArticulo: new FormControl(null, [Validators.required]),
			valorUnitarioArticulo: new FormControl(null, [Validators.required]),
		});
	}

	buscarProveedorPorRut(event: any): void {
		this.formularioRecepcion.controls.nombreProveedor.setValue('');
		this.listadoProveedores = new Array<Proveedor>();
		if (event.target.value.length > 0) {
			Promise.resolve(this.proveedorService.buscarProveedorPorRut(event.target.value)).then((res) => {
				res.items.forEach((proveedor) => {
					this.listadoProveedores.push(proveedor);
				});
			});
		}
	}

	buscarProveedorPorNombre(event: any): void {
		this.formularioRecepcion.controls.rutProveedor.setValue('');
		this.listadoProveedores = new Array<Proveedor>();
		if (event.target.value.length > 0) {
			Promise.resolve(this.proveedorService.buscarProveedorPorNombre(event.target.value)).then((res) => {
				res.items.forEach((proveedor) => {
					this.listadoProveedores.push(proveedor);
				});
			});
		}
	}

	opcionSeleccionada(event: string, busquedaPor: string): void{
		if(busquedaPor ==='rut'){
			const proveedor = this.listadoProveedores.find(element => {
				return element.rut = event;
			});
			this.formularioRecepcion.controls.nombreProveedor.setValue(proveedor.nombre);
		} else if(busquedaPor === 'nombre'){
			const proveedor = this.listadoProveedores.find(element => {
				return element.nombre === event;
			});
			this.formularioRecepcion.controls.rutProveedor.setValue(proveedor.rut);
		}

	}

	submit(): void {}
}
