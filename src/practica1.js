/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	this.gs = gs;
	this.cards = [];
	this.initGame = function(){
		console.log(this.gs.maps);
		var that=this;
		Object.keys(this.gs.maps).forEach(function(key){
			that.cards.push(new MemoryGameCard(key));
			that.cards.push(new MemoryGameCard(key));
		});
		//prueba.sort(function(){return 0.5 - Math.random()}); -> Esta linea te desordena un array
		//console.log(this.cards);
		this.loop();
	};
	this.draw = function(){};
	this.loop = function(){};
	this.onClick = function(cardId){};
};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	this.id = id;
	this.states = {
		UP: 0,
		DOWN: 1,
		FOUND: 2
	};
	this.state = states.DOWN;
	this.flip = function(){};
	this.found = function(){};
	this.compareTo = function(otherCard){};
	this.draw = function(gs, pos){};
};


/*GRUPO 12*/