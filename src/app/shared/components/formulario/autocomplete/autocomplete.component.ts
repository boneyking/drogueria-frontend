import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
	@Input() formulario: FormGroup;
	@Input() nombreCampo: string;
	@Input() placeholder: string;
	@Input() etiqueta: string;
	@Input() hint: string;
	@Input() nombreValorOpcion: string;
	@Input() textoOpcion: string;
	@Input() listadoOpciones: Promise<any>;

	@Output() textoABuscar = new EventEmitter<string>();
	@Output() opcionSeleccionada = new EventEmitter<any>();

	constructor() {}

	ngOnInit(): void {}

	buscarAutoCompletado(texto: string) {
		this.textoABuscar.emit(texto);
	}

	seleccionarOpcion(event: any) {
		this.opcionSeleccionada.emit(event.option.value);
	}
}
