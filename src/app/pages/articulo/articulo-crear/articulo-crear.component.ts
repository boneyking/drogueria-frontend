import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Articulo } from 'src/app/models/articulo.model';
import { Lote } from 'src/app/models/lote.model';
import { v4 as uuidv4 } from 'uuid';
import { UtilsService } from 'src/app/services/utils.service';
import { Responsable } from 'src/app/models/responsable.model';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { RespuestaArticulo } from 'src/app/models/respuesta-articulo.model';

@Component({
	selector: 'app-articulo-crear',
	templateUrl: './articulo-crear.component.html',
	styleUrls: ['./articulo-crear.component.scss'],
})
export class ArticuloCrearComponent implements OnInit {
	public formularioCrearArticulo: FormGroup;
	public articuloExistente: Articulo;

	constructor(
		private formBuilder: FormBuilder,
		private articuloService: ArticuloService,
		private ngxLoaderService: NgxUiLoaderService,
		private utilsService: UtilsService,
		private notificacionesService: NotificacionesService
	) {}

	ngOnInit(): void {
		this.inicializarFormulario();
	}

	inicializarFormulario(): void {
		this.formularioCrearArticulo = this.formBuilder.group({
			codigoBarra: new FormControl(null, [Validators.required]),
			nombre: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
			descripcion: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
			cantidad: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(Number.MAX_VALUE)]),
			identificadorLote: new FormControl(null, [Validators.required]),
			fechaVencimientoLote: new FormControl(null, [Validators.required]),
		});
	}

	verificarExistenciaCodigoBarra(event: any): void {
		if (event.target.value.length > 5) {
			this.ngxLoaderService.start();
			this.articuloService
				.verificarExistenciaCodigoBarra(event.target.value)
				.then((res: RespuestaArticulo) => {
					this.articuloExistente = res.articulo;
					if (this.articuloExistente !== null) {
						this.notificacionesService.mostrarMensaje('warning', 'Articulo', 'Código de barra ya existe para un articulo');
					}
					this.ngxLoaderService.stop();
				})
				.catch((error) => {
					this.ngxLoaderService.stop();
					console.log(error);
				});
		}
	}

	guardarArticulo(): void {
		if(this.articuloExistente !== null){
			this.notificacionesService.mostrarMensaje('warning', 'Articulo', 'Código de barra ya existe para un articulo');
			return;
		}


		if (this.formularioCrearArticulo.valid) {
			this.ngxLoaderService.start();

			const nuevoArticulo = new Articulo();
			nuevoArticulo.codigoBarra = this.formularioCrearArticulo.controls.codigoBarra.value;
			nuevoArticulo.nombre = this.formularioCrearArticulo.controls.nombre.value;
			nuevoArticulo.descripcion = this.formularioCrearArticulo.controls.descripcion.value;
			nuevoArticulo.cantidad = this.formularioCrearArticulo.controls.cantidad.value;
			nuevoArticulo.lote = new Lote();
			nuevoArticulo.lote.id = uuidv4();
			nuevoArticulo.lote.identificador = this.formularioCrearArticulo.controls.identificadorLote.value;
			nuevoArticulo.lote.fechaVencimiento = this.formularioCrearArticulo.controls.fechaVencimientoLote.value;

			const informacionToken = this.utilsService.decodificarToken(localStorage.getItem('token'));
			nuevoArticulo.responsable = new Responsable();
			nuevoArticulo.responsable.nombre = informacionToken.nombreUsuario;
			nuevoArticulo.responsable.usuarioId = informacionToken.id;

			this.articuloService
				.crearArticulo(nuevoArticulo)
				.then((articulo) => {
					this.notificacionesService.mostrarMensaje('success', 'Crear articulo', 'Articulo creado');
					this.inicializarFormulario();
					this.ngxLoaderService.stop();
				})
				.catch((error) => {
					this.notificacionesService.mostrarMensaje(
						'error',
						'Error al crear articulo',
						'Si error persiste, favor comunicarse con administrador.'
					);
					this.ngxLoaderService.stop();
				});
		} else {
			this.formularioCrearArticulo.markAllAsTouched();
		}
	}

	cancelar(): void {
		this.inicializarFormulario();
	}
}
