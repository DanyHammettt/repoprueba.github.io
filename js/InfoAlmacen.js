import { valida } from "../lib/util.js";

export class InfoAlmacen{
	constructor({id, nombre}) {
		this.id = id;
		this.nombre = nombre;
	}

	valida(){
		valida(this.nombre, "Falta proporcionar el nombre");
	}
}