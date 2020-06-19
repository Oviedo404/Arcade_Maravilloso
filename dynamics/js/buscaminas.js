//Tal vez si nos hubieran dado esta funcion antes no se me hbaría caído el pelo del estres
function obtenerCookie(clave) { //Función para obener el valor de una cookie existente. En caso de no existir se devuelve "".
  var name = clave + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

//Con esta funcion se genera la pagina al perder
function lostgame(cuerpo, salir, info, tablero, contador){
  cuerpo.removeChild(info);
  cuerpo.removeChild(tablero);
  let final = document.createElement("div");
  final.setAttribute("id", "fin");
  cuerpo.appendChild(final);
  final.innerHTML = "<h1 id='end'>End Game</h1><h4 id='punct'>Puntuación: "+contador+"</h4>";
  let regresar = document.createElement("div");
  regresar.addEventListener("click", ()=>{
    let tiempo = new Date();
    tiempo.setTime(tiempo.getTime() - 1);
    document.cookie = "dificulty=easy; expires=" + tiempo.toGMTString();
    document.cookie;
    document.cookie = "dificulty=medium; expires=" + tiempo.toGMTString();
    document.cookie;
    document.cookie = "dificulty=hard; expires=" + tiempo.toGMTString();
    document.cookie;
    window.location = "../index.html";
  });
  regresar.setAttribute("id", "regreso");
  regresar.innerHTML = "<button id='button'>Regresar</button>";
  final.appendChild(regresar);
}
//Con esta funcion se forma la página al perder
function winedgame(cuerpo, salir, info, tablero, contador, casillas){
  cuerpo.removeChild(info);
  cuerpo.removeChild(tablero);
  let final = document.createElement("div");
  final.setAttribute("id", "fin");
  cuerpo.appendChild(final);
  final.innerHTML = "<h1 id='end'>¡Has ganado!</h1><h4 id='punct'>Puntuación: "+contador+"</h4>";
  let regresar = document.createElement("div");
  regresar.addEventListener("click", ()=>{
    let tiempo = new Date();
    tiempo.setTime(tiempo.getTime() - 1);
    document.cookie = "dificulty=easy; expires=" + tiempo.toGMTString();
    document.cookie;
    document.cookie = "dificulty=medium; expires=" + tiempo.toGMTString();
    document.cookie;
    document.cookie = "dificulty=hard; expires=" + tiempo.toGMTString();
    document.cookie;
    window.location = "../index.html";
  });
  regresar.setAttribute("id", "regreso");
  regresar.innerHTML = "<button id='button'>Regresar</button>";
  final.appendChild(regresar);
}

//Con esta funcion los espacios en blanco expanden la función descubrir a los demás
function expandir(abajo, atras, arriba, enfrente, centro, central, casillas, tamano, contador){
    for (let d = abajo; d <= arriba; d++) {
      for (let c = atras; c <= enfrente; c++) {
        let cuadro = d + "" + c;
        let cuadrado = document.getElementById(cuadro);
        if (cuadrado.textContent == "") {
          if (casillas[d][c] == 0) {
            if (d == centro && c == central) {
              cuadrado.textContent = "";
              cuadrado.style.backgroundColor = "white";
              cuadrado.style.backgroundImage = "url('../statics/media/img/pastoquemado.jpg')";
            }
            else if (cuadrado.style.backgroundColor != "white") {
              contador+=1;
              contador=descubrir(d, c, casillas, tamano, contador);
            }
          }
          else if (casillas[d][c] != "bomba"){
            document.getElementById(cuadro).innerHTML = "<p>" + casillas[d][c] + "</p>";
            cuadrado.style.backgroundColor = "white";
            cuadrado.style.backgroundImage = "url('../statics/media/img/pastoquemado.jpg')";
            contador+=casillas[d][c]*10;
          }
        }
      }
    }
    return contador;
};
//Con esta funcion se muestran los numeros de las casillas
function descubrir(va, wa, casillas, tamano, contador){
    if (va == 0 && wa == 0) {
      contador=expandir(va, wa, va + 1, wa + 1, va, wa, casillas, tamano, contador);
    }
    else if (va == 0 && (wa > 0 && wa < tamano-1)) {
      contador=expandir(va, wa - 1, va + 1, wa + 1, va, wa, casillas, tamano, contador);
    }
    else if (va == 0 && wa == tamano-1) {
      contador=expandir(va, wa - 1, va + 1, wa, va, wa, casillas, tamano, contador);
    }
    else if (( va > 0 && va < tamano-1) && wa == tamano-1) {
      contador=expandir(va - 1, wa - 1, va + 1, wa, va, wa, casillas, tamano, contador);
    }
    else if (va==tamano-1 && wa == tamano-1) {
      contador=expandir(va - 1, wa - 1, va, wa, va, wa, casillas, tamano, contador);
    }
    else if (va==tamano-1 && (wa > 0 && wa < tamano-1)) {
      contador=expandir(va - 1, wa - 1, va, wa + 1, va, wa, casillas, tamano, contador);
    }
    else if (va==tamano-1 && wa == 0 ) {
      contador=expandir(va - 1, wa, va, wa + 1, va, wa,casillas, tamano, contador);
    }
    else if ((va > 0 && va < tamano-1) && wa==0 ) {
      contador=expandir(va - 1, wa, va + 1, wa + 1, va, wa, casillas, tamano, contador);
    }
    else {
      contador=expandir(va - 1, wa - 1, va + 1, wa + 1, va, wa, casillas, tamano, contador);
    }
    return contador;
}
//Con esta se asignan los numeros de las bombas cercanas a cada casilla
function numeritos(abajo, atras, arriba, enfrente, casillas){
    for (let q = abajo; q <= arriba; q++) {
      for (let o = atras; o <= enfrente; o++) {
        if (casillas[q][o] != "bomba") {
          casillas[q][o] = (parseInt(casillas[q][o]+1))
        }
      }
    }
}
//Con esta funcion ubicmaos a las casillas de los bordes del tablero
function adyacentes(casillas, tamano){
    for (var v = 0; v < tamano; v++) {
      for (var w = 0; w < tamano; w++) {
        if (casillas[v][w] == "bomba") {
          if ( v == 0 && w == 0) {
            numeritos(v, w, v+1, w+1, casillas);
          }
          else if (v == 0 && (w > 0 && w < tamano-1)) {
            numeritos(v, w - 1, v + 1, w + 1, casillas);
          }
          else if (v == 0 && w == tamano-1) {
            numeritos(v, w - 1, v + 1, w, casillas);
          }
          else if (( v > 0 && v < tamano-1) && w == tamano-1 ) {
            numeritos(v-1, w-1, v+1, w, casillas);
          }
          else if (v==tamano-1 && w == tamano-1) {
            numeritos(v-1, w-1, v, w, casillas);
          }
          else if (v==tamano-1 && (w > 0 && w < tamano-1)) {
            numeritos(v-1, w-1, v, w+1, casillas);
          }
          else if (v==tamano-1 && w == 0 ) {
            numeritos(v-1, w, v, w+1, casillas);
          }
          else if ( w==0 && (v > 0 && v < tamano-1)) {
            numeritos(v-1, w, v+1, w+1, casillas);
          }
          else {
            numeritos(v-1, w -1, v+1, w+1, casillas);
          }
        }
      }
    }
}
//con esta función eliminamos las lasCookies
function comercookies() {
  let tiempo = new Date();
  tiempo.setTime(tiempo.getTime() - 1);
  document.cookie = "dificulty=easy; expires=" + tiempo.toGMTString();
  document.cookie;
  document.cookie = "dificulty=medium; expires=" + tiempo.toGMTString();
  document.cookie;
  document.cookie = "dificulty=hard; expires=" + tiempo.toGMTString();
  document.cookie;
  window.location.reload();
}
//Con esta funcion generamos el tablero del buscaminas y llamaos  las demás funciones
function buscaminasuwu(tamano, long){
    let cuerpo = document.getElementById("buscaminas");
    let header = document.getElementById("titulo");
    //Aqui se crea es asided para visualizar las instrucciones y la puntuación
    let info = document.createElement("aside");
    info.setAttribute("id", "info");
    cuerpo.appendChild(info);
    let contador=0;
    info.innerHTML = "<section id='score'>Puntuación: "+contador+"</section>";
    let inst = document.createElement("div");
    inst.setAttribute("id", "inst");
    inst.innerHTML = "<h3 id='tit'>Instrucciones:</h3> <div>El juego consiste en despejar todas las casillas de una pantalla que no oculten una mina. Al hacer click derecho algunas casillas revelarán un número que indica las minas que existen en todas las casillas circundantes. Si se descubre una casilla sin número indica que ninguna de las casillas vecinas tiene mina y estas se descubren automáticamente. Si se descubre una casilla con una mina se pierde la partida, para ganar, seleccione todas las minas con clik izquierdo</div>";
    info.appendChild(inst);
    //y finalmente se crea el tablero, dependiendo de la dificultas cambia el tamaño
    let tablero = document.createElement("div");
    tablero.setAttribute("id", "tablero");
    cuerpo.appendChild(tablero);
    let casillas=[];
    let random;
    let random2;
    let bombitas;
    var dificultad =obtenerCookie("dificulty");;
    if (dificultad=="easy") {
      bombitas=3;
    }
    else if (dificultad=="medium") {
      bombitas=7;
    }
    else if (dificultad == "hard"){
      bombitas = 13;
    }
    else {
      console.log("kestapazandaaa");
    }
    //Aqui generamos las bombas aleatoriamente
    for (var m = 0; m < tamano; m++) {
        casillas[m]=[];
        for (var n = 0; n < tamano; n++) {
            casillas[m][n]=0;
        }
    }
    for (let z = 0; z < bombitas; z++) {
      do {
         random = Math.floor(Math.random()*tamano);
         random2 = Math.floor(Math.random()*tamano);
      } while (casillas[random][random2]=="bomba");
      casillas[random][random2] = "bomba";
    }
    adyacentes(casillas, tamano);
    //Con este div creamos un boton que elimine las cookies y regrese al inicio
    let salir = document.createElement("div");
    salir.addEventListener("click", ()=>{
      let tiempo = new Date();
      tiempo.setTime(tiempo.getTime() + 1000*60*60*24);
      document.cookie = "casillas="+casillas+"; expires=" + tiempo.toGMTString();
      document.cookie;
      window.location = "../index.html";
    });
    salir.setAttribute("id", "salida");
    salir.innerHTML = "<button id='button'>Salir</button>";
    header.appendChild(salir);
    //ahora creamos las casillas
    for (let a = 0; a < tamano; a++) {
      for (let b = 0; b < tamano; b++) {
        let casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.style.backgroundImage = "url('../statics/media/img/pasto.jpg')";
        casilla.style.width = long + "%";
        casilla.style.height = long + "%";
        casilla.setAttribute("id", a + "" + b);
        let cinta=0;
        //evento para click derecho que muestra la casilla
        casilla.addEventListener("click", ()=>{
          if (cinta==0) {
            let ids = casilla.id.split("");
            let id1 = parseInt(ids[0],10);
            let id2 = parseInt(ids[1],10);
            let cuadro = ids[0] + ids [1];
            let cuadrado = document.getElementById(cuadro)
            if (casillas[id1][id2] == 0) {
              contador+=1;
              casilla.style.backgroundImage = "url('../statics/media/img/pastoquemado.jpg')";
              cuadrado.style.backgroundColor = "white";
              contador=descubrir(id1, id2, casillas, tamano, contador, info);
              info.innerHTML = "<section id='score'>Puntuación: "+contador+"</section>";
              info.appendChild(inst);
            }
            else if (casillas[id1][id2] != "bomba") {
              contador+=casillas[id1][id2]*10;
              info.innerHTML = "<section id='score'>Puntuación: "+contador+"</section>";
              info.appendChild(inst);
              casilla.style.backgroundImage = "url('../statics/media/img/pastoquemado.jpg')";
              cuadrado.innerHTML = "<p>" + casillas[id1][id2] + "</p>";
              cuadrado.style.backgroundColor = "white";
            }
            else {
              cuadrado.style.backgroundImage = "url(../statics/media/img/mina.png)";
              lostgame(cuerpo, salir, info, tablero, contador);
            }
          }
        });
        let ids = casilla.id.split("");
        let id1 = parseInt(ids[0],10);
        let id2 = parseInt(ids[1],10);
        let bombotas = 0;
        if (casillas[id1][id2] == "bomba") {
          bombotas=1;
        }
        //evento para el click izquierdo que cambia el fondo y detecta si la casilla tiene una bomba
        casilla.oncontextmenu = function () {
          let ids = casilla.id.split("");
          let id1 = parseInt(ids[0],10);
          let id2 = parseInt(ids[1],10);
          let cuadro = ids[0] + ids [1];
          if (cinta==0 && casillas[id1][id2] == "bomba"){
            casilla.style.backgroundImage = "url('../statics/media/img/pasto_cinta.jpg')";
            cinta=1;
            if (bombotas==1) {
              bombitas-=1;
              bombotas=0;
              if (bombitas==0){
                winedgame(cuerpo, salir, info, tablero, contador, casillas);
              }
            }
          }
          else if (cinta==0 && casillas[id1][id2] != "bomba"){
            casilla.style.backgroundImage = "url('../statics/media/img/pasto_cinta.jpg')";
            cinta=1;
            bombitas+=1;
            if (bombitas==0){
              winedgame(cuerpo, salir, info, tablero, contador, casillas);
            }
          }
          else if (cinta==1 && casillas[id1][id2] != "bomba"){
            casilla.style.backgroundImage = "url('../statics/media/img/pasto.jpg')";
            cinta=0;
            bombitas-=1;
            if (bombitas==0){
              winedgame(cuerpo, salir, info, tablero, contador, casillas);
            }
          }
          else if (cinta==1 && casillas[id1][id2] == "bomba") {
            casilla.style.backgroundImage = "url('../statics/media/img/pasto.jpg')";
            cinta=0;
            if (bombotas==0) {
              bombitas+=1;
              bombotas=1;
              if (bombitas==0){
                winedgame(cuerpo, salir, info, tablero, contador, casillas);
              }
            }
          }
          return false;
        }
        tablero.appendChild(casilla);
      }
    }
}
//Con esta funcion generamos la página con la seleccion de dificultad
function dificulty(){
  let cuerpo = document.getElementById("buscaminas");
  let header = document.getElementById("titulo");
  let salir = document.createElement("div");
  salir.addEventListener("click", ()=>{
    comercookies();
    window.location = "../index.html";
  });
  salir.setAttribute("id", "salida");
  salir.innerHTML = "<button id='button'>Salir</button>";
  header.appendChild(salir);
  let form = document.createElement("div");
  form.setAttribute("id", "dificulty");
  cuerpo.appendChild(form);
  //para guardar los datos necesitamos una cookie
  let easy = document.createElement("div");
  easy.classList.add("dif");
  easy.setAttribute("id", "facil");
  //para facil
  easy.addEventListener("click", ()=>{
    let tiempo = new Date();
    tiempo.setTime(tiempo.getTime() + 1000*60*60*24);
    document.cookie = "dificulty=easy; expires=" + tiempo.toGMTString();
    window.location.reload();
  });
  form.appendChild(easy);
  let muestra1 = document.createElement("div");
  muestra1.classList.add("muestra");
  muestra1.style.backgroundImage = "url(../statics/media/img/easy.png)";
  easy.appendChild(muestra1);
  let desc1 = document.createElement("div");
  desc1.classList.add("desc");
  easy.appendChild(desc1);
  desc1.innerHTML = "<h5>Fácil</h5>";
  //para medio
  let medium = document.createElement("div");
  medium.classList.add("dif");
  medium.setAttribute("id", "medium");
  medium.addEventListener("click", ()=>{
    let tiempo = new Date();
    tiempo.setTime(tiempo.getTime() + 1000*60*60*24);
    document.cookie = "dificulty=medium; expires=" + tiempo.toGMTString();
    window.location.reload();
  });
  form.appendChild(medium);
  let muestra2 = document.createElement("div");
  muestra2.classList.add("muestra");
  muestra2.style.backgroundImage = "url(../statics/media/img/medium.png)";
  medium.appendChild(muestra2);
  let desc2 = document.createElement("div");
  desc2.classList.add("desc");
  medium.appendChild(desc2);
  desc2.innerHTML = "<h5>Medio</h5>";
  //para dificil
  let hard = document.createElement("div");
  hard.classList.add("dif");
  hard.setAttribute("id", "hard");
  hard.addEventListener("click", ()=>{
    let tiempo = new Date();
    tiempo.setTime(tiempo.getTime() + 1000*60*60*24);
    document.cookie = "dificulty=hard; expires=" + tiempo.toGMTString();
    window.location.reload();
  });
  form.appendChild(hard);
  let muestra3 = document.createElement("div");
  muestra3.classList.add("muestra");
  muestra3.style.backgroundImage = "url(../statics/media/img/hard.png)";
  hard.appendChild(muestra3);
  let desc3 = document.createElement("div");
  desc3.classList.add("desc");
  hard.appendChild(desc3);
  desc3.innerHTML = "<h5>Difícil</h5>";
}

//Inicio del programa
//Recibe el nombre y si hay una cookie de la dificultad genera el tablero, si no, te manda a la seleccion de dificultad
let name=obtenerCookie("name");
let usuario = document.getElementById("user");
let nombre = document.createElement("div");
nombre.setAttribute("id", "usaurio");
nombre.innerHTML = "<h3 id='nickname'>"+name+"</h3>";
usuario.appendChild(nombre);
let dificultad=obtenerCookie("dificulty");
if (dificultad=="easy") {
  var tamano = 5;
  var long = 19;
  buscaminasuwu(tamano, long);
}
else if (dificultad=="medium") {
  var tamano = 7;
  var long = 13;
  buscaminasuwu(tamano, long);
}
else if (dificultad=="hard") {
  var tamano = 10;
  var long = 9;
  buscaminasuwu(tamano, long);
}
else {
  dificulty();
}