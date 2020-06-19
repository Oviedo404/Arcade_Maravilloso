let tabla = document.getElementsByClassName('tierra')[0];
let contenedor = document.getElementById("contenedor");
let mundo = document.getElementsByTagName("body")[0];
let puntos = document.getElementsByClassName("puntaje")[0];
let vidas = document.getElementsByClassName("vidas")[0];
let rondas = document.getElementsByClassName("ronda")[0];



//Tamaño del mundo
let width=23;
let height=17;

let width_2=24;
let height_2=18;


class taizo{
  constructor(y,x,est, ind, ori){
    this.y=y;
    this.x=x;
    this.est=est;  //1 vivo, 2 disparando, 3 muerto
    this.ind=ind;
    this.ori=ori;
  }
}

class celda{
  constructor(y,x,est,ind){
    this.y=y;
    this.x=x;
    this.est=est;
    this.ind=ind;
  }
}

class p{
  constructor(y,x,est,num,ind){
    this.y=y;
    this.x=x;
    this.est=est;
    this.num=num;
    this.ind=ind;
  }
}

class pooka{
  constructor(est, vel, ind, estInd, num, x, y, des){
    this.est=est;  //1 Vivo, 2 congelado, 3 espera, 4 muerto
    this.vel=vel;
    this.ind=ind;
    this.estInd=estInd;
    this.num=num;
    this.indAcutal = ind;
    this.time=NaN;
    this.x=x;
    this.y=y;
    this.des=des;
  }
}
//Celdas: 0-Celda, 1-Taizo, 2-CeldaDes, 4-Bomba, 3-Piedras, 5-Enemigo


let x, x_length = 24;
let y, y_length= 18;
let celdas=[];
let estado=[];

///Posición de Taizo
let taizoX=12;
let taizoY=9;
let dirX=0;
let dirY=0;

//Definición del jugador
let ind=228;
let ori="der";
let taizoHori= new taizo (taizoY, taizoX, 1, ind, ori);

let c=0;
//Construir tablero
function tablero(){
  console.log(taizoHori);
  console.log(taizoX);
  console.log(taizoY);
  for (y = 0; y < y_length; y++) {
    for (x = 0; x < x_length; x++) {
      if(x==taizoX){
        if(y<taizoY){
          estado[c]= new celda(y,x,2,c);
        }
        if(y==taizoY){
          estado[c]= new celda(y,x,1,c);
        }
        if(y>taizoY){
          estado[c] = new celda(y,x,0,c);
        }
      }
      else{
        estado[c] = new celda(y,x,0,c);
      }
      c++;
    }
  }
}


//Crear tunel y celdas en el mundo
function creaTablero(){
  for(indice in estado){
    let celdaD = document.createElement("div");
    if(estado[indice].est==2){
      celdaD.classList.add("celdaDes");
    }
    if(estado[indice].est==1){
      console.log("Taizo");
      celdaD.classList.add("taizoder");
    }
    if(estado[indice].est==0){
        celdaD.classList.add("celda");
    }
     tabla.appendChild(celdaD);
  }
}

function nivelMod(niv ){
  let ene=0;
  if(niv==1){
    ene=4;
    tunelEnemigo(3 );
    crearEnemigo(ene,niv);
  }else if(niv==2 || niv==3){
    ene=5;
    crearEnemigo(ene,niv);
    tunelEnemigo(4);
  }else if(niv==4){
    ene=5;
    crearEnemigo(ene,niv);
    tunelEnemigo(4);
  }else if(niv==6){
    ene=6;
    crearEnemigo(ene,niv);
    tunelEnemigo(4 );
  }else if(niv==7){
    ene=6;
    crearEnemigo(ene,niv);
    tunelEnemigo();
  }else if(niv==8){
    ene=6;
    crearEnemigo(ene,niv);
    tunelEnemigo(5);
  }else if(niv==9){
    ene=6;
    crearEnemigo(ene,niv);
    tunelEnemigo(5);
  }else if(niv==10){
    ene=6;
    crearEnemigo(ene,niv);
    tunelEnemigo(5);
  }else if(niv>10){
    ene=6;
    crearEnemigo(ene,niv);
    let nivel=Math.round(Math.random()*(10-6)+6);
    tunelEnemigo(nivel);
  }else if(niv==50){
    tunelEnemigo(4);
  }
}

