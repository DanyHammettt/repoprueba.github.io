import { DatosPrincipal } from "../lib/DatosPrincipal.js";
import {paraTodos, trims } from "../lib/util.js";
import { InfoAlmacen } from "./InfoAlmacen.js";

export class DatosAlmacenes{
	constructor(firestore){
		this._coleccion = firestore.collection("ALMACEN");
	}
	_cargaAlmacen(doc){
		if(doc.exists){
			const data = doc.data();
			return new InfoAlmacen({
				id: doc.id,
				nombre: data.PAS_NOMBRE
			});
		} else {
			return null;
		}
	}
	consulta(callbackError, callback){
		this._coleccion.orderBy("PAS_NOMBRE").onSnapshot(
			querySnapshot => callback(
				paraTodos(querySnapshot, doc => this._cargaAlmacen(doc))),
			error => {
				callbackError(error);
				this.consulta(callbackError, callback);
			}
			);
	}

	async busca(id){
		let doc = id ? await this._coleccion.doc(id).get() : { exists: false};
		return	this._cargaAlmacen(doc);
	}
	async agrega(modelo){
		modelo.valida();
		await this._coleccion.add({
			PAS_NOMBRE: trims(modelo.nombre)
		});
	}
	async modifica(modelo){
		modelo.valida();
		await this._coleccion.doc(modelo.id).set({
			PAS_NOMBRE: trims(modelo.nombre)
		});
	}
	async elimina(id){
		await this._coleccion.doc(id).delete();
	}
}