import { ControlPrincipal } from "../lib/ControlPrincipal.js";
import { DatosAlmacenes } from "./DatosAlmacenes.js";
import { DatosPrivilegios } from "./DatosPrivilegios.js";
import { DatosUsuarios } from "./DatosUsuarios.js";
import { InfoAlmacen } from "./InfoAlmacen.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";
import { InfoUsuario } from "./InfoUsuario.js";

export class ControlUsuarios extends ControlPrincipal{
	constructor(mensajeNoEncontrado, datosUsuarios, datosAlmacenes,
	datosPrivilegios){
		super(mensajeNoEncontrado, datosUsuarios);
		this._datosAlmacenes = datosAlmacenes;
		this._datosPrivilegios = datosPrivilegios;
	}
	foraneas(callbackError, callbackAlmacenes, callbackPrivilegios){
		this._datosAlmacenes.consulta(callbackError, callbackAlmacenes);
		this._datosPrivilegios.consulta(callbackError, callbackPrivilegios);
	}
}