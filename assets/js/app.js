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

document.addEventListener('DOMContentLoaded', function () {
    cargarNoticias('noticias', 'assets/data/noticias.json');
    cargarNoticias('deportes', 'assets/data/deportes.json');
    cargarNoticias('economia', 'assets/data/economia.json');

    function cargarNoticias(contenedorId, archivoJson) {
        const contenedor = document.getElementById(contenedorId);

        fetch(archivoJson)
            .then(response => response.json())
            .then(noticias => {
                noticias.forEach(noticia => {
                    const card = document.createElement('div');
                    card.classList.add('col-md-4', 'mb-3');

                    const cardHTML = `
                        <div class="card shadow-sm">
                            <div class="tag-categoria">
                                <span class="badge bg-primary">
                                    ${noticia.categoria}
                                </span>
                            </div>
                            <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${noticia.titulo}</h5>
                                <p class="card-text">${noticia.contenido}</p>
                                <button class="btn btn-sm btn-outline-secondary ver-noticia" data-id="${noticia.id}" data-toggle="modal" data-target="#showNewsModal">Ver Noticia</button>
                            </div>
                        </div>
                        `;

                    card.innerHTML = cardHTML;
                    contenedor.appendChild(card);
                });

                const botonesVerNoticia = document.querySelectorAll('.ver-noticia');
                botonesVerNoticia.forEach(boton => {
                    boton.addEventListener('click', function () {
                        const idNoticia = this.getAttribute('data-id');
                        cargarNoticia(idNoticia, archivoJson);
                    });
                });
            })
            .catch(error => console.error('Error cargando las noticias.', error));
    }

    function cargarNoticia(idNoticia, archivoJson) {

        const modalElement = document.getElementById('showNewsModal');
        let modal = bootstrap.Modal.getInstance(modalElement);

        if (!modal) {
            modal = new bootstrap.Modal(modalElement, {
                keyboard: true,
                focus: true
            });
        }

        fetch(archivoJson)
            .then(response => response.json())
            .then(noticias => {
                const noticia = noticias.find(n => n.id === idNoticia);
                if (noticia) {
                    document.getElementById('modalTitle').textContent = noticia.titulo;
                    const body = document.getElementById('modalBody');
                    body.innerHTML = `
                        <p class="text-center">
                            <img src="${noticia.imagen}" class="img-fluid" alt="${noticia.titulo}">
                        </p>
                        <p>${noticia.contenido}</p>
                    `;
                    modal.show();
                } else {
                    console.error('Noticia no encontrada.');
                }
            })
            .catch(error => console.error('Error cargando la noticia.', error));
    }
});

const buttonAddNews = document.getElementById('buttonAddNews');

buttonAddNews.addEventListener('click', function () {

    let id = Math.floor(Math.random() * 1000);
    let category = document.getElementById('categoriaNoticia').value;
    let title = document.getElementById('titularNoticia').value;
    if (title === '') {
        alert('Debe ingresar un titular');
        return;
    }
    let image = document.getElementById('imagenNoticia').value;
    // si imagen esta vacio, se asigna una imagen por defecto
    if (image === '') {
        image = 'https://via.placeholder.com/400';
    }
    let content = document.getElementById('cuerpoNoticia').value;
    if (content === '') {
        alert('Debe ingresar el contenido de la noticia');
        return;
    }

    const contenedor = document.getElementById(category);

    function crearNoticia(id, category, title, image, content) {

        const modalElement = document.getElementById('addNewsModal');
        let modal = bootstrap.Modal.getInstance(modalElement);

        if (!modal) {
            modal = new bootstrap.Modal(modalElement, {
                keyboard: true,
                focus: true
            });
        }

        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-3');

        const cardHTML = `
                        <div class="card shadow-sm">
                            <div class="tag-categoria">
                                <span class="badge bg-primary">
                                    ${category}
                                </span>
                            </div>
                            <img src="${image}" class="card-img-top" alt="${title}">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${content}</p>
                                <button class="btn btn-sm btn-outline-secondary ver-noticia" data-id="${id}" data-toggle="modal" data-target="#showNewsModal">Ver Noticia</button>
                            </div>
                        </div>
                        `;

        card.innerHTML = cardHTML;
        modal.hide();
        alert('Noticia agregada correctamente');
        contenedor.appendChild(card);
    }

    crearNoticia(id, category, title, image, content);

});