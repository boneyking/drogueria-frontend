import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
	selector: 'app-recepcion-articulos',
	templateUrl: './recepcion-articulos.component.html',
	styleUrls: ['./recepcion-articulos.component.scss'],
})
export class RecepcionArticulosComponent implements OnInit {
	public formularioRecepcion: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private ngxLoaderService: NgxUiLoaderService,
		private notificacionesService: NotificacionesService
	) {}

	ngOnInit(): void {}
}
