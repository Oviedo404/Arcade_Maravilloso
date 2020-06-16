let tabla = document.getElementsByClassName('tierra')[0];
let contenedor = document.getElementById("contenedor");
let mundo = document.getElementsByTagName("body")[0];
let puntos = document.getElementsByClassName("puntaje")[0];

let width=23;
let height=17;

class taizo{
  constructor(y,x,est, ind, ori){
    this.y=y;
    this.x=x;
    this.est=est;
    this.ind=ind;
    this.ori=ori;
  }
}

class celda{
  constructor(y,x,est){
    this.y=y;
    this.x=x;
    this.est=est;
  }
  modifCoord(x,y){
    if(celda.x==x){
      if(celda.y==y){
        return celda;
      }
    }
  }
}


let x, x_length = 24;
let y, y_length= 18;
let celdas=[];
let estado=[];

let taizoX=12;
let taizoY=9;
let c=0;

let dirX=0;
let dirY=0;


function tablero(){
  for (y = 0; y < y_length; y++) {
    //celdas[y] = [];
    for (x = 0; x < x_length; x++) {
      if(x==taizoX){
        if(y<taizoY){
          //celdas[y][x]=2;
          estado[c]= new celda(y,x,2);
        }
        if(y==taizoY){
        //  celdas[y][x]=1;
          estado[c]= new celda(y,x,1);
        }
        if(y>taizoY){
          //celdas[y][x] = 0;
          estado[c] = new celda(y,x,0);
        }
      }
      else{
        //celdas[y][x] = 0;
        estado[c] = new celda(y,x,0);
      }
      c++;
    }
  }
}

function creaTablero(){
  for(indice in estado){
    let celda = document.createElement("div");
    if(estado[indice].est==2){
      celda.classList.add("celdaDes");
    }
    if(estado[indice].est==1){
      celda.classList.add("taizo");
    }
    if(estado[indice].est==0){
      celda.classList.add("celda");
    }
    tabla.appendChild(celda);
  }
}

tablero();
creaTablero();
//CeldaDestruida=2 Taizo=1 Celda=0 Bomba=4
let ind=228;
let ori="der";
let taizoHori= new taizo (taizoY, taizoX, 1, ind, ori);
let puntaje=0;

function calCelda(dir,ind){
  let dis=0;
  let priCelda;
  let segCelda;
  let terCelda;
  if(dir=="izq"){
    priCelda=ind-1;
    segCelda=ind-2;
    terCelda=ind-3;
    if(estado[priCelda].est==2){
      dis=1;
      if(estado[segCelda].est==2){
        dis=2;
        if(estado[terCelda].est==2){
          dis=3;
        }
      }
    }
    return dis;
  }
  if(dir=="der"){
    priCelda=ind+1;
    segCelda=ind+2;
    terCelda=ind+3;
    if(estado[priCelda].est==2){
      dis=1;
      if(estado[segCelda].est==2){
        dis=2;
        if(estado[terCelda].est==2){
          dis=3;
        }
      }
    }
    return dis;
  }
  if(dir=="aba"){
    priCelda=ind+24;
    segCelda=ind+48;
    terCelda=ind+72;
    if(estado[priCelda].est==2){
      dis=1;
      if(estado[segCelda].est==2){
        dis=2;
        if(estado[terCelda].est==2){
          dis=3;
        }
      }
    }
    return dis;
  }
  if(dir=="arr"){
    priCelda=ind-24;
    segCelda=ind-48;
    terCelda=ind-72;
    if(estado[priCelda].est==2){
      dis=1;
      if(estado[segCelda].est==2){
        dis=2;
        if(estado[terCelda].est==2){
          dis=3;
        }
      }
    }
    return dis;
  }
}

