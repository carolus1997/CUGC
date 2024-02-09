var intervalo;

function iniciarCuentaRegresiva() {
    detenerCuentaRegresiva();
    var tiempoRestante = 15 * 60;
    actualizarTiempo(tiempoRestante);
    intervalo = setInterval(function() {
        tiempoRestante -= 1;
        actualizarTiempo(tiempoRestante);
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            document.getElementById('cuentaRegresiva').textContent = "¡Tiempo agotado!";
        }
    }, 1000);
}

function detenerCuentaRegresiva() {
    if (intervalo) clearInterval(intervalo);
}

function reiniciarCuentaRegresiva() {
    detenerCuentaRegresiva();
    document.getElementById('cuentaRegresiva').textContent = "15:00";
}

function actualizarTiempo(tiempoRestante) {
    var minutos = parseInt(tiempoRestante / 60, 10);
    var segundos = parseInt(tiempoRestante % 60, 10);
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    document.getElementById('cuentaRegresiva').textContent = minutos + ":" + segundos;
}

document.getElementById('iniciarCuentaRegresiva').addEventListener('click', iniciarCuentaRegresiva);
document.getElementById('detenerCuentaRegresiva').addEventListener('click', detenerCuentaRegresiva);
document.getElementById('reiniciarCuentaRegresiva').addEventListener('click', reiniciarCuentaRegresiva);

// Verifica si los Web Workers están disponibles
if (window.Worker) {
    var myWorker = new Worker('timerWorker.js');

    myWorker.onmessage = function(e) {
        var tiempoRestante = e.data;
        var minutos = parseInt(tiempoRestante / 60, 10);
        var segundos = parseInt(tiempoRestante % 60, 10);

        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        document.getElementById('cuentaRegresiva').textContent = minutos + ":" + segundos;

        if (tiempoRestante <= 0) {
            document.getElementById('cuentaRegresiva').textContent = "¡Tiempo agotado!";
            myWorker.terminate(); // Termina el worker si la cuenta atrás ha finalizado
        }
    };
}
