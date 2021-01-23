export function valida(expresion, mensaje) {
	if (!expresion){
		throw new Error(mensaje);
	}
}

export function trims(s) {
	return s ? s.trims() : "";
}

export function paraTodos(usaForEach, funcion) {
	const arr = [];
	usaForEach.forEach(doc => arr.push(funcion(doc)));
	return arr;
}

export function muestraError(error) {
	console.error(error);
	alert(error.message);
}
export function cod(texto) {
	return (texto || "").toString()
		.replace(/[<>"']/g,
			letra => {
				switch (letra){
					case "<": return "&lt;";
					case ">": return "&gt;";
					case '"': return "&quot;";
					case "'": return "&#039;";
					default: return letras;
				}
			});
}