function disparo(event,uno,dos,tres,dis){
  let rep=event.repeat;
  let tec=event.keyCode;
  let distancia=dis;
  if(distancia!=0 && tec==13){
    console.log(distancia+"d");
    let celUno=tabla.getElementsByTagName("div")[uno];
    let celDos=tabla.getElementsByTagName("div")[dos];
    let celTres=tabla.getElementsByTagName("div")[tres];
      console.log(distancia+"Holas");
      console.log("HOLA");
      console.log(distancia);
      if(distancia==1){
        celUno.classList.add("bomba");
        celUno.classList.remove("celdaDes");
        estado[uno].est=4;
      }else if(distancia==2){
        celUno.classList.add("bomba");
        celUno.classList.remove("celdaDes");
        estado[uno].est=4;
        celDos.classList.add("bomba");
        celDos.classList.remove("celdaDes");
        estado[dos].est=4;
      }else if(distancia==3){
        celUno.classList.add("bomba");
        celUno.classList.remove("celdaDes");
        estado[uno].est=4;
        celDos.classList.add("bomba");
        celDos.classList.remove("celdaDes");
        estado[dos].est=4;
        celTres.classList.add("bomba");
        celTres.classList.remove("celdaDes");
        estado[tres].est=4;
    }
  }
  if(rep==false && distancia!=0){
    console.log(distancia);
  }
    /*if(rep==false){
      if(dis==1){
        celUno.classList.add("celdaDes");
        celUno.classList.remove("bomba");
        estado[uno].est=2;
      }else if(dis==2){
        celUno.classList.add("celdaDes");
        celUno.classList.remove("bomba");
        estado[uno].est=2;
        celDos.classList.add("celdaDes");
        celDos.classList.remove("bomba");
        estado[dos].est=2;
      }else if(dis==3){
        celUno.classList.add("celdaDes");
        celUno.classList.remove("bomba");
        estado[uno].est=2;
        celDos.classList.add("celdaDes");
        celDos.classList.remove("bomba");
        estado[dos].est=2;
        celTres.classList.add("celdaDes");
        celTres.classList.remove("bomba");
        estado[tres].est=2;
      }
    }
  }*/
}

function bomba(dir,ind){
  let indNov=ind;
  let priCelda=0;
  let segCelda=0;
  let terCelda=0;
  if(dir=="izq"){
    priCelda=indNov-1;
    segCelda=indNov-2;
    terCelda=indNov-3;
    let dis_2=calCelda(dir,ind);
    console.log(dis_2);
    console.log(priCelda);
    console.log(segCelda);
    console.log(terCelda);
    disparo(event,priCelda,segCelda,terCelda,dis_2);
  }else if(dir=="der"){
    priCelda=indNov+1;
    segCelda=indNov+2;
    terCelda=indNov+3;
    let dis_2=calCelda(dir,ind);
    console.log(dis_2);
    console.log(priCelda);
    console.log(segCelda);
    console.log(terCelda);
    disparo(event,priCelda,segCelda,terCelda,dis_2);
  }else if(dir=="arr"){
    priCelda=indNov-24;
    segCelda=indNov-48;
    terCelda=indNov-72;
    let dis_2=calCelda(dir,ind);
    console.log(dis_2);
    console.log(priCelda);
    console.log(segCelda);
    console.log(terCelda);
    disparo(event,priCelda,segCelda,terCelda,dis_2);
  }else if(dir=="aba"){
    priCelda=indNov+24;
    segCelda=indNov+48;
    terCelda=indNov+72;
    let dis_2=calCelda(dir,ind);
    disparo(event,priCelda,segCelda,terCelda,dis_2);
  }
}

