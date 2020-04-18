
let display = document.getElementById ("display"),
	numAnt = document.getElementById ("num-ant"),
	nuevoNum = false, coma = false, mode = 1;

function resetParametros (){
	coma = false;
	display.value='';
	numAnt.innerHTML = '';
}

/*Funciones de Presentacion en Pantalla*/
function printNumber (valor){

	if (nuevoNum === true){
		resetParametros ();
		nuevoNum = false;
	}
	// No agrego otro punto si ya existe uno.
	if (coma === true && valor === '.')		return;
	// flag para el punto.
	if (valor === '.')	coma = true;
	
	/*Si convierto de binario a decimal solo puedo el '1', '2' y '.'*/
	if (mode === 2){
		if (valor === '1' || valor === '0' || valor === '.')
			display.value += valor;
	}
	/*Si convierto de decimal a binario puedo usar todos los botones.*/
	else{
		display.value += valor;	
	}
}

function elimNumber (){
	let caracter = display.value[display.value.length-1];

	if (caracter === '.')	coma = false;

	display.value = display.value.substr(0, display.value.length-1);
}

function result (){
	let number;
	
	number = display.value;
	numAnt.innerHTML = number;

	if (mode === 1) //DecToBin
	{
		number = parseFloat (number);
		display.value = decToBin (number);
	}
	if (mode === 2) //BinToDec
		display.value = binToDec (number);

	nuevoNum = true;
}

/*Funciones de los Botones*/
let elementDTB = document.getElementById ("DTB"),
		elementBTD = document.getElementById ("BTD");

function btnBTD(){
	elementBTD.classList.remove("bg-black");
	elementBTD.classList.add("bg-orange");
	elementDTB.classList.remove("bg-orange");
	elementDTB.classList.add("bg-black");
	resetParametros ();
	mode=2;
}

function btnDTB(){	
	elementDTB.classList.remove("bg-black");
	elementDTB.classList.add("bg-orange");
	elementBTD.classList.remove("bg-orange");
	elementBTD.classList.add("bg-black");
	resetParametros ();
	mode=1;
}

/*Funciones de Conversión de Números*/
const cNros=5;

function decToBin (numero) {

	let binario = new String,
		entero = Math.floor(numero);

	/*Caluclamos la parte entera*/
	while (entero >= 2){
		binario = String((entero%2)) + binario;
		entero = Math.floor(entero/2);
	}
	binario = String(entero) + binario;
	
	/*Parte Fraccionaria*/
	let frac = numero - Math.floor(numero);

	if (frac === 0)	return binario;
	
	binario += ',';
	
	for (let i=0; i < cNros; i++){
		frac *= 2;
		entero = Math.floor(frac);
		binario += entero;		
		frac -= entero;
		if (frac == 0) break;
	}

	return binario;
}

function binToDec (array) {
	let posComa = array.indexOf('.');
	let numero=0;

	if (posComa === -1)		posComa = array.length;
	
	for (i=1, j=posComa; i<=posComa; i++, j--){
		numero += parseInt(array[posComa-j]) * Math.pow(2, posComa-i);
	}

	if (posComa === array.length)	return numero;

	for (i=posComa+1; i<array.length; i++){
		numero += parseInt(array[i]) * 1/Math.pow(2, i-posComa);
	}

	return numero;
}