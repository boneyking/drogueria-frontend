import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ArsenalService } from 'src/app/services/arsenal.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Arsenal } from 'src/app/models/arsenal.model';
import { RespuestaSocket } from 'src/app/models/responses/respuesta-socket.model';
import { UtilsService } from 'src/app/services/utils.service';
import { RequestPaginada } from 'src/app/models/requests/request-paginada.model';
import { RespuestaPaginada } from 'src/app/models/responses/respuesta-paginada.model';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { EventosSocket } from 'src/app/enums/eventos-socket.enum';
import { TipoMensaje } from 'src/app/enums/tipo-mensaje.enum';

@Component({
	selector: 'app-arsenal-crear',
	templateUrl: './arsenal-crear.component.html',
	styleUrls: ['./arsenal-crear.component.scss'],
})
export class ArsenalCrearComponent implements OnInit, OnDestroy {
	public formularioCrearArsenal: FormGroup;
	public arsenalTipos = [
		{
			valor: 'Medicamento',
			texto: 'Medicamento',
		},
		{
			valor: 'Insumo',
			texto: 'Insumo',
		},
		{
			valor: 'AyudaTecnica',
			texto: 'Ayuda Técnica',
		},
	];

	public requestPaginada: RequestPaginada = new RequestPaginada();
	public arsenalRespuestaPaginada: RespuestaPaginada<Arsenal> = new RespuestaPaginada<Arsenal>();
	public listadoArsenal: Array<Arsenal> = new Array<Arsenal>();

	public filtroBusqueda = '';
	public cantidadResultadosBusqueda = environment.PAGINACION.CANTIDAD_RESULTADOS;
	public orden: string;
	public ordenarPor: string;
	public pagina = environment.PAGINACION.PAGINA;
	public textoBusqueda = '';

	public columnas = { nombre: 'Nombre Arsenal', arsenalTipo: 'Tipo' };

	private suscripciones: Subscription[] = [];

	constructor(
		private formBuilder: FormBuilder,
		private arsenalService: ArsenalService,
		private ngxLoaderService: NgxUiLoaderService,
		private notificacionesService: NotificacionesService,
		private webSocketService: WebSocketService,
		private utilsService: UtilsService
	) {
		const informacionToken = this.utilsService.decodificarToken(localStorage.getItem('token'));

		const arsenalCreado = this.webSocketService.listen(EventosSocket.ArsenalCreado).subscribe((data: RespuestaSocket) => {
			this.notificacionesService.mostrarMensaje(TipoMensaje.Exito, 'Arsenal Creado', data.mensaje);
			this.obtenerArsenalPaginado(1, '');
		});

		const arsenalNoCreado = this.webSocketService
			.listen(`${EventosSocket.ArsenalNoCreado}_${informacionToken.id}`)
			.subscribe((data: RespuestaSocket) => {
				this.notificacionesService.mostrarMensaje(TipoMensaje.Error, 'Arsenal No Creado', data.mensaje);
			});
		this.suscripciones.push(arsenalCreado);
		this.suscripciones.push(arsenalNoCreado);
	}

	ngOnDestroy(): void {
		this.suscripciones.forEach((s) => s.unsubscribe());
	}

	ngOnInit(): void {
		this.inicializarFormulario();
		this.obtenerArsenalPaginado(this.pagina, '');
	}

	async avanzaPagina(event: PageEvent) {
		this.cantidadResultadosBusqueda = event.pageSize;
		await this.obtenerArsenalPaginado(event.pageIndex + 1, this.textoBusqueda);
	}

	obtenerArsenalPaginado(pagina: number, filtroBusqueda: string): void {
		this.textoBusqueda = filtroBusqueda;
		this.requestPaginada = new RequestPaginada();
		this.requestPaginada.filtro = filtroBusqueda;
		this.requestPaginada.cantidadResultados = this.cantidadResultadosBusqueda;
		this.requestPaginada.orden = 'asc';
		this.requestPaginada.ordenarPor = 'nombre';
		this.requestPaginada.pagina = pagina;
		this.ngxLoaderService.start();
		Promise.resolve(this.arsenalService.obtenerArsenalPaginado(this.requestPaginada)).then((res) => {
			this.arsenalRespuestaPaginada = res;
			this.listadoArsenal = new Array<Arsenal>();
			this.listadoArsenal = res.items;
			this.ngxLoaderService.stop();
		});
	}

	inicializarFormulario(): void {
		this.formularioCrearArsenal = this.formBuilder.group({
			nombreArsenal: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
			arsenalTipo: new FormControl(null, [Validators.required]),
		});
	}

	guardarArsenal(): void {
		if (this.formularioCrearArsenal.valid) {
			const arsenal = new Arsenal();
			arsenal.nombre = this.formularioCrearArsenal.controls.nombreArsenal.value;
			arsenal.arsenalTipo = this.formularioCrearArsenal.controls.arsenalTipo.value;

			const informacionToken = this.utilsService.decodificarToken(localStorage.getItem('token'));
			arsenal.responsable.nombre = informacionToken.nombreUsuario;
			arsenal.responsable.usuarioId = informacionToken.id;

			this.ngxLoaderService.start();
			this.arsenalService
				.crearArsenal(arsenal)
				.then((res: RespuestaSocket) => {
					this.inicializarFormulario();
					this.ngxLoaderService.stop();
				})
				.catch((error) => {
					console.log(error);
					this.ngxLoaderService.stop();
				});
		} else {
			this.formularioCrearArsenal.markAllAsTouched();
		}
	}

	cancelar(): void {
		this.inicializarFormulario();
	}
}
