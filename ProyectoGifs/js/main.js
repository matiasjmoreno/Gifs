var btnSwitch = document.querySelector('#switch');
btnSwitch.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	btnSwitch.classList.toggle('active');

	colorDiv();
	colorDiv2();
	cambiarLogo();
	guardarBusquedaLocalStorage();
});

function colorDiv2() {
	var cambiarSuger = document.getElementById('sugerencia');
	var bg = cambiarSuger.style.color;
	if (bg == 'white') {
		cambiarSuger.style.color = 'black';
		cambiarSuger.style.border = '1px solid black';
		cambiarSuger.style.boxShadow = '2px 2px black';
	} else {
		cambiarSuger.style.color = 'white';
		cambiarSuger.style.border = '1px solid #E1B6FA';
		cambiarSuger.style.boxShadow = '2px 2px #D091F6';
	}
}

function colorDiv() {
	var cambiarSuge = document.getElementById('tendenciass');
	var bg = cambiarSuge.style.color;
	if (bg == 'white') {
		cambiarSuge.style.color = 'black';
		cambiarSuge.style.border = '1px solid black';
		cambiarSuge.style.boxShadow = '2px 2px black';
	} else {
		cambiarSuge.style.color = 'white';
		cambiarSuge.style.border = '1px solid #E1B6FA';
		cambiarSuge.style.boxShadow = '2px 2px #D091F6';
	}
}

let dia = true;
function cambiarLogo() {
	var imagen = document.getElementById('logoo');
	var log = imagen.src;
	// console.log(log);

	if (dia) {
		imagen.src = './imagenes/logo1.png';
		dia = false;
	} else {
		imagen.src = './imagenes/logo.png';
		dia = true;
	}
}

//busqueda

function validarF() {
	var formularioo = document.getElementsByName('formulario')[0];
	elementoss = formularioo.elements;
	botonn = document.getElementById('btonn');
	if (formularioo.nombre.value == 0) {
		alert('Escriba su gifs...');
	}
	formularioo.addEventListener('submit', validarF);
}

//////

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
searchForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const q = searchInput.value;
	search(q);
	validarF();
	guardarBusquedaLocalStorage();
	mostrarBusquedasGuardadas();
});

