import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { NotificacionesService } from './notificaciones.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TipoMensaje } from '../enums/tipo-mensaje.enum';

@Injectable({
	providedIn: 'root',
})
export class WebSocketService {
	private socket: any;
	private readonly uri: string = 'ws://localhost:8081';
	private opcionesError = {
		disableTimeOut: true,
		positionClass: 'toast-center-center',
		tapToDismiss: false,
	};

	constructor(private notificacionesService: NotificacionesService, private ngxLoaderService: NgxUiLoaderService) {
		this.socket = io(this.uri);
	}

	verificaSocket() {
		return new Observable((subscriber) => {
			setTimeout(() => {
				if (!this.socket.connected) {
					this.ngxLoaderService.start();
					this.notificacionesService.mostrarMensaje(
						TipoMensaje.Error,
						'Error',
						'Se ha perdido la conexión con el servidor.',
						this.opcionesError
					);
				} else {
					this.ngxLoaderService.stop();
				}

				this.socket.on('disconnect', () => {
					this.ngxLoaderService.start();
					this.notificacionesService.mostrarMensaje(
						TipoMensaje.Error,
						'Error',
						'Se ha perdido la conexión con el servidor.',
						this.opcionesError
					);
					subscriber.next();
				});

				this.socket.on('connect', () => {
					this.notificacionesService.cerrarTodos();
					this.ngxLoaderService.stop();
					subscriber.next();
				});

				this.socket.on('reconnect', () => {
					setTimeout(() => {
						this.notificacionesService.mostrarMensaje(TipoMensaje.Exito, 'Alerta', 'Se ha reconectado con el servidor.', {
							timeOut: 1500,
							positionClass: this.opcionesError.positionClass,
						});
						this.ngxLoaderService.stop();
					}, 500);
					subscriber.next();
				});
			}, 500);
		});
	}

	listen(eventName: string) {
		return new Observable((subscriber) => {
			this.socket.on(eventName, (data) => {
				subscriber.next(data);
			});
		});
	}

	emit(eventName: string, data: any) {
		this.socket.emit(eventName, data);
	}
}
