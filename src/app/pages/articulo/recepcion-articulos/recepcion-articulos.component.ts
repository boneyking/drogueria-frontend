import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Validadores } from 'src/app/utils/validadores';
import { UtilsService } from 'src/app/services/utils.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { RespuestaArticulo } from 'src/app/models/responses/respuesta-articulo.model';
import { Arsenal } from 'src/app/models/arsenal.model';
import { ArsenalService } from 'src/app/services/arsenal.service';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { RespuestaPaginada } from 'src/app/models/responses/respuesta-paginada.model';
import { EMPTY } from 'rxjs';

@Component({
	selector: 'app-recepcion-articulos',
	templateUrl: './recepcion-articulos.component.html',
	styleUrls: ['./recepcion-articulos.component.scss'],
})
export class RecepcionArticulosComponent implements OnInit {
	public formularioRecepcion: FormGroup;
	public listadoProveedoresPorRut: Observable<Array<Proveedor>>;
	public listadoProveedoresPorNombre: Observable<Array<Proveedor>>;
	public listadoProveedores: Array<Proveedor>;
	public listadoArsenalPorNombre: Observable<Array<Arsenal>>;
	public listadoArsenal: Array<Arsenal>;
	public existeArsenal = false;
	public fechaMinima = new Date();

	constructor(
		private formBuilder: FormBuilder,
		private ngxLoaderService: NgxUiLoaderService,
		private proveedorService: ProveedorService,
		private articuloService: ArticuloService,
		private arsenalService: ArsenalService,
		private notificacionesService: NotificacionesService
	) {}

	ngOnInit(): void {
		this.listadoArsenal = new Array<Arsenal>();
		// this.listadoProveedores = new Array<Proveedor>();
		this.inicializarFormulario();
	}

	inicializarFormulario(): void {
		this.formularioRecepcion = this.formBuilder.group({
			// fechaIngreso: new FormControl(null, [Validators.required]), // fecha actual y hora
			nombreProveedor: new FormControl(null, [Validators.required, Validators.minLength(3)]),
			rutProveedor: new FormControl(null, [Validators.required, Validators.minLength(1), Validadores.rutValido]),
			documentoTipo: new FormControl('Factura', [Validators.required]),
			identificadorDocumento: new FormControl(null, [Validators.required]),
			origen: new FormControl('Cenabast', [Validators.required]),
			// montoTotal: new FormControl(null), // se genera de la suma de los valores netos y el iva
			codigoBarraArticulo: new FormControl(null, [Validators.required]),
			descripcionArticulo: new FormControl(null, [Validators.required]),
			cantidadArticulo: new FormControl(null, [Validators.required, Validators.min(1)]),
			identificadorLoteArticulo: new FormControl(null, [Validators.required]),
			fechaVencimientoArticulo: new FormControl((new Date()).toISOString(), [Validators.required]),
			valorUnitarioArticulo: new FormControl('1', [Validators.required, Validators.min(1)]),
		});

		this.listadoProveedoresPorRut = this.formularioRecepcion.get('rutProveedor').valueChanges.pipe(
			debounceTime(300),
			switchMap((value) => this.buscarProveedorPorRut(value))
		);

		this.listadoProveedoresPorNombre = this.formularioRecepcion.get('nombreProveedor').valueChanges.pipe(
			debounceTime(300),
			switchMap((value) => this.buscarProveedorPorNombre(value))
		);

		this.listadoArsenalPorNombre = this.formularioRecepcion.get('descripcionArticulo').valueChanges.pipe(
			debounceTime(300),
			switchMap((value) => this.buscarArsenalPorNombre(value))
		);
	}

	buscarProveedorPorRut(event: any): Observable<Array<Proveedor>> {
		this.listadoProveedores = new Array<Proveedor>();
		if (event.length > 0) {
			return from(this.proveedorService.buscarProveedorPorRut(event)).pipe(
				map((res: RespuestaPaginada<Proveedor>) => {
					this.listadoProveedores = res.items;
					return res.items;
				})
			);
		} else {
			return from(this.proveedorService.buscarProveedorPorRut('6')).pipe(
				map((res: RespuestaPaginada<Proveedor>) => {
					this.listadoProveedores = res.items;
					return res.items;
				})
			);
		}
	}

