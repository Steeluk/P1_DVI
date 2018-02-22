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
	this.state = "Memory Game";
	this.pairsFounds = 0;

	this.initGame = function(){
		//console.log(this.gs.maps);
		var that=this;
		Object.keys(this.gs.maps).forEach(function(key){
		    if (key !== "back") {
                that.cards.push(new MemoryGameCard(key));
                that.cards.push(new MemoryGameCard(key));
            }
		});
		this.cards.sort(function(){return 0.5 - Math.random()}); //-> Esta linea te desordena un array
		this.loop();
	};
	this.draw = function(){
        var that=this;
		gs.drawMessage(this.state);
		this.cards.forEach(function (card, index) {
		    card.draw(that.gs, index);
        })
	};
	this.loop = function(){
	    var that = this;
        setInterval(function() {that.draw() }, 16); //this.draw.bind(this)
    };
	this.onClick = function(cardId){
	    var that = this;
        var clickedCard = this.cards[cardId];
        var secondCard;
        var count = 0;

        this.cards.forEach(function (card) {
            if(card.state === card.states.UP) {
                secondCard = card;
                count++;
            }
        });

        if(count === 0){
            clickedCard.flip();
        }
        if (count === 1 && clickedCard.state !== clickedCard.states.UP) {
            clickedCard.flip();
            if (clickedCard.compareTo(secondCard)) {
                that.state = "Match Found";
                secondCard.found();
                clickedCard.found();
                this.pairsFounds++;
            }
            else {

                that.state = "Try again";
                setTimeout(function () {
                    secondCard.flip();
                    clickedCard.flip();
                }, 600);
            }
        }

        if(this.pairsFounds === 8)
            this.state = "You Win!!";
    };
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
	this.state = this.states.DOWN;

	this.flip = function(){
	    if(this.state === this.states.UP)
            this.state = this.states.DOWN;
	    else if(this.state === this.states.DOWN)
            this.state = this.states.UP;
    };
	this.found = function(){
	    this.state = this.states.FOUND;
    };
	this.compareTo = function(otherCard){
	    return(this.id === otherCard.id);
    };
	this.draw = function(gs, pos){
	    if(this.state === this.states.DOWN)
            gs.draw("back", pos);
	    else
            gs.draw(this.id, pos);
    };
};


/*GRUPO 12*/