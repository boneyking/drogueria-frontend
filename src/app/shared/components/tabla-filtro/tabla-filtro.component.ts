import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-tabla-filtro',
	templateUrl: './tabla-filtro.component.html',
	styleUrls: ['./tabla-filtro.component.scss'],
})
export class TablaFiltroComponent implements OnInit, OnChanges {
	@Input() items: any;
	@Input() placeholder: string;
	@Input() columnHeader: [];
	@Input() largoPaginacion: number;
	@Input() itemsPorPagina: Array<number>;

	@Output() cambiaPagina = new EventEmitter<PageEvent>();
	@Output() busqueda = new EventEmitter<string>();

	public objectKeys = Object.keys;
	public dataSource = new MatTableDataSource(this.items);
	public textoBusqueda = '';

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private m: MatPaginatorIntl) {
		this.m.itemsPerPageLabel = 'Items por página';
		this.m.firstPageLabel = 'Primera página';
		this.m.previousPageLabel = 'Página anterior';
		this.m.nextPageLabel = 'Página siguiente';
		this.m.lastPageLabel = 'Última página';
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.items && changes.items.currentValue) {
			this.dataSource = new MatTableDataSource(this.items);
		}
	}

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource(this.items);
	}

	cambiarPagina(event: PageEvent) {
		this.cambiaPagina.emit(event);
	}

	filtrarBusqueda(event: any) {
		this.textoBusqueda = event.target.value;
		if (event.target.value.length > 3) {
			this.busqueda.emit(event.target.value);
		}
	}

	limpiarBusqueda(){
		const pageEvent = new PageEvent();
		pageEvent.length = this.largoPaginacion;
		pageEvent.pageIndex = 0;
		pageEvent.pageSize = 5;
		this.cambiaPagina.emit(pageEvent);
	}
}
