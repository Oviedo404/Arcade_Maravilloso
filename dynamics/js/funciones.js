var x = 100;
var y = 100;
var canvas;
var contexto;
var player;
var imagenEnemigo;

var teclaPulsada = null;
var tecla = [];
var colorBala = "red";
var balas_array = new Array();
var enemigos_array = new Array();
var balasEnemigas_array = new Array();
var de;
var puntos = 0;
var finJuego = false;

function Bala(x,y,w){
	this.x = x;
	this.y = y;
	this.w = w;
	this.dibuja = function(){
		contexto.save();
		contexto.fillStyle = colorBala;
		contexto.fillRect(this.x, this.y, this.w, this.w);
		this.y = this.y - 4;
		contexto.restore();
	};
	this.dispara = function(){
		contexto.save();
		contexto.fillStyle = colorBala;
		contexto.fillRect(this.x, this.y, this.w, this.w);
		this.y = this.y + 6;
		contexto.restore();
	};
}
function Jugador(x){
	this.x = x;
	this.y = 400;
	this.w = 30;
	this.h = 15;
	this.dibuja = function(x){
		this.x = x;
		contexto.drawImage(player, this.x, this.y, this.w, this.h);
	};
}
function Enemigo(x,y){
	this.x = x;
	this.y = y;
	this.w = 35;
	this.veces = 0;
	this.dx = 5;
	this.ciclos = 0;
	this.num = 14;
	this.figura = true;
	this.vive = true;
	this.dibuja = function(){
		if(this.ciclos > 30){
			if(this.veces>this.num){
				this.dx *= -1;
				this.veces = 0;
				this.num = 28;
				this.y += 20;
				this.dx = (this.dx>0)? this.dx++:this.dx--;
			} else {
				this.x += this.dx;
			}
			this.veces++;
			this.ciclos = 0;
			this.figura = !this.figura;
		} else {
			this.ciclos++;
		}
		if(this.vive){
			if(this.figura){
				contexto.drawImage(imagenEnemigo,0,0,40,30, this.x, this.y, 35,30);
			} else {
				contexto.drawImage(imagenEnemigo,50,0,35,30, this.x, this.y, 35, 30);
			}
		} else {
			contexto.fillStyle = "black";
			contexto.fillRect(this.x, this.y, 35, 30);
		}

	};
}
function anima(){
	if(finJuego==false){
		requestAnimationFrame(anima);
		verifica();
		pinta();
		colisiones();
	}
}
function score(){
	contexto.save();
	contexto.fillStyle = "#FFFFFF";
	contexto.clearRect(0,0,canvas.width,40);
	contexto.font = "25px Courier";
	contexto.fillText("Puntuación: "+puntos,10,20);
	contexto.restore();
}
function mensaje(cadena){
	var lon = (canvas.width-(63*cadena.length))/2;
	contexto.fillStyle = "White";
	contexto.clearRect(0,0,canvas.width, canvas.height);
	contexto.font = "bold 100px Rosewood Std";
	contexto.fillText(cadena,lon,220);
}
function mensaje2(cadena){
	var lon = (canvas.width-(70*cadena.length))/2;
	contexto.fillStyle = "red";
	contexto.clearRect(0,0,canvas.width, canvas.height);
	contexto.font = "bold 100px Rosewood Std";
	contexto.fillText(cadena,lon,220);
}
function colisiones(){
	for(var i=0; i<enemigos_array.length; i++){
		for(var j=0; j<balas_array.length; j++){
			enemigo = enemigos_array[i];
			bala = balas_array[j];
			if(enemigo != null && bala != null){
				if((bala.x > enemigo.x)&&
					(bala.x < enemigo.x+enemigo.w)&&
					(bala.y > enemigo.y)&&
					(bala.y < enemigo.y+enemigo.w)){
						enemigo.vive = false;
						enemigos_array[i] = null;
						balas_array[j] = null;
						puntos += 10;
					}
			}
		}
	}
	for(var j=0; j<balasEnemigas_array.length; j++){
		bala = balasEnemigas_array[j];
		if(bala != null){
			if((bala.x > jugador.x)&&
				(bala.x < jugador.x+jugador.w)&&
				(bala.y > jugador.y)&&
				(bala.y < jugador.y+jugador.h)){
					gameOver();
			}
		}
	}
}
function gameOver(){
	contexto.clearRect(0,0,canvas.width,canvas.height);
	balas_array = [];
	enemigos_array = [];
	balasEnemigas_array = [];
	clearTimeout(de);
	finJuego = true;
	mensaje2("GAME OVER");
}
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var BARRA = 32;

