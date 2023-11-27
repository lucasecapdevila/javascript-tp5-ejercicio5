//  Variables
const tiempo = document.getElementById('tiempo'),
btnIniciar = document.getElementById('inicio'),
btnPausar = document.getElementById('pausa'),
btnDetener = document.getElementById('detener')

let idInterval,
tiempoInicio = null,
diferenciaDeTiempo = 0



//  Funciones
const mostrarElemento = (elemento) => {
  elemento.classList.remove('d-none')
}

const ocultarElemento = (elemento) => {
  elemento.classList.add('d-none')
}

const agregarCeroSiEsNecesario = (valor) => {
  if(valor < 10){
    return '0' + valor
  } else{
    return '' + valor
  }
}

const milisegundosASegundosYMinutos = (milisegundos) => {
  const minutos = parseInt(milisegundos / 60000)
  milisegundos -= minutos * 60 * 1000
  segundos = milisegundos / 1000
  return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`
}

const iniciarCronometro = () => {
  const ahora = new Date()
  tiempoInicio = new Date(ahora.getTime() - diferenciaDeTiempo)
  clearInterval(idInterval)
  idInterval = setInterval(actualizarTiempo, 100)
  ocultarElemento(btnIniciar)
  ocultarElemento(btnDetener)
  mostrarElemento(btnPausar)
}

const pausarCronometro = () => {
  diferenciaDeTiempo = new Date() - tiempoInicio.getTime()
  clearInterval(idInterval)
  mostrarElemento(btnIniciar)
  ocultarElemento(btnPausar)
  mostrarElemento(btnDetener)
}

const actualizarTiempo = () => {
  const ahora = new Date()
  const diferencia = ahora.getTime() - tiempoInicio.getTime()
  tiempo.textContent = milisegundosASegundosYMinutos(diferencia)
}

const reiniciarCronometro = () => {
  if(!confirm('¿Desea reiniciar el cronometro?')){
    return
  }
  clearInterval(idInterval)
  inicio()
  diferenciaDeTiempo = 0
}

const inicio = () => {
  tiempo.textContent = '00:00.0'
  ocultarElemento(btnPausar)
  ocultarElemento(btnDetener)
}

inicio()

btnIniciar.addEventListener('click', iniciarCronometro)
btnPausar.addEventListener('click', pausarCronometro)
btnDetener.addEventListener('click', reiniciarCronometro)