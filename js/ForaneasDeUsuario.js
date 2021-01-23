import { cod } from "../lib/util.js";
import	{ InfoAlmacen } from "./InfoAlmacen.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";

const SIN_ALMACEN = /* html */
`<option value="">-- Sin Almacen --</option>`;

export class ForaneasDeUsuarios{
	renderPrivilegio(privilegio){
		return ( /* html */
			`<em>${cod(privilegio.nombre)}</em><br>
			${cod(pri.descripcion)}`);
	}

	muestraAlmacen(select, valor, almacen){
		select.innerHTML = SIN_ALMACEN +
     	    almacenes.map(p => {
        		const selected = p.id === valor ? "selected" : "";
        		return (/* html */
          			`<option value="${cod(p.id)}" ${selected}>${cod(p.nombre)}</option>`);
      }).join("");	
	}

	muestraPrivilegios(elemento, valor, privileios){
		const set = new Set(valor || []);
		elemento.innerHTML = privilegios.map(p => {
			const	 checked =set.has(p.nombre) ? "checked" : "";
			return ( /* html */
				`<li>
          			<label>
           				 <input type="checkbox" name="privilegios"
               				 value="${cod(p.nombre)}" ${checked}>
          				 <span>${this.renderPrivilegio(p)}</span>
          			</label>
        		</li>`)
		}).join("");
	}
}