//Area juego principal
// dos espacios en blanco -> &nbsp&nbsp
var palabras = ['AUTO', 'LAPTOP', 'TECLADO','CAFE', 'PANTALLA', 'PLAYA', 'LUNA', 'PYTHON', 'ANGULAR'];
var intentos = 6;
var indice = Math.round(Math.random()*(palabras.length-1))
var palabra_seleccionada = palabras[indice];
console.log(palabra_seleccionada);
var longitud_palabra = palabra_seleccionada.length;
var letras_erradas = document.querySelector('.letras-erradas');
var contador_img = 0;
var contador_letras = 0;
var letras_acertadas = [];
var teclas_especiales = ['TAB', 'CONTROL', 'ALT', 'META', 'SHIFT', 'CAPSLOCK', 'TAB', 'ENTER', 'NUMLOCK', 'PAGEDOWN', 'END', 'DELETE', 'INSERT', 'HOME', 'PAGEUP', 'SCROLLLOCK', 'PAUSE', 'BACKSPACE', 'ESCAPE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];



for(let i = longitud_palabra; i<8; i++){
  //Modificamos el espacio necesario para que entre la palabra
  let num = '.letra-'+i;
  let letter = document.querySelector(num);
  letter.style.display = "none";
}


document.addEventListener('keydown', (event) => {
  //Escuchador de eventos para tecla presionada//
  var tecla_presionada = event.key.toUpperCase();
  var codigo_ascii = tecla_presionada.charCodeAt();
  var letras = letras_erradas.textContent;
  
  if(teclas_especiales.includes(tecla_presionada)){
    //Evitamos que se lea alguna de las teclas especiales
    codigo_ascii = 0;
  }
  if((codigo_ascii >= 65) && (codigo_ascii <= 90)){
    //Si la tecla presionada es una letra, continuamos...
    if(palabra_seleccionada.includes(tecla_presionada)){
      //Consultamos si la tecla presionada esta incluida en la palabra
      for(let i=0; i<longitud_palabra;i++){
        if(tecla_presionada == palabra_seleccionada[i]){
          //Si la tecla presionada esta contenida en la posicion de la cadena se visibiliza
          if((intentos > 0) || (contador_letras != longitud_palabra)){
            let num = '.letra-'+i;
            let letter = document.querySelector(num);
            letter.textContent = tecla_presionada;
          }
          if(letras_acertadas.length == 0){
            //Creamos la lista de letras acertadas
            letras_acertadas.push(tecla_presionada);
            contador_letras+=1
          }else{
            if(!letras_acertadas.includes(tecla_presionada)){
              //si la letra no esta contenida en la lista se agrega y suma al contador
              letras_acertadas.push(tecla_presionada);
              contador_letras+=1;
            }
          }
        }
      }

      if(contador_letras == longitud_palabra){
        let titulo = document.querySelector('#texto-titulo');
        titulo.textContent = '¡GANASTE!';
        titulo.classList.remove('perdiste');
        titulo.classList.add('ganaste');
      }

    }else{
      //Si no esta incluida se muestra en letras erradas y te resta un intento
      if(letras.length == 0){
        letras_erradas.textContent = tecla_presionada;
        contador_img+=1;
        imagen_ahorcado.src = lista_imagenes[contador_img];
        intentos-=1;
      }else{
        if(!letras.includes(tecla_presionada)){
          if((intentos > 0) || (contador_letras != longitud_palabra)){
            letras_erradas.textContent = letras+'  '+tecla_presionada;
          }else{
            let titulo = document.querySelector('#texto-titulo');
            titulo.textContent = '¡PERDISTE!';
            titulo.classList.remove('ganaste');
            titulo.classList.add('perdiste');
          }
          contador_img+=1;
          if(contador_img>6){
            contador_img = 6;
          }
          imagen_ahorcado.src = lista_imagenes[contador_img];
          intentos-=1;
        }
      }

      
    }

  }

}, false);