let pookas=[];
function crearEnemigo(num, niv){
  let nivel=parseInt(niv);
//  let vel=100*nivel;
  //let ind;
  for(let i=0;i<num;i++){
    let velo=(200*niv)+i;
    let vel=velo;
    let bool=true;
    let ind=indice;
    while(bool==true){
      x=Math.round(Math.random()*(23-0)+0);
      if(x!=12){
        for(indice in estado){
          if(estado[indice].est==2 && estado[indice].x!=12 && estado[indice].x==x){
            ind=indice;
            bool=false;
          }
        }
      }
    }
    let celdaPook= tabla.getElementsByTagName("div")[ind];
    estado[ind].est=5;
    let xP=estado[ind].x;
    let yP=estado[ind].y;
    let estInd=2;
    pookas[i]=new pooka(1, vel, ind, estInd, i, xP, yP, 0);
    celdaPook.classList.add("pooka");
  }
}

function movimientoPooka(pooka,  ){
  const direcciones=[+1,-1,+width_2,-width_2];
  let direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  //let aleatorio = 0;
  pooka.time = setInterval(()=>{
  //  if(aleatorio<4){
      let ind=parseInt(pooka.ind);
      let indVerif=ind+direccion;
      if(indVerif>=0 && indVerif<=431 && estado[indVerif].est!=0 && estado[indVerif].est!=5  && estado[indVerif].est!=3  && pooka.est==1 && pooka.estInd==2){
      //  console.log(estado[ind].ind);
        let estVi=estado[indVerif].est
        estado[ind].est=2;
        let xMP=estado[indVerif].x;
        let yMP=estado[indVerif].y;
        estado[indVerif].est=5;
        pooka.ind=indVerif;
        pooka.estInd=estVi;
        pooka.x=xMP;
        pooka.y=yMP;
        let celdaViPook=tabla.getElementsByTagName("div")[ind];
        let celdaNovPook=tabla.getElementsByTagName("div")[indVerif];
        celdaViPook.classList.add("celdaDes");
        celdaNovPook.classList.add("pooka");
        celdaViPook.classList.remove("pooka");;
        celdaNovPook.classList.remove("celdaDes");
      }else{
        if(pooka.estInd==4){
          pooka.est=2;
          let celdaInPook=tabla.getElementsByTagName("div")[pooka.ind];
          celdaInPook.classList.add("pookaInf");
          celdaInPook.classList.remove("pooka");
          if(taizoHori.est==1){
            if(puntaje<1500){
              celdaInPook.classList.add("pookaPar");
              celdaInPook.classList.remove("pookaInf");
              pooka.est=3;
              setTimeout(()=>{
                pooka.est=1;
                pooka.estInd=2;
                celdaInPook.classList.add("celdaDes");
                celdaInPook.classList.remove("pookaPar");
                celdaInPook.classList.remove("bomba");
              },1000);
            }else{
              celdaInPook.classList.add("pookaPar");
              celdaInPook.classList.remove("pookaInf");
              pooka.est=4;
              clearInterval(pooka.time);
              celdaInPook.classList.add("pookaMor");
              setTimeout(()=>{
                celdaInPook.classList.remove("pookaPar");
                celdaInPook.classList.remove("bomba");
                estado[pooka.ind].est=2;
                celdaInPook.classList.add("celdaDes");
                celdaInPook.classList.remove("pookaMor");
                pookas.splice(pooka.num, 1);
              },800);
            }
          }
        }
        if(pooka.estInd==1){
          golpeEnemigo();
        }
        direccion= direcciones[Math.round(Math.random() * direcciones.length)];
      }
  },pooka.vel);
}

