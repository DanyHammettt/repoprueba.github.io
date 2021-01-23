import { valida } from "../lib/util.js";
import { InfoAlmacen } from "./InfoAlmacen.js";
import { InfoPrivilegio } from ".InfoPrivilegio.js";

export class InfoUsuario{
	constructor({email, avatar, urlDeAvatar, almacen, privilegios}) {
		this.email = email;
		this.avatar = avatar;
		this.urlDeAvatar = urlDeAvatar;
		this.almacen = almacen;
		this.privilegios = privilegios;
	}

	validaAlAgregar(){
		valida(this.email, "Falta proporcionar el email");
		valida(this.avatar && this.avatar.size > 0,
			"Falta proporcionar el avatar");
	}
	ValidaAlModificar(){
		valida(this.email, "Falta proporcionar el Email");
	}
}