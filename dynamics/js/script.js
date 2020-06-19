  let body = document.getElementById("inicio");
  let form = document.getElementById("iniciar");
  /*let nombre = document.getElementById("name").value;
  if (nombre==true){
    console.log(nombre)
    let tiempo = new Date();
    tiempo.setTime(tiempo.getTime() + 1000*60*60*24);
    document.cookie = "nombre=nombre; expires=" + tiempo.toGMTString();
    document.cookie;
  }
  alert(nombre);*/
  function recibir()
   {
       let valor = document.getElementById("texto").value;
       return valor;
   } 