// timerWorker.js

var tiempoRestante = 15 * 60; // 15 minutos en segundos

// Función para iniciar la cuenta atrás
function iniciarCuentaRegresiva() {
    setInterval(function() {
        tiempoRestante -= 1;
        postMessage(tiempoRestante);
        if (tiempoRestante <= 0) {
            close(); // Termina el worker cuando la cuenta atrás llega a 0
        }
    }, 1000);
}

// Inicia la cuenta atrás cuando el worker se pone en marcha
iniciarCuentaRegresiva();
