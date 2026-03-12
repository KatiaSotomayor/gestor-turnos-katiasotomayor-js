//iMPORTAR JSON CON LA INFO DE LOS EMPLEADOS
const url = "../db/data.json"
fetch(url)
    .then(response => response.json())
    .then(json => console.log(json))

//LISTA PARA ALMACENAR TURNOS
let turnos = []

const formulario = document.getElementById("form-turnos")

//TOMA DE VALORES DEL FORM AL HACER CLICK EN EL BTN SUBMIT
formulario.addEventListener("submit", function (event) {
    event.preventDefault()
    
    const nom_ape = document.getElementById("nombre-apellido").value
    const fecha = document.getElementById("fecha").value
    const entrada = document.getElementById("horario-entrada").value
    const salida = document.getElementById("horario-salida").value
    const mes = document.getElementById("mes").value

    //ALMACENAMIENTO DE DATOS EN UNA VARIABLE
    const turno = {
        nombre: nom_ape,
        fecha: fecha,
        entrada: entrada,
        salida: salida,
        mes: mes,
    }

    //SE AGREGA A LA LISTA Y SE AGREGA EL NUEVO TURNO AL HTML
    turnos.push(turno)
    agregar_al_html(turno)

    //Y SE LIMPIA EL FORM
    formulario.reset()
});


//FUNCION PARA AGREGAR EL NUEVO TURNO A HTML
function agregar_al_html(turno) {
    const turno_agregado = document.getElementById("dia" + turno.fecha)

    turno_agregado.innerHTML += `
    <hr><li>${turno.nombre}: De ${turno.entrada} a ${turno.salida}</li>
    `;
}