function golpeEnemigo( ){ //Ayuda
  pookas.forEach(pooka => clearInterval(pooka.time))
  mundo.removeEventListener("keyup", controlHori);
  mundo.removeEventListener("keydown",bomba);
  mundo.removeEventListener("keyup",bomba);
  let celdaM=tabla.getElementsByTagName("div")[taizoHori.ind];
  console.log(celdaM);
  celdaM.classList.add("taizoM");
  celdaM.classList.remove("pooka");
  celdaM.classList.remove("taizoder");
  setTimeout(()=>{
    vidasR--;
    vidas.innerText="Vidas "+vidasR;
    taizoHori.ind=228;
    taizoHori.x=12;
    taizoHori.y=9;
    taizoHori.ind=228;
    taizoHori.ori="der";
    taizoX=12;
    taizoY=9;
    //$(".tierra").remove();
    reinicioJ(puntaje,vidasR,nivel);
  },10000);
}

function subenivel(){
  nivel++;
  nivel.innerText="Vidas "+nivel;
  reinicioJ(puntaje,vidasR,nivel);
}

function tunelEnemigo(num){
 //1 vertical, 0 horizontal
  for(let i=0; i<=num;i++){
    let pos=Math.round(Math.random());
    let ind;
    if(pos==0){
      let bool=true;
      do{
        ind=Math.round(Math.random()*(429-2)+2);
        let x=estado[ind].x;
        let y=estado[ind].y;
        if(x>=2 && x<=22 && x!=10  && x!=13 &&x!=14 &&x!=12 &&x!=11){
          bool=false;
        }
      }while(bool==true)
      if(estado[ind].est==0 && estado[ind-1].est==0 && estado[ind+1].est==0){
        let celda=tabla.getElementsByTagName("div")[ind];
        let celda2=tabla.getElementsByTagName("div")[ind-1];
        let celda3=tabla.getElementsByTagName("div")[ind+1];
        celda.classList.add("celdaDes");
        celda2.classList.add("celdaDes");
        celda3.classList.add("celdaDes");
        celda.classList.remove("celda");
        celda2.classList.remove("celda");
        celda3.classList.remove("celda");
        estado[ind].est=2;
        estado[ind-1].est=2;
        estado[ind+1].est=2;
      }else{
        i--;
      }
    }else if(pos==1){
      let bool=true;
      do{
        ind=Math.round(Math.random()*(429-2)+2);
        let y=estado[ind].y;
        let x=estado[ind].x;
        if(x!=10  && x!=13 &&x!=14 &&x!=12 &&x!=11 && y>=2 && y<=16){
          bool=false;
        }
      }while(bool==true)
      if(estado[ind].est==0 && estado[ind+24].est==0 && estado[ind-24].est==0){
        let celda=tabla.getElementsByTagName("div")[ind];
        let celda2=tabla.getElementsByTagName("div")[ind+24];
        let celda3=tabla.getElementsByTagName("div")[ind-24];
        celda.classList.add("celdaDes");
        celda2.classList.add("celdaDes");
        celda3.classList.add("celdaDes");
        celda.classList.remove("celda");
        celda2.classList.remove("celda");
        celda3.classList.remove("celda");
        estado[ind].est=2;
        estado[ind+24].est=2;
        estado[ind-24].est=2;
      }else{
        i--;
      }
    }
  }
}

function alePiedraX(l){
  let bool=true;
  l=parseInt(l);
  do{
    if(l==0){
      x=Math.round(Math.random()*(9-2)+2);
    }else if(l==1){
      x=Math.round(Math.random()*(21-14)+14 );
    }else if(l==2){
      x=Math.round(Math.random()*(9-2)+2);
    }else if(l==3){
      x=Math.round(Math.random()*(21-14)+14);
    }
    for(indice in estado){
      if(estado[indice].est==0){
        bool=false;
        return x;
      }
    }
  }while(bool==true)
}