function verifica(){
	if(tecla[KEY_RIGHT]) x+=10;
	if(tecla[KEY_LEFT]) x-=10;
	if(x>canvas.width-10) x = canvas.width -10;
	if(x<0) x = 0;
	//Disparo
	if(tecla[BARRA]){
		balas_array.push(
		new Bala(jugador.x+12,jugador.y-3,5));
		tecla[BARRA]=false;
		disparaEnemigo();
	}
}
function pinta(){
	contexto.clearRect(0,0,canvas.width, canvas.height);
	score();
	jugador.dibuja(x);
	for(var i=0; i<balas_array.length; i++){
		if(balas_array[i]!=null){
			balas_array[i].dibuja();
			if(balas_array[i].y<0) balas_array[i] = null;
		}
	}
	for(var i=0; i<balasEnemigas_array.length; i++){
		if(balasEnemigas_array[i]!=null){
			balasEnemigas_array[i].dispara();
			if(balasEnemigas_array[i].y>canvas.height) balasEnemigas_array[i] = null;
		}
	}
	numEnemigos = 0;
	for(var i=0; i<enemigos_array.length; i++){
		if(enemigos_array[i] != null){
			enemigos_array[i].dibuja();
			numEnemigos++;
			if(enemigos_array[i].y==jugador.y) gameOver();
		}
	}
	if(numEnemigos==0) gameOver();
}
function disparaEnemigo(){
	var ultimos = new Array();
	for(var i=enemigos_array.length-1; i>0; i--){
		if(enemigos_array[i]!=null){
			ultimos.push(i);
		}
		if(ultimos.length==10) break;
	}
	d = ultimos[Math.floor(Math.random()*10)];
	balasEnemigas_array.push(new Bala(enemigos_array[d].x+enemigos_array[d].w/2,
	enemigos_array[d].y,5));
}
window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback){window.setTimeout(callback,17);}
})();
document.addEventListener("keydown",function(e){
	teclaPulsada=e.keyCode;
	tecla[e.keyCode]=true;
});
document.addEventListener("keyup",function(e){
	tecla[e.keyCode]=false;
});
window.onload = function(){
	canvas = document.getElementById("Tablero");
	if(canvas && canvas.getContext){
		contexto = canvas.getContext("2d");
		if(contexto){
			x = canvas.width/2;
			 player = new Image();
			 imagenEnemigo = new Image();
			 imagenEnemigo.src = "../statics/media/img/enemigo.png";
			 player.src = "../statics/media/img/jugador.png";
			 mensaje("INVADERS");
			 player.onload = function(){
				jugador = new Jugador(0);
				setTimeout(anima,3500);
			 }
			 imagenEnemigo.onload = function(){
				for(var i=0; i<6; i++){
					for(var j=0; j<10; j++){
						enemigos_array.push(new Enemigo(100+40*j, 30+45*i));
					}
				}
				de = setTimeout(disparaEnemigo,3500);
			 }
		}
	}
}
let header = document.getElementById("titulo");
var name = "Nombre";
let usuario = document.getElementById("user");
let nombre = document.createElement("div");
nombre.setAttribute("id", "usuario");
nombre.innerHTML = "<h3 id='nickname'>"+name+"</h3>";
usuario.appendChild(nombre);
let reiniciar = document.createElement("div");
    reiniciar.addEventListener("click", ()=>{
      let tiempo = new Date();
      tiempo.setTime(tiempo.getTime() - 1);

      //document.cookie = "dificulty=hard; expires=" + tiempo.toGMTString();
      //document.cookie;
      window.location.reload();
    });
reiniciar.setAttribute("id", "salida");
reiniciar.innerHTML = "<button id='button'>Reiniciar</button>";
header.appendChild(reiniciar);