import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class NotificacionesService {
	constructor(private toastrService: ToastrService) {}

	mostrarMensaje(type: string, title: string, message: string, options?: Partial<IndividualConfig>) {
		switch (type) {
			case 'error':
				this.toastrService.error(message, title, options);
				break;
			case 'info':
				this.toastrService.info(message, title, options);
				break;
			case 'success':
				this.toastrService.success(message, title, options);
				break;
			case 'warning':
				this.toastrService.success(message, title, options);
				break;
			default:
				this.toastrService.info(message, title, options);
				break;
		}
	}

	cerrarTodos() {
		this.toastrService.clear();
	}
}
