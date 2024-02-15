const canvas = document.getElementById('radarChart');
const ctx = canvas.getContext('2d');

function drawRadar() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el gráfico
    // Aquí irá el código para dibujar el radar
    // Variables de configuración
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    const numAxis = 4; // Número de ejes
    const angle = (Math.PI * 2) / numAxis; // Ángulo entre ejes

    // Dibujar ejes del radar
    for (let i = 0; i < numAxis; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const x = centerX + radius * Math.cos(angle * i);
        const y = centerY + radius * Math.sin(angle * i);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    // Dibujar subsecciones en los ejes y conectar los vértices
    const subsections = 3; // Número de subsecciones por eje
    const subsectionRadius = radius / subsections;

    ctx.strokeStyle = 'lightgray'; // Color de las líneas de las subsecciones

    for (let j = 1; j <= subsections; j++) {
        ctx.beginPath();
        const subRadius = subsectionRadius * j;
        for (let i = 0; i <= numAxis; i++) { // Usar <= para cerrar el círculo
            const x = centerX + subRadius * Math.cos(angle * i);
            const y = centerY + subRadius * Math.sin(angle * i);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
    // Dibujar títulos de ejes
    ctx.font = "16px Arial"; // Estilo de fuente para los títulos de los ejes
    ctx.fillStyle = "black"; // Color del texto
    const titles = ["Mando y Control", "Situación", "Decisión", "Comunicación"]; // Títulos de los ejes

    for (let i = 0; i < numAxis; i++) {
        const angleRadians = angle * i;
        const x = centerX + (radius + 20) * Math.cos(angleRadians);
        const y = centerY + (radius + 20) * Math.sin(angleRadians);

        // Ajusta la alineación y la base del texto según el cuadrante
        ctx.textAlign = (Math.cos(angleRadians) > 0) ? 'start' : 'end';
        ctx.textBaseline = (i === 0 || i === numAxis / 2) ? 'middle' : (Math.sin(angleRadians) > 0) ? 'top' : 'bottom';

        // Rota el texto en los ejes X para que la parte inferior de las letras mire hacia el centro
        if (i === 1 || i === numAxis - 1) { // Asumiendo ejes X a las posiciones 1 y numAxis-1
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 2 * (Math.cos(angleRadians) > 0 ? 1 : -1));
            ctx.fillText(titles[i], 0, 0);
            ctx.restore();
        } else {
            ctx.fillText(titles[i], x, y);
        }
    }

    const data = [7, 3, 8, 5]; // Tus datos
    const totalScore = data.reduce((acc, value) => acc + value, 0);
    console.log("Total de la puntuación:", totalScore);

    // Dibuja los puntos y conecta
    ctx.beginPath();
    ctx.fillStyle = "rgba(151,187,205,0.2)"; // Opacidad ajustada

    data.forEach((value, index) => {
        const dataAngle = angle * index;
        // Ajusta el cálculo de dataRadius si es necesario para adaptarse a tu escala
        const dataRadius = (value / totalScore) * radius; // Ejemplo de ajuste de escala
        const x = centerX + dataRadius * Math.cos(dataAngle);
        const y = centerY + dataRadius * Math.sin(dataAngle);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    ctx.closePath();
    ctx.fillStyle = "rgba(151,187,205,0.2)";
    ctx.fill();
    ctx.strokeStyle = "rgba(151,187,205,1)";
    ctx.stroke();

    // Objeto para almacenar propiedades animadas
    const animationProps = { fillOpacity: 0.2 };

    // Función para renderizar el polígono y los puntos medianos
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

        // Actualiza el estilo de relleno basado en la propiedad animada
        ctx.fillStyle = `rgba(151,187,205,${animationProps.fillOpacity})`;

        // Dibuja el polígono y los puntos medianos aquí
        // Usando `points` y `polygonColor` como en tu ejemplo
        // Asume que 'points' es un array de objetos {x, y} para cada vértice del polígono
        const points = calculatePolygonPoints(data); // Implementa esta función según tu lógica de cálculo de puntos

        // Color del polígono
        const polygonColor = "rgba(151,187,205,1)";

        // Dibuja los puntos medianos
        for (let i = 0; i < points.length; i++) {
            // Obtiene los puntos actual y el siguiente
            const currentPoint = points[i];
            const nextPoint = points[(i + 1) % points.length]; // Usa el operador módulo para cerrar el polígono

            // Calcula el punto medio
            const midPoint = {
                x: (currentPoint.x + nextPoint.x) / 2,
                y: (currentPoint.y + nextPoint.y) / 2
            };

            // Dibuja el punto mediano
            ctx.fillStyle = polygonColor; // Usa el mismo color que el polígono para los puntos medianos
            ctx.beginPath();
            ctx.arc(midPoint.x, midPoint.y, 3, 0, Math.PI * 2); // Ajusta el tamaño del punto según sea necesario
            ctx.fill();
        }
    }

    // Anima la opacidad del relleno del polígono
    gsap.to(animationProps, {
        fillOpacity: 1, // Anima hacia una opacidad completa
        duration: 1,
        ease: "power1.out",
        onUpdate: render // Llama a `render` en cada actualización de la animación
    });

    // Asegúrate de llamar a `render` inicialmente para dibujar el estado inicial
    render();

}

drawRadar(); // Llamar a la función para dibujar el gráfico
