{
	let arrayCirculos = [undefined, undefined, undefined, undefined];
	let tablero;

	var masterMind = function(){
		let arrayColores =  ["Amarillo", "Azul", "Blanco", "Marron", "Naranja", "Negro", "Rojo", "Verde"];
		let arrayObjetivo;

		let iniciarJuego = function(){
			arrayObjetivo = [];

			for (let i = 0; i < 4; i++) {
				//Se obtiene un número random entre el máximo(excluido) y el mínimo(incluido) y floor para obtener el número entero correctamente
				arrayObjetivo.push(arrayColores[Math.floor(Math.random() * (8 - 0))]); 
			}
			console.log(arrayObjetivo);
		}

		let comprobarColores = function(tablero){
			if(arrayCirculos.indexOf(undefined) === -1){
				let elementosTablero = tablero.children[tablero.children.length-1];

				let posicionCorrecta = 0;
				let esta = 0;
				let arrayObjetivoCopia = arrayObjetivo.slice(); //Si no se usa el metodo slice se referencia el array no se copia, por eso se cambiaban los dos
				//Comprobamos si está en la posición correcta
				arrayCirculos.forEach( function(element, index) {
					if(arrayObjetivoCopia[index] === element){
						posicionCorrecta++;
						arrayObjetivoCopia[index] = undefined;
						arrayCirculos[index] = "hola";
					}
				});

				//Ahora comprobamos si los colores estan
				for (let i = 0; i < arrayCirculos.length; i++) {
					if(arrayObjetivoCopia.indexOf(arrayCirculos[i]) != -1){
						let posicion = arrayObjetivoCopia.indexOf(arrayCirculos[i]);
						arrayObjetivoCopia[posicion] = undefined;
						esta++;
					}
				}

				return [posicionCorrecta + esta, posicionCorrecta, elementosTablero];
			}
		}

		let init = function(){
			iniciarJuego();				
		}

		return {
			init:init,
			comprobarColores: comprobarColores
		}
	}();

	document.addEventListener("DOMContentLoaded", function() {
		let buttonReiniciar;
		let buttonSalir;

		masterMind.init();

		buttonReiniciar = document.getElementById('reiniciar');
		buttonSalir = document.getElementById('salir');
		buttonReiniciar.addEventListener("click", reiniciarPartida);
		buttonSalir.addEventListener("click", salirJuego);

		tablero = document.getElementById('tablero');
		let arrayImgs = document.getElementsByTagName("img");
		for (let i = 0; i < 8; i++) {
			arrayImgs[i].addEventListener("click", crearCirculos.bind(null, tablero, arrayImgs[i].src));
		}
		nuevaFila();

		document.getElementById("aceptar").addEventListener("click", function(){
			let arrayCirculosDevolver = masterMind.comprobarColores(tablero);
			if(arrayCirculos.indexOf(undefined) === -1){
				rellenarCirculos(arrayCirculosDevolver[0], arrayCirculosDevolver[1], arrayCirculosDevolver[2]);
			}
		});
    });

    let crearCirculos = function(tablero, imagen){
		let cajaActual = tablero.children[tablero.children.length-1];
		for(let i = 0; i < 4; i++){
			if(arrayCirculos[i] === undefined){
				let arraySrc = imagen.split("/");
				let stringColor = arraySrc[arraySrc.length-1];
				let color = stringColor.slice(0, stringColor.length-4);
				arrayCirculos[i] = color;

				cajaActual.children[i].src = imagen;
				break;
			}
		}
	}

	let nuevaFila = function(){
		let divCirculos = document.createElement("div");
		divCirculos.id = 'circulosVacios';
		tablero = document.getElementById('tablero');

		for (let i = 0; i < 4; i++) {
			let circulo = document.createElement('img');
			circulo.id = "vacioGrande"+i;
			circulo.src = 'img/vacioGrande.svg';
			circulo.addEventListener("click", quitarCirculo.bind(null, circulo, i));
			divCirculos.appendChild(circulo);
		}

		let blancosYNegros = document.createElement('div');
		for (let i = 0; i < 4; i++) {
			let circulo = document.createElement('img');
			circulo.id = "vacioPequeño"+i;
			circulo.src = 'img/vacioPequeño.svg';
			blancosYNegros.appendChild(circulo);
		}
		divCirculos.appendChild(blancosYNegros);

		tablero.appendChild(divCirculos);
		window.scrollTo(0, 0);
	}

	let quitarCirculo = function(elemento, index){
		if(elemento.className != "relleno"){
			elemento.src = 'img/vacioGrande.svg';
			arrayCirculos[index] = undefined;
			elemento.className= 'vacio';
		}
	}

	let rellenarCirculos = function(sumaCirculos, negras, tablero){

		let tableroNegrasYBlancas = tablero.children[tablero.children.length-1];

		for (let i = 0; i < sumaCirculos; i++) {
			if(i < negras){
				tableroNegrasYBlancas.children[i].src = "img/pequeñoNegro.svg";
			}else{
				tableroNegrasYBlancas.children[i].src = "img/pequeñoBlanco.svg";
			}		
		}

		if(negras === 4){
			let modal = document.getElementById('ventanaModal');
			modal.style.display = 'block';
		}else{
			nuevaFila();
			for(let i = 0; i < 4; i++){
				arrayCirculos[i] = undefined;
				tablero.children[i].className = "relleno";
				tablero.children[i].style.cursor = "auto";
			}
		}

	}

	let reiniciarPartida = function(){
		location.reload(true);
	}

	let salirJuego = function(){
		window.close();
	}
}
