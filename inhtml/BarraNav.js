class Barra extends HTMLElement{
	connectedCallback(){
	this.innerHTML = /* html */
	`<ul>
        <li><a href="index.html">Sesión</a></li>
      </ul>`;
      this.ul = this.querySelector("ul");
}
/**
   * @param {Set<string>} almacen
   */
   protege(almacen){
   	let html = "";
   	if(almacen.has("Almacen")){
   		html += /* html */ `<li><a href="almacenes.html">Almacen</a></li>`;
   	}
   	if(almacen.has("Usuarios")){
   		html += /* html */ `<li><a href="usuarios.html">Usuarios</a></li>`;
   	}
   	this.ul.innerHTML += html;
    }
   }
   customElements.define("nav",Barra);