import { DatosUsuarios } from "./DatosUsuarios.js";

export class ControlSesion{
	constructor(aunt,provider,DatosUsuarios){
		this._auth = auth;
		this._provider = provider;
		this._DatosUsuarios = DatosUsuarios;
	}

	async protege(privilegio){
		return new Promise((resolve, reject) =>{
		this._auth.onAuthStateChanged(async usuarioAuth => {
			if (usuarioAuth && usuarioAuth.email){
				let privilegios = new Set();
				const usuario = await this._DatosUsuarios.busca(usuarioAuth.email);
				if(usuario){
					const arrPrivilegios = usuario.privilegios.map(p => p.nombre);
					privilegios = new Set (arrPrivilegios);
					if(!privilegio){
						resolve({
							email: usuarioAuth.email,
							nombre: usuarioAuth.displayName || "",
							urlFoto: usuario.urlDeAvatar || usuarioAuth.photoURL || "",
							privilegios
						});
					}else if (privilegios.has(privilegio)){
						resolve({
							email: usuarioAuth.email,
							nombre: usuarioAuth.displayName || "",
							urlFoto: usuarioAuth.photoURL || "",
							privilegios
						});
					} else {
						reject(new Error("Usuario no Autorizado."));
					}
				} else {
					reject(new Error("Usuario no Registrado."));
				}
			} else {
				this._auth.singInWithRedirect(this._provider);
			}
		},
		reject);	
		});
	}
	async terminasesion(){
		await this._auth.singOut();
	}
}