function search(q) {
	const apikey = 'nOL9RdzkjVbBSToCAGvB0qaImzh0Ra7C';
	const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=6&q=${q}`;

	fetch(path)
		.then(function (res) {
			return res.json();
		})
		.then(function (json) {
			console.log(json.data[0].images.original.url);
			const resultsEl = document.getElementById('results');
			let resultsHTML = '';
			json.data.forEach(function (obj) {
				console.log(obj);
				const url = obj.images.original.url;
				const width = obj.images.fixed_width.width;
				const title = obj.title;

				resultsHTML += `<img src="${url}" class="item" width="${width}" alt="${title}">`;
			});
			resultsEl.innerHTML = resultsHTML;
		})
		.catch(function (err) {
			console.log(err.message);
		});
}

//----------------localSto

function guardarBusquedaLocalStorage() {
	var arrayBusquedasGifos = [];
	let textoBuscador = document.getElementById('search-input');
	let valorTextoBuscador = textoBuscador.value;

	// IGUALA EL ARRAY A LO QUE HAYA EN EL LOCAL STORAGE

	if (JSON.parse(localStorage.getItem('arrayBusquedasGifosLocalStorage')) != null) {
		arrayBusquedasGifos = JSON.parse(
			localStorage.getItem('arrayBusquedasGifosLocalStorage')
		);
	}

	// AGREGA TEXTO BUSCADO AL ARRAY

	arrayBusquedasGifos.unshift(valorTextoBuscador);

	// GUARDA NUEVO ARRAY EN LOCAL STORAGE

	localStorage.setItem(
		'arrayBusquedasGifosLocalStorage',
		JSON.stringify(arrayBusquedasGifos)
	);
}

// MOSTRAR BUSQUEDAS ANTERIORES DEL LOCAL STORAGE

function mostrarBusquedasGuardadas() {
	// BUSCA ARRAY DE COSAS BUSCADAS EN LOCAL STORAGE

	let arrayBusquedasGuardadas = JSON.parse(
		localStorage.getItem('arrayBusquedasGifosLocalStorage')
	);

	// SI NO HAY NADA EN EL LOCAL STORAGE...

	if (arrayBusquedasGuardadas === null) {
		contGenBusquedasGuardadas = document.getElementById('contGenBusquedasGuardadas');
		recuadroResultado = document.createElement('div');
		recuadroResultado.classList.add('recuadroResultado');
		recuadroResultadoTexto = document.createElement('a');
		recuadroResultadoTexto.classList.add('recuadroResultadoTexto');
		textoResultado = document.createTextNode('No hay busquedas guardadas');

		recuadroResultadoTexto.appendChild(textoResultado);

		recuadroResultado.appendChild(recuadroResultadoTexto);

		contGenBusquedasGuardadas.appendChild(recuadroResultado);
	}
	// SI HAY COSAS EN EL LOCAL...
	else {
		let contGenBusquedasGuardadas = document.getElementById(
			'contGenBusquedasGuardadas'
		);
		while (contGenBusquedasGuardadas.firstChild) {
			contGenBusquedasGuardadas.removeChild(contGenBusquedasGuardadas.firstChild);
		}

		for (i = 0; i < arrayBusquedasGuardadas.length; i++) {
			let contGenBusquedasGuardadas = document.getElementById(
				'contGenBusquedasGuardadas'
			);
			let recuadroResultado = document.createElement('div');
			recuadroResultado.classList.add('recuadroResultado');
			let recuadroResultadoTexto = document.createElement('a');
			recuadroResultadoTexto.classList.add('recuadroResultadoTexto');
			let textoResultado = document.createTextNode(arrayBusquedasGuardadas[i]);
			recuadroResultado.setAttribute('data-foo', arrayBusquedasGuardadas[i]);
			// AGREGA URL Y FUNCION ONCLICK A LOS GIFOS

			recuadroResultadoTexto.appendChild(textoResultado);

			recuadroResultado.appendChild(recuadroResultadoTexto);

			contGenBusquedasGuardadas.appendChild(recuadroResultado);
		}
	}
}

mostrarBusquedasGuardadas();

// TERMINA MOSTRAR BUSQUEDAS ANTERIORES DEL LOCAL STORAGE

//SUGERENCIAS
let sugeren = document.getElementById('camar');
sugeren.addEventListener('click', () => {
	const q = 'camaro';
	sugere(q);
});

function sugere(q) {
	const apikey = 'nOL9RdzkjVbBSToCAGvB0qaImzh0Ra7C';
	const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=6&q=${q}`;

	fetch(path)
		.then(function (res) {
			return res.json();
		})
		.then(function (json) {
			console.log(json.data[0].images.original.url);
			const resultsEl = document.getElementById('suge');
			let resultsHTML = '';
			json.data.forEach(function (obj) {
				console.log(obj);
				const url = obj.images.original.url;
				const width = obj.images.fixed_width.width;
				const title = obj.title;

				resultsHTML += `<img src="${url}" class="item" width="${width}" alt="${title}">`;
			});
			resultsEl.innerHTML = resultsHTML;
		})
		.catch(function (err) {
			console.log(err.message);
		});
}

let su = document.getElementById('videoG');
su.addEventListener('click', () => {
	const q = 'video Game';
	sugere(q);
});

let runi = document.getElementById('runni');
runi.addEventListener('click', () => {
	const q = 'running';
	sugere(q);
});

///--------------------------TENDENCIA
function tendencia() {
	const apikey = 'nOL9RdzkjVbBSToCAGvB0qaImzh0Ra7C';
	const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=6`;

	fetch(path)
		.then(function (res) {
			return res.json();
		})
		.then(function (json) {
			console.log(json.data[0].images.original.url);
			const resultsEl = document.getElementById('resultado');
			let resultsHTML = '';
			json.data.forEach(function (obj) {
				console.log(obj.images.original.url);
				const url = obj.images.original.url;
				const title = obj.title;

				resultsHTML += `<img src="${url}" class="itemm" alt="${title}">`;
			});
			resultsEl.innerHTML = resultsHTML;
		})
		.catch(function (err) {
			console.log(err.message);
		});
}
tendencia();
