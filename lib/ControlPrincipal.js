import { DatosPrincipal } from "./DatosPrincipal.js";

export class ControlPrincipal{
	constructor(mensajeNoEncontrado, DatosPrincipal){
		this.mensajeNoEncontrado = mensajeNoEncontrado;
		this.DatosPrincipal = DatosPrincipal;
	}

	consulta(callbackError, callback) {
		this.DatosPrincipal.consulta(callbackError,callback);
	}

	async busca(id){
		const modelo =await	this.DatosPrincipal.busca(id);
		if(modelo){
			return modelo;
		} else {
			throw new Error (this.mensajeNoEncontrado);
		}
	}

	async agrega(modelo){
		await this.DatosPrincipal.agrega(modelo);
	}

	async modifica(modelo){
		await this.DatosPrincipal.modifica(modelo);
	}

	async elimina(id){
		await this.DatosPrincipal.elimina(id);
	}
}