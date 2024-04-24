// Función para mostrar fecha y hora en tiempo real
function mostrarFechaHora() {
    // Obtenemos la fecha actual
    var fecha = new Date();
    // Obtenemos el día
    var dia = fecha.getDate();
    // Si el día es menor que 10, le añadimos un 0
    if (dia < 10) {
        dia = "0" + dia;
    }
    // Obtenemos el mes
    var mes = fecha.getMonth() + 1;
    // Si el mes es menor que 10, le añadimos un 0
    if (mes < 10) {
        mes = "0" + mes;
    }
    // Obtenemos el año
    var year = fecha.getFullYear();
    // Obtenemos las horas
    var horas = fecha.getHours();
    // Si las horas son menores que 10, le añadimos un 0
    if (horas < 10) {
        horas = "0" + horas;
    }
    // Obtenemos los minutos
    var minutos = fecha.getMinutes();
    //
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    // Obtenemos los segundos
    var segundos = fecha.getSeconds();
    //
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    // Obtenemos el día de la semana
    var diaSemana = fecha.getDay();
    // Array con los días de la semana

    var semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    // Array con los meses del año
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    // Mostramos la fecha
    document.getElementById("DiaSemana").textContent = semana[diaSemana];
    document.getElementById("Dia").textContent = dia;
    document.getElementById("Mes").textContent = meses[mes - 1];
    document.getElementById("Year").textContent = year;
    // Mostramos la hora
    document.getElementById("Horas").textContent = horas;
    document.getElementById("Minutos").textContent = minutos;
    document.getElementById("Segundos").textContent = segundos;
    // Actualizamos la fecha y hora
    setTimeout("mostrarFechaHora()", 1000);
}
// Ejectuamos la función
mostrarFechaHora();

//