//con esta función eliminamos las lasCookies
function comercookies(name, color) {
  let tiempo = new Date();
  tiempo.setTime(tiempo.getTime() - 1);
  document.cookie = "name="+name+"; expires=" + tiempo.toGMTString();
  document.cookie = "color="+color+"; expires=" + tiempo.toGMTString();
  window.location.reload();
}

function crearIndice(name, color){
  let cuerpo = document.getElementById("cuerpo");
  let form = document.getElementById("iniciar");
  cuerpo.removeChild(form);
  let nombrar = document.createElement("div");
  nombrar.setAttribute("id", "nombrar");
  cuerpo.appendChild(nombrar);
  let indice = document.createElement("div");
  indice.setAttribute("id", "indice");
  cuerpo.appendChild(indice);
  nombrar.innerHTML = "<h1 id='nombrar'>¡Hola "+name+"!</h1><h3>¿Qué quieres jugar?</h3>";
  indice.innerHTML="<button class='botoncitosuwu' id='buttonbusca'>Buscaminas</button><button class='botoncitosuwu' id='buttonkarel'>Karel Dug</button><button class='botoncitosuwu' id='buttonspace'>Space Invaders</button> <button class='botoncitosuwu' id='cerrar'>Cerrar Sesión</button>";
  let minas = document.getElementById("buttonbusca");
  minas.addEventListener("click", ()=>{
    window.location = "./templates/buscaminas.html";
  });
  let dog = document.getElementById("buttonkarel");
  dog.addEventListener("click", ()=>{
    window.location = "./templates/digdug.html";
  });
  let space = document.getElementById("buttonspace");
  space.addEventListener("click", ()=>{
    window.location = "./templates/Space.html";
  });
  let cerrar = document.getElementById("cerrar");
  cerrar.addEventListener("click", ()=>{
    comercookies(name, color);
  });
}
function obtenerCookie(clave) { //Función para obener el valor de una cookie existente. En caso de no existir se devuelve "".
  let name = clave + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

let boton = document.getElementById("botoncito");
boton.addEventListener("click", ()=>{
  let name = document.getElementById("name").value;
  let color = document.getElementById("color").value;
  let tiempo = new Date();
  if ((color!="M" && color!="O")||name=="") {
    alert("¡¡¡Ese no es un valor aceptado!!!")
  }
  else{
    window.location.reload();
    document.cookie = "name="+name;
    document.cookie = "color="+color;
  }
});
let name=obtenerCookie("name");
if (name!="") {
  crearIndice(name, color)
}