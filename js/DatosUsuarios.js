import { ControlPrincipal } from "../lib/ControlPrincipal.js";
import { paraTodos } from "../lib/util.js";
import { DatosAlmacenes } from "./DatosAlmacenes.js";
import { DatosPrivilegios } from "./DatosPrivilegios.js";
import { DatosStorage } from "./DatosStorage.js";
import { InfoUsuario } from "./InfoUsuario.js";

export class DatosUsuarios{
	constructor(firestore, DatosAlmacenes, DatosPrivilegios, DatosStorage){
		this._coleccion = firestore.collection("USUARIO");
		this._datosAlmacenes = DatosAlmacenes;
		this._datosPrivilegios = DatosPrivilegios;
		this._datosStorage = DatosStorage;
	}

	async _cargaUsuario(doc){
		if(doc.exists){
			const data = doc.data();
			return new InfoUsuario({
				email: doc.id,
				avatar: null,
				urlDelAcatar: await this._datosStorage.url(doc.id),
				almacen: await this._datosAlmacenes.busca(data.PAS_ID),
				privilegios: await this._datosPrivilegios.buscaMuchos(data.PRIV_IDS)
			});
		} else{
			return null;
		}
	}

	consulta(callbackError, callback){
		this._coleccion.inSnapshot(
			async querySnapshot => callback(await Promise.all(
				paraTodos(querySnapshot, doc => this._cargaUsuario(doc)))),
			error =>{
				callbackError(error);
				this.consulta(callbackError, callback);
			});
	}

	async busca(id){
		let doc = id ? await this._coleccion.doc(id).get() : { exists: false };
		return this._cargaUsuario(doc);
	}

	async _modificaInterno(modelo){
		await this._coleccion.doc(modelo.email).set({
			PAS_ID: modelo.almacen ? (modelo.almacen.id || null) : "",
			PRIV_IDS: modelo.privilegios.map(p => p.nombre)
		});
		if(modelo.avatar && modelo.avatar.size > 0){
			await this._datosStorage.sube(modelo.email, modelo.avatar);
		}
	}

	async agregar(modelo){
		modelo.validaAlAgregar();
		await this._modificaInterno(modelo);
	}

	async modifica(modelo){
		modelo.validaAlModificar();
		await this._modificaInterno(modelo);
	}

	async elimina(id){
		await this._coleccion.doc(id).delete();
		await this._datosStorage.elimina(id);
	}
}