	buscarProveedorPorNombre(event: any): Observable<Array<Proveedor>> {
		this.listadoProveedores = new Array<Proveedor>();
		if (event.length > 0) {
			return from(this.proveedorService.buscarProveedorPorNombre(event)).pipe(
				map((res: RespuestaPaginada<Proveedor>) => {
					this.listadoProveedores = res.items;
					return res.items;
				})
			);
		} else {
			return from(this.proveedorService.buscarProveedorPorNombre('a')).pipe(
				map((res: RespuestaPaginada<Proveedor>) => {
					this.listadoProveedores = res.items;
					return res.items;
				})
			);
		}
	}

	buscarArsenalPorNombre(event: any): Observable<Array<Arsenal>> {
		this.existeArsenal = false;
		this.listadoArsenal = new Array<Arsenal>();
		if (event.length > 0) {
			return from(this.arsenalService.buscarArsenalPorNombre(event)).pipe(
				map((res: RespuestaPaginada<Arsenal>) => {
					if (res.items.length === 0) {
						this.notificacionesService.mostrarMensaje(
							'error',
							'Arsenal no encontrado',
							`No existe el arsenal: ${event}`
						);
						this.formularioRecepcion.controls.descripcionArticulo.setValue('');
					}
					this.listadoArsenal = res.items;
					return res.items;
				})
			);
		} else {
			return from(this.arsenalService.buscarArsenalPorNombre('a')).pipe(
				map((res: RespuestaPaginada<Arsenal>) => {
					this.listadoArsenal = res.items;
					return res.items;
				})
			);
		}
	}

	opcionSeleccionada(event: string, busquedaPor: string): void {
		if (busquedaPor === 'rut') {
			const proveedorEncontrado = this.listadoProveedores.find((proveedor: Proveedor) => {
				return (proveedor.rut = event);
			});
			this.formularioRecepcion.controls.nombreProveedor.setValue(proveedorEncontrado.nombre);
		} else if (busquedaPor === 'nombre') {
			const proveedorEncontrado = this.listadoProveedores.find((proveedor: Proveedor) => {
				return proveedor.nombre === event;
			});
			this.formularioRecepcion.controls.rutProveedor.setValue(proveedorEncontrado.rut);
		}
	}

	verificarExistenciaCodigoBarra(event: any): void {
		if (event.target.value.length > 5) {
			this.ngxLoaderService.start();
			this.articuloService
				.verificarExistenciaCodigoBarra(event.target.value)
				.then((res: RespuestaArticulo) => {
					if (res.articulo !== null) {
						this.formularioRecepcion.controls.codigoBarraArticulo.setValue(res.articulo.codigoBarra);
						this.formularioRecepcion.controls.descripcionArticulo.setValue(res.articulo.arsenal.nombre);
					}
					this.ngxLoaderService.stop();
				})
				.catch((error) => {
					this.ngxLoaderService.stop();
					console.log(error);
				});
		}
	}

	// arsenalSeleccionado() {
	// 	this.existeArsenal = true;
	// }

	// opcionArsenalSeleccionada(event: string, busquedaPor: string): void {
	// 	if (busquedaPor === 'rut') {
	// 		const proveedor = this.listadoProveedores.find((element) => {
	// 			return (element.rut = event);
	// 		});
	// 		this.formularioRecepcion.controls.nombreProveedor.setValue(proveedor.nombre);
	// 	} else if (busquedaPor === 'nombre') {
	// 		const proveedor = this.listadoProveedores.find((element) => {
	// 			return element.nombre === event;
	// 		});
	// 		this.formularioRecepcion.controls.rutProveedor.setValue(proveedor.rut);
	// 	}
	// }

	submit(): void {}
}