function alePiedraY(l){
  let bool=true;
  do{
    if(l==0){
      y=Math.round(Math.random()*(8-2)+2);
    }else if(l==1){
      y=Math.round(Math.random()*(8-2)+2);
    }else if(l==2){
      y=Math.round(Math.random()*(14-9)+9);
    }else if(l==3){
      y=Math.round(Math.random()*(14-9)+9);
    }
    for(indice in estado){
      if(estado[indice].est==0){
        bool=false;
        return y;
      }
    }
  }while(bool==true)
}

let piedra=[];
//Construir piedras
function compPiedra(){
  for (let j = 0; j < 4; j++) {
    let x=alePiedraX(j);
    let y=alePiedraY(j);
    for(indice in estado){
      if(estado[indice].x==x && estado[indice].y==y){
        let celda =tabla.getElementsByTagName("div")[indice];
        celda.classList.add("piedra");
        celda.classList.remove("celda");
        estado[indice].est=3;
        piedra[j]= new p(y,x,1,j,indice);
      }
    }
  }
}

//Función del disparo de la bomba
function bomba(event){
  let tecla=event.keyCode;
  let tipo=event.type;
  let ind=taizoHori.ind;
  let ori=taizoHori.ori;
  if(tecla==13){
    let bool=true;
    if(tipo==="keydown"){
      do{
        if(ori=="arr"){
          taizoHori.est=2;
          let uno=ind-24;
          if(uno>=0 && estado[uno].est==2){
            let celUno=tabla.getElementsByTagName("div")[uno];
            celUno.classList.add("bomba");
            celUno.classList.remove("celdaDes");
            estado[uno].est=4;
            let dos=ind-48;
            if(dos>=0 && estado[dos].est==2){
              let celDos=tabla.getElementsByTagName("div")[dos];
              celDos.classList.add("bomba");
              celDos.classList.remove("celdaDes");
              estado[dos].est=4;
              let tres=ind-72;
              if(tres>=0 && estado[tres].est==2){
                let celTres=tabla.getElementsByTagName("div")[tres];
                celTres.classList.add("bomba");
                celTres.classList.remove("celdaDes");
                estado[tres].est=4;
              }else{
                bool=false;
              }
            }else{
              bool=false
            }
          }else{
            bool=false;
          }
        }else if(ori=="aba"){
          taizoHori.est=2;
          let uno=ind+24;
          if(uno<=431 && estado[uno].est==2){
            let celUno=tabla.getElementsByTagName("div")[uno];
            celUno.classList.add("bomba");
            celUno.classList.remove("celdaDes");
            estado[uno].est=4;
            let dos=ind+48;
            if(dos<=431 && estado[dos].est==2){
              let celDos=tabla.getElementsByTagName("div")[dos];
              celDos.classList.add("bomba");
              celDos.classList.remove("celdaDes");
              estado[dos].est=4;
              let tres=ind+72;
              if(tres<=431 && estado[tres].est==2){
                let celTres=tabla.getElementsByTagName("div")[tres];
                celTres.classList.add("bomba");
                celTres.classList.remove("celdaDes");
                estado[tres].est=4;
              }else{
                bool=false;
              }
            }else{
              bool=false
            }
          }else{
            bool=false;
          }
        }else if(ori=="der"){
          taizoHori.est=2;
          let uno=ind+1;
          if(uno<=431 && estado[uno].est==2){
            let celUno=tabla.getElementsByTagName("div")[uno];
            celUno.classList.add("bomba");
            celUno.classList.remove("celdaDes");
            estado[uno].est=4;
            let dos=ind+2;
            if(dos<=431 && estado[dos].est==2){
              let celDos=tabla.getElementsByTagName("div")[dos];
              celDos.classList.add("bomba");
              celDos.classList.remove("celdaDes");
              estado[dos].est=4;
              let tres=ind+3;
              if(tres<=431 && estado[tres].est==2){
                let celTres=tabla.getElementsByTagName("div")[tres];
                celTres.classList.add("bomba");
                celTres.classList.remove("celdaDes");
                estado[tres].est=4;
              }else{
                bool=false;
              }
            }else{
              bool=false
            }
          }else{
            bool=false;
          }
        }else if(ori=="izq"){
          taizoHori.est=2;
          let uno=ind-1;
          if(uno>=0 && estado[uno].est==2){
            let celUno=tabla.getElementsByTagName("div")[uno];
            celUno.classList.add("bomba");
            celUno.classList.remove("celdaDes");
            estado[uno].est=4;
            let dos=ind-2;
            if(dos>=0 && estado[dos].est==2){
              let celDos=tabla.getElementsByTagName("div")[dos];
              celDos.classList.add("bomba");
              celDos.classList.remove("celdaDes");
              estado[dos].est=4;
              let tres=ind-3;
              if(tres>=0 && estado[tres].est==2){
                let celTres=tabla.getElementsByTagName("div")[tres];
                celTres.classList.add("bomba");
                celTres.classList.remove("celdaDes");
                estado[tres].est=4;
              }else{
                bool=false;
              }
            }else{
              bool=false
            }
          }else{
            bool=false;
          }
        }
       }while(bool==true)
    }else if(tipo==="keyup"){
      taizoHori.est=1;
      for(indice in estado){
        if(estado[indice].est==4){
          estado[indice].est=2;
          let celRem=tabla.getElementsByTagName("div")[indice];
          celRem.classList.add("celdaDes");
          celRem.classList.remove("bomba");
        }
      }
    }
  }
}

