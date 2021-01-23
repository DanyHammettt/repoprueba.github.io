class Footer extends HTMLElement{
	connectedCallback(){	
		this.innerHTML = /* html */
			'Original de &copy; 2021 Daniel Franco Tinajero';
	}
}
customElements.define("pie",Footer);