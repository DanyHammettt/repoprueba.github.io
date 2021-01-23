export class DatosStorage{
	constructor(storage){
		this._storage = storage;
	}
	async sube (nombre, archivo){
		await this._storage.ref(nombre).put(archivo);
	}
	async url(nombre){
		try{
			return await this._storage.ref(nombre).getDownloadURL();
		} catch (e){
			console.log(e);
			return "";
		}
	}
	async elimina(nombre){
		return await this._storage.ref(nombre).delete();
	}
}