import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
	selector: 'app-articulo-crear',
	templateUrl: './articulo-crear.component.html',
	styleUrls: ['./articulo-crear.component.scss'],
})
export class ArticuloCrearComponent implements OnInit {
	public formularioCrearArticulo: FormGroup;

	constructor(private formBuilder: FormBuilder, private articuloService: ArticuloService, private ngxLoaderService: NgxUiLoaderService) {}

	ngOnInit(): void {
		this.inicializarFormulario();
	}

	inicializarFormulario(): void {
		this.formularioCrearArticulo = this.formBuilder.group({
			codigoBarra: new FormControl(null, [Validators.required]),
			nombre: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
			descripcion: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
			cantidad: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(Number.MAX_VALUE)]),
			identificadorLote: new FormControl(null, [Validators.required]),
			fechaVencimientoLote: new FormControl(null, [Validators.required]),
		});
	}
}
