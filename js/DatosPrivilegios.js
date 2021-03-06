import { paraTodos } from "../lib/util.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";

export class DatosPrivilegios{
	constructor(firestore){
		this._coleccion = firestore.collection("PRIVILEGIO");

	}
	_cargaPrivilegio(doc){
		if(doc.exists){
			const data = doc.data();
			return new InfoPrivilegio({
				nombre: doc.id,
				descripcion: data.PRIV_DESCR || ""
			});
		} else {
			return null;
		}
	}
	consulta(callbackError, callback){
		this._coleccion.onSnapshot(
			querySnapshot => callback(
				paraTodos(querySnapshot, doc => this._cargaPrivilegio(doc))),
			error => {
				callbackError(error);
				this.consulta(callbackError, callback);
			}
		);
	}
	async	buscaMuchos(ids){
		ids = ids || [];
		let docs =await Promise.all(ids.map(
			id => id ? this._coleccion.doc(id).get() : { exists: false }));
		return	docs.map(doc => this._cargaPrivilegio(doc)).filter(Boolean);
	}
}