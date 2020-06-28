export class RespuestaPaginada<TRespuesta>{
	items: Array<TRespuesta> = Array<TRespuesta>();
	totalItems: number;
	totalDocumentos: number;
}