//Movimiento de Hori
function controlHori(evento){
  let pos=taizoHori.ind;
  let nov=tabla.getElementsByClassName("taizo"+taizoHori.ori)[0];
  let viX=taizoHori.x;
  let viY=taizoHori.y;
  let novX;
  let novY;
  switch(event.keyCode){
    case 65:
    if(taizoHori.x!==0 && taizoHori.est==1){
      if(estado[pos-1].est==2 || estado[pos-1].est==0 ){
        estado[pos].est=2;
        nov.classList.add("celdaDes");
        nov.classList.remove("taizo"+taizoHori.ori);
        novX=viX-1;
        taizoHori.x=novX;
        taizoHori.ori="izq";
        for(indice in estado){
          if(estado[indice].x==novX){
            if(estado[indice].y==viY){
              let novInd=indice;
              novInd=parseInt(novInd,10);
              taizoHori.ind=novInd;
              estado[indice].est=1;
              let cel=tabla.getElementsByTagName("div")[indice];
              if(cel.classList=="celda"){
                puntaje=puntaje+10;
                puntos.innerText="Puntaje: "+puntaje;
                cel.classList.remove("celda");
                cel.classList.add("taizoizq");
              }else{
                cel.classList.remove("celdaDes");
                cel.classList.add("taizoizq");
              }
            }
          }
        }
      }
    }
    break;
    case 87:
    if(taizoHori.y!==0 && taizoHori.est==1){
      if(estado[pos-24].est==2 || estado[pos-24].est==0){
        estado[pos].est=2;
        nov.classList.add("celdaDes");
        nov.classList.remove("taizo"+taizoHori.ori);
        novY=viY-1;
        taizoHori.y=novY;
        taizoHori.ori="arr";
        for(indice in estado){
          if(estado[indice].y==novY){
            if(estado[indice].x==viX){
              let novInd=indice;
              novInd=parseInt(novInd,10);
              taizoHori.ind=novInd;
              estado[indice].est=1;
              let cel=tabla.getElementsByTagName("div")[indice];
              if(cel.classList=="celda"){
                cel.classList.remove("celda");
                puntaje=puntaje+10;
                puntos.innerText="Puntaje: "+puntaje;
                cel.classList.add("taizoarr");
              }else{
                cel.classList.remove("celdaDes");
                cel.classList.add("taizoarr");
              }
            }
          }
        }
      }
    }
    break;
    case 83:
    if(taizoHori.y!==height && taizoHori.est==1){
      if(estado[pos+24].est==0 || estado[pos+24].est==2){
        estado[pos].est=2;
        nov.classList.add("celdaDes");
        nov.classList.remove("taizo"+taizoHori.ori);
        novY=viY+1;
        taizoHori.y=novY;
        taizoHori.ori="aba";
        for(indice in estado){
          if(estado[indice].y==novY){
            if(estado[indice].x==viX){
              let novInd=indice;
              novInd=parseInt(novInd,10);
              taizoHori.ind=novInd;
              estado[indice].est=1;
              let cel=tabla.getElementsByTagName("div")[indice];
              if(cel.classList=="celda"){
                puntaje=puntaje+10;
                puntos.innerText="Puntaje: "+puntaje;
                cel.classList.remove("celda");
                cel.classList.add("taizoaba");
              }else{
                cel.classList.remove("celdaDes");
                cel.classList.add("taizoaba");
              }
            }
          }
        }
      }
    }
    break;
    case 68:
    if(taizoHori.x!==width && taizoHori.est==1){
        if(estado[pos+1].est==0 || estado[pos+1].est==2){
        estado[pos].est=2;
        nov.classList.add("celdaDes");
        nov.classList.remove("taizo"+taizoHori.ori);
        novX=viX+1;
        taizoHori.x=novX;
        taizoHori.ori="der";
        for(indice in estado){
          if(estado[indice].x==novX){
            if(estado[indice].y==viY){
              let novInd=indice;
              novInd=parseInt(novInd,10);
              taizoHori.ind=novInd;
              estado[indice].est=1;
              let cel=tabla.getElementsByTagName("div")[indice];
              if(cel.classList=="celda"){
                puntaje=puntaje+10;
                puntos.innerText="Puntaje: "+puntaje;
                cel.classList.remove("celda");
                cel.classList.add("taizoder");
              }else{
                cel.classList.remove("celdaDes");
                cel.classList.add("taizoder");
              }
            }
          }
        }
      }
    }
    break;
  }
}


