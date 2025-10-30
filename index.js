const form = document.getElementById('form');
const entradaTarea = document.getElementById('entradaTarea');
const salidas = document.getElementById('salidas');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function mostrarTareas() {
    // Si no pongo la siguiente cada vez que se muestre, se duplicará
    // lo que habia antes, en vez de vaciarlo y escribirlo solo una vez
    salidas.innerHTML = '';

    for (let i = 0; i < tareas.length; i++) {
        let completada = tareas[i].completada;
        const article = document.createElement('article');

        const span = document.createElement('span');
        const emoji = completada ? ' ✅ ' : ' 🚨 ';
        span.textContent = '' + emoji + tareas[i].texto + emoji;

        const divBotones = document.createElement('div');
        divBotones.classList.add('divBotones');

        if (!completada) {
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Completar';
            editBtn.classList.add('editBtn');

            // Completar
            editBtn.addEventListener('click', () => {
                editBtn.remove();
                span.textContent = ' ✅ ' + tareas[i].texto + ' ✅ ';
                tareas[i].completada = true;
                localStorage.setItem('tareas', JSON.stringify(tareas));
                mostrarTareas();
            });
            divBotones.appendChild(editBtn);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('deleteBtn');

        // Eliminar
        deleteBtn.addEventListener('click', () => {
            tareas.splice(i, 1);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            mostrarTareas();
        })

        divBotones.appendChild(deleteBtn);

        article.appendChild(span);
        article.appendChild(divBotones);

        salidas.appendChild(article);
    }
}

mostrarTareas();

// Agregar tarea al storage cuando se clickea en Agregar
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const texto = entradaTarea.value.trim();

    form.reset();

    if (texto && texto !== '') {
        entradaTarea.style.border = "";
        tareas.push({ texto, completada: false });
        localStorage.setItem('tareas', JSON.stringify(tareas));
        entradaTarea.value = '';
        mostrarTareas();

    } else {
        entradaTarea.style.border = "2px solid red";
    }
})