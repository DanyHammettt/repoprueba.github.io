class Progresobar extends HTMLElement{
	connectedCallback(){
		this.innerHTML = /* html */
		`<progress max="1000"><Iniciando…</progress>`;
	}
}
customElements.define("barra-progreso",Progresobar);