import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ArsenalService } from 'src/app/services/arsenal.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Arsenal } from 'src/app/models/arsenal.model';
import { RespuestaSocket } from 'src/app/models/respuesta-socket.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
	selector: 'app-arsenal-crear',
	templateUrl: './arsenal-crear.component.html',
	styleUrls: ['./arsenal-crear.component.scss'],
})
export class ArsenalCrearComponent implements OnInit {
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

	constructor(
		private formBuilder: FormBuilder,
		private arsenalService: ArsenalService,
		private ngxLoaderService: NgxUiLoaderService,
		private notificacionesService: NotificacionesService,
		private webSocketService: WebSocketService,
		private utilsService: UtilsService
	) {
		const informacionToken = this.utilsService.decodificarToken(localStorage.getItem('token'));

		this.webSocketService.listen('arsenalCreado').subscribe((data: RespuestaSocket) => {
			this.notificacionesService.mostrarMensaje('success', 'Arsenal Creado', data.mensaje);
		});

		this.webSocketService.listen(`arsenalNoCreado_${informacionToken.id}`).subscribe((data: RespuestaSocket) => {
			this.notificacionesService.mostrarMensaje('error', 'Arsenal No Creado', data.mensaje);
		});
	}

	ngOnInit(): void {
		this.inicializarFormulario();
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
			this.arsenalService.crearArsenal(arsenal)
			.then((res: RespuestaSocket) => {
				console.log(res);
				this.ngxLoaderService.stop();
			})
			.catch(error => {
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
