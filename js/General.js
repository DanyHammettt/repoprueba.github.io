import { ControlPrincipal } from "../lib/ControlPrincipal.js";
import { ControlSesion } from "./ControlSesion.js";
import { ControlUsuarios } from "./ControlUsuarios.js";
import { DatosAlmacenes } from "./DatosAlmacenes.js";
import { DatosPrivilegios } from "./DatosPrivilegios.js";
import { DatosStorage } from "./DatosStorage.js";
import { DatosUsuarios } from "./DatosUsuarios.js";
import { ForaneasDeUsuario } from "./ForaneasDeUsuario.js";

export class Fabrica {
	constructor(){
		const firestore = firestore.firestore();
		const storage = firestore.storage();
		const auth = firestore.auth();
		const provider = new firestore.auth.GoogleAuthProvider();
		provider.SetCustomParameters({ prompt : "select_account"});
		this.DatosStorage = new DatosStorage(storage);
		this.DatosAlmacenes = new DatosAlmacenes(firestore);
		this.DatosPrivilegios = new DatosPrivilegios(firestore);
		this. DatosUsuarios = new DatosUsuarios(firestore, this.DatosAlmacenes,
			this.DatosPrivilegios, this.DatosStorage);
		this.ControlSesion = new ControlSesion(auth, provider, this.DatosUsuarios);
		this.ControlAlmacenes = new ControlGeneral("No se encontro el articulo.", this.DatosAlmacenes);
		this.ControlUsuarios = new ControlUsuarios("No se encontro el articulo.",
			this.DatosUsuarios, this.DatosAlmacenes, this.DatosPrivilegios);
		this.ForaneasDeUsuario = new ForaneasDeUsuario();
	}
}

Fabrica.instancia = Object.freeze(new Fabrica());