//Puntajes, nivel y vidas
let puntaje=0;
let vidasR=3;
let nivel=1;
if(vidasR==3 && nivel==1){
  tablero();
  creaTablero();
  reinicioF(0, 3, 1);
}
function reinicioJ(puntos, taizoV, nivel){
  tabla.innerHTML="";
  console.log(estado);
  console.log(taizoHori);
  console.log(taizoX);
  console.log(taizoY);
  creaTablero();
  mundo.addEventListener("keyup", controlHori);
  mundo.addEventListener("keydown",bomba);
  mundo.addEventListener("keyup",bomba);
  puntos.innerText="Puntaje: "+puntos;
  vidas.innerText="Vidas " +taizoV;
  rondas.innerText="LEVEL"+nivel;
  elem=setTimeout(()=>{
    compPiedra();
    nivelMod(nivel);
    if(pookas.length>0){
      pookas.forEach(pooka => movimientoPooka(pooka));
    }else{
      subenivel();
    }
  },2000);
}

function reinicioF(puntos, taizoV, nivel){
  mundo.addEventListener("keyup", controlHori);
  mundo.addEventListener("keydown",bomba);
  mundo.addEventListener("keyup",bomba);
  puntos.innerText="Puntaje: "+puntos;
  vidas.innerText="Vidas " +taizoV;
  rondas.innerText="LEVEL"+nivel;
  elem=setTimeout(()=>{
    compPiedra();
    nivelMod(nivel);
    if(pookas.length>0){
      pookas.forEach(pooka => movimientoPooka(pooka));
    }else{
      subenivel();
    }
  },2000);
}




//bicho();
//bicho2();
//tocaPiedra();// puede ser en el movimiento
//subonivel();
//tunelEnemigo();
//ganar();
