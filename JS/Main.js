// Seleccionamos los elementos necesarios
const pantalla = document.querySelector('.pantalla');
const botones = document.querySelectorAll('button');

let operacionActual = '';
let operacionAnterior = '';
let operador = null;

// Función para actualizar la pantalla
function actualizarPantalla(valor) {
    if (valor === '') {
        pantalla.value = '0';
    } else {
        pantalla.value = valor;
    }
}

// Función para realizar el cálculo
function calcular() {
    let resultado;
    const numeroAnterior = parseFloat(operacionAnterior);
    const numeroActual = parseFloat(operacionActual);

    if (isNaN(numeroAnterior) || isNaN(numeroActual)) return;
 
    switch (operador) {
        case '+':
            resultado = numeroAnterior + numeroActual;
            break;
        case '-':
            resultado = numeroAnterior - numeroActual;
            break;
        case '*':
            resultado = numeroAnterior * numeroActual;
            break;
        case '/':
            resultado = numeroAnterior / numeroActual;
            break;
        default:
            return;
    }

    operacionActual = resultado.toString();
    operador = null;
    operacionAnterior = '';
}

// Evento para todos los botones
botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const valor = e.target.value;

        // Si el botón es un número o un punto
        if (!isNaN(valor) || valor === '.') {
            if (operacionActual.includes('.') && valor === '.') return; // No permitimos múltiples puntos decimales
            operacionActual += valor;
            actualizarPantalla(operacionActual);
        }

        // Si el botón es un operador
        if (['+', '-', '*', '/'].includes(valor)) {
            if (operacionActual === '') return;
            if (operacionAnterior !== '') {
                calcular(); // Si ya hay una operación anterior, calculamos el resultado parcial
            }
            operador = valor;
            operacionAnterior = operacionActual;
            operacionActual = '';
        }

        // Si el botón es el igual
        if (valor === '=') {
            calcular();
            actualizarPantalla(operacionActual);
        }

        // Si el botón es borrar todo
        if (valor === 'borrar-todo') {
            operacionActual = '';
            operacionAnterior = '';
            operador = null;
            actualizarPantalla('0');
        }

        // Si el botón es borrar el último dígito
        if (valor === 'borrar') {
            operacionActual = operacionActual.slice(0, -1);
            actualizarPantalla(operacionActual);
        }
    });
});
