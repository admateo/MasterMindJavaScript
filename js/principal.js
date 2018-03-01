{
	let empezar, cerrar;

	let empezarJuego = function(){
		window.location.replace("juego.html");
	}

	let finalizarJuego = function(){
		window.close();
	}

	document.addEventListener("DOMContentLoaded", function() {
		empezar = document.getElementById("empezar");
		cerrar = document.getElementById("cerrar");

		empezar.addEventListener("click", empezarJuego);
		cerrar.addEventListener("click", finalizarJuego);
    });
}