function controlHori(event){
  let pos=taizoHori.ind;
  let nov=tabla.getElementsByClassName("taizo")[0];
  let viX=taizoHori.x;
  let viY=taizoHori.y;
  let novX;
  let novY;
  switch(event.keyCode){
    case 65:
    if(taizoHori.x !=0 ){
      estado[pos].est=2;
      nov.classList.add("celdaDes");
      nov.classList.remove("taizo");
      novX=viX-1;
      taizoHori.x=novX;
      taizoHori.ori="izq";
      console.log(taizoHori);
      for(indice in estado){
        if(estado[indice].x==novX){
          if(estado[indice].y==viY){
            let novInd=indice;
            novInd=parseInt(novInd,10);
            taizoHori.ind=novInd;
            console.log(taizoHori);
            estado[indice].est=1;
            let cel=tabla.getElementsByTagName("div")[indice];
            if(cel.classList=="celda"){
              puntaje=puntaje+10;
              puntos.innerText="Puntaje: "+puntaje;
              cel.classList.remove("celda");
              cel.classList.add("taizo");
            }else{
              cel.classList.remove("celdaDes");
              cel.classList.add("taizo");
            }

          }
        }
      }
    }
    break;
    case 87:
    if(taizoHori.y!==0){
      estado[pos].est=2;
      nov.classList.add("celdaDes");
      nov.classList.remove("taizo");
    //  console.log(taizoY);
      novY=viY-1;
      taizoHori.y=novY;
      taizoHori.ori="arr";
      console.log(taizoHori);
      //console.log(novY);
    //  celdas[viX][novY]=2;
      for(indice in estado){
        if(estado[indice].y==novY){
          if(estado[indice].x==viX){
            let novInd=indice;
            novInd=parseInt(novInd,10);
            taizoHori.ind=novInd;
            console.log(taizoHori);
            estado[indice].est=1;
            let cel=tabla.getElementsByTagName("div")[indice];
            if(cel.classList=="celda"){
              cel.classList.remove("celda");
              puntaje=puntaje+10;
              puntos.innerText="Puntaje: "+puntaje;
              cel.classList.add("taizo");
            }else{
              cel.classList.remove("celdaDes");
              cel.classList.add("taizo");
            }
          }
        }
      }
    }
    break;
    case 83:
    if(taizoHori.y!==height){
      estado[pos].est=2;
      nov.classList.add("celdaDes");
      nov.classList.remove("taizo");
      novY=viY+1;
      taizoHori.y=novY;
      taizoHori.ori="aba";
      //console.log(taizoHori);
    //  celdas[viX][novY]=2;
      for(indice in estado){
        if(estado[indice].y==novY){
          if(estado[indice].x==viX){
            let novInd=indice;
            novInd=parseInt(novInd,10);
            taizoHori.ind=novInd;
            console.log(taizoHori);
            estado[indice].est=1;
            let cel=tabla.getElementsByTagName("div")[indice];
            if(cel.classList=="celda"){
              puntaje=puntaje+10;
              puntos.innerText="Puntaje: "+puntaje;
              cel.classList.remove("celda");
              cel.classList.add("taizo");
            }else{
              cel.classList.remove("celdaDes");
              cel.classList.add("taizo");
            }
          }
        }
      }
    }
    break;
    case 68:
    if(taizoHori.x !==width){
      estado[pos].est=2;
      nov.classList.add("celdaDes");
      nov.classList.remove("taizo");
      novX=viX+1;
      taizoHori.x=novX;
      taizoHori.ori="der";
      //console.log(taizoHori);
    //  celdas[viY][novX]=2;
      for(indice in estado){
        if(estado[indice].x==novX){
          if(estado[indice].y==viY){
            let novInd=indice;
            novInd=parseInt(novInd,10);
            taizoHori.ind=novInd;
            console.log(taizoHori);
            estado[indice].est=1;
            let cel=tabla.getElementsByTagName("div")[indice];
            if(cel.classList=="celda"){
              puntaje=puntaje+10;
              puntos.innerText="Puntaje: "+puntaje;
              cel.classList.remove("celda");
              cel.classList.add("taizo");
            }else{
              cel.classList.remove("celdaDes");
              cel.classList.add("taizo");
            }
          }
        }
      }
    }
    break;
    case 13:
      let ori=taizoHori.ori;
      let ind=taizoHori.ind;
      bomba(ori,ind);
    break;
    //13,65 iz,87 arr, 83 aba, 68 der
  }
}

/*function onKeyDownHandler(event) {
  var codigo =  event.key;
  if(codigo!== "A" && codigo!=="W" && codigo!=="S" && codigo!=="D" && codigo!=="a" && codigo!=="w"
  && codigo!=="s" && codigo!=="d" && codigo!=="Enter"){
    event.preventDefault();
  }
}
mundo.addEventListener("keyup",onKeyDownHandler);*/

mundo.addEventListener("keyup", controlHori);
mundo.addEventListener("keydown